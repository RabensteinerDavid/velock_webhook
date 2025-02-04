# Velock Webhook

This webhook sends data from the Velock device to the Firebase Realtime Database, enabling the app to track the Velock's location and status in real time.

## Run the Server

To run the server correctly, you need to add a `.env` file in the root directory with the following variables:

```
SERVER_PORT='your_server_port_here'
FIREBASE_SERVICE_ACCOUNT_KEY='your_service_account_key_here'
FIREBASE_DATABASE_URL='your_firebase_database_url_here'
```

## Install dependencies 

Run the following command to install all dependencies:

```sh
npm install
```

## Firebase connection

To run the app correctly, you need to have a valid Firebase project and the `serviceAccountKey.json` file in the `utils` folder.