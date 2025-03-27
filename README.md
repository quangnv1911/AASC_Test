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

PORT= "Port to run server"
CLIENT_ID= "CLient ID WebHook in Bitrix24"
CLIENT_KEY= "CLient Key WebHook in Bitrix24"

4. Start the server:

npm run start
The backend will be running at `http://localhost:5000`.

### Frontend (bitrix24_client)

1. Navigate to the frontend directory:

cd bitrix24_client

2. Install dependencies:

npm install

3. Create a `.env` file in the root directory and add your Bitrix24 API credentials:

VITE_BE_URL= "Your backend server URL"
VITE_BITRIX_URL = "Your bitrix server URL"

3. Start the development server:

The frontend will be running at `http://localhost:5173`.

# Basic flow
### Authentication Process
1. On the login page, you'll see Install/Reinstall button:
   - Click the "Install/Reinstall" button
   - You'll be redirected to the Bitrix24 authorization page
2. For OAuth authentication:
   - Authen data will be stored in tokens folders
   - After successful authorization, you'll be redirected back to the application
### Contact Management
Once authenticated, you'll be redirected to the Contacts page where you can:

1. View Contacts :

   - All your Bitrix24 contacts will be displayed in a list
2. Add New Contact :
   
   - Click the "Add New Contact" button at the top of the page
   - Fill in the contact details form with the required information
   - Click "Create Contact" to save the new contact
   - You'll be redirected back to the contacts list
3. Edit Contact :
   
   - Click the "Edit" button next to any contact
   - Modify the contact information in the form
   - Click "Save" to update the contact
   - You'll be redirected back to the contacts list
4. Delete Contact :
   
   - Click the "Delete" button next to any contact
   - Confirm the deletion in the popup dialog
   - The contact will be removed from the list