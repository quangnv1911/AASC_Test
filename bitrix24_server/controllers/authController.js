import { updateToken } from "../utils/axiosInterceptor.js";

export const handleOAuth = async (req, res) => {
    const tokens = {
        access_token: req.body["AUTH_ID"],
        refresh_token: req.body["REFRESH_ID"],
    };
    updateToken(tokens);
    return res.redirect("http://localhost:5173/");
};
