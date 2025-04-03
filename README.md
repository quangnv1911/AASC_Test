# AASC_Test
This is the full stack test of Nguyen Vinh Quang

# Bitrix24 Integration Project

This project consists of two parts:
1. **bitrix24_server**: A Node.js backend service for Bitrix24 API integration
2. **bitrix24_client**: A React frontend built with Vite for interacting with the Bitrix24 API

## Prerequisites

- Node.js (v14 or higher) (https://nodejs.org/en/download)
- npm (v6 or higher)

## Setup and Running Instructions

### Backend (bitrix24_server)

1. Navigate to the backend directory:

cd bitrix24_server

2. Install dependencies:

npm install

3. Create a `.env` file in the root directory and add your Bitrix24 API credentials:

BITRIX24_OAUTH_URL = https://oauth.bitrix.info/oauth/token
BITRIX24_CLIENT_ID = Bitrix local app client ID
BITRIX24_CLIENT_SECRET = Bitrix local app client secret key
BITRIX24_REST_URL =  https://vinhquang.bitrix24.vn/rest/
CLIENT_URL = http://localhost:5173
PORT = 5000

4. Start the server:

npm run start
The backend will be running at `http://localhost:5000`.

### Frontend (bitrix24_client)

1. Navigate to the frontend directory:

cd bitrix24_client

2. Install dependencies:

npm install

3. Create a `.env` file in the root directory and add your Bitrix24 API credentials:

VITE_API_URL= "Your backend server URL"

3. Start the development server:

The frontend will be running at `http://localhost:5173`.
