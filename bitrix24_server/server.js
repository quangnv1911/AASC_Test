const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: ["https://vinhquang.bitrix24.vn", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure tokens directory exists
const tokensDir = path.join(__dirname, 'tokens');
if (!fs.existsSync(tokensDir)) {
    fs.mkdirSync(tokensDir);
}


// Helper function to get token data from file
const getTokenData = (memberId, token) => {
    try {
        const tokenPath = path.join(tokensDir, `${memberId}.json`);
        if (fs.existsSync(tokenPath)) {
            const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
            console.log(tokenData)
            console.log(token)
            console.log(tokenData.access_token)
            console.log(tokenData.access_token === token)
            if (tokenData.access_token === token) {
                return tokenData;
            }
        }
        return null;
    } catch (error) {
        console.error(`Error reading token file for ${memberId}:`, error.message);
        return null;
    }
};

// Bitrix24 OAuth
app.get("/api/install", (req, res) => {
    const authUrl = `https://vinhquang.bitrix24.vn/oauth/authorize/?response_type=code&client_id=${process.env.CLIENT_ID}`;
    res.redirect(authUrl);
});

// OAuth callback
app.get('/api/auth/callback', async (req, res) => {
    const { code, state, domain, member_id, scope, server_domain } = req.query;
    if (!code) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await axios.get(`https://oauth.bitrix.info/oauth/token/?grant_type=authorization_code&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_KEY}&code=${code}`);

        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        // Get member_id from response or query params
        const actualMemberId = tokenResponse.data.member_id || member_id || 'default';

        // Store tokens in a file named with the member_id
        const tokenData = {
            access_token,
            refresh_token,
            expires_at: Date.now() + expires_in * 1000,
            domain: domain || server_domain || 'vinhquang.bitrix24.vn',
            member_id: actualMemberId
        };

        fs.writeFileSync(
            path.join(tokensDir, `${actualMemberId}.json`),
            JSON.stringify(tokenData, null, 2)
        );

        res.send(`
            <script>
                window.opener.postMessage({
                    token: "${access_token}",
                    member_id: "${actualMemberId}"
                }, "*");
                window.close();
            </script>
        `);
    } catch (error) {
        console.error('OAuth callback error:', error.message);
        res.status(500).json({ error: 'Failed to exchange code for tokens' });
    }
});


// Endpoint to refresh access token
app.post('/api/refresh-token', async (req, res) => {
    const { member_id, token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Missing token parameter' });
    }
    if (!member_id) {
        return res.status(400).json({ error: 'Missing member_id parameter' });
    }

    try {
        const tokenData = getTokenData(member_id, token);

        if (!tokenData || !tokenData.refresh_token) {
            return res.status(401).json({ error: 'No refresh token available' });
        }

        const refreshResponse = await axios.get(
            `https://oauth.bitrix.info/oauth/token/?` +
            `grant_type=refresh_token&` +
            `client_id=${process.env.CLIENT_ID}&` +
            `client_secret=${process.env.CLIENT_KEY}&` +
            `refresh_token=${tokenData.refresh_token}`
        );

        const { access_token, refresh_token, expires_in } = refreshResponse.data;

        // Update token data
        const updatedTokenData = {
            ...tokenData,
            access_token,
            refresh_token,
            expires_at: Date.now() + expires_in * 1000
        };

        // Save updated token data
        fs.writeFileSync(
            path.join(tokensDir, `${member_id}.json`),
            JSON.stringify(updatedTokenData, null, 2)
        );

        // Return the new token data (without refresh_token for security)
        res.json({
            token: updatedTokenData.access_token
        });
    } catch (error) {
        console.error(`Error refreshing token for ${member_id}:`, error.message);
        res.status(500).json({
            error: 'Failed to refresh token',
            details: error.response?.data || error.message
        });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});