# Circuit HR Bot

This application uses a circuit bot alongside DialogFlow to respond to questions with answers stored in dialog flow intents. Add this bot to any conversations and mention it with `@botname <question>` and it will respond to that question by matching it to your intents in DialogFlow.

## Prerequisites
[![NodeJS](https://img.shields.io/badge/Node.js-10.16.0-brightgreen.svg)](https://nodejs.org) <br/>
* Developer account on circuitsandbox.net. Get it for free at [developer registration](https://circuit.github.io/).
* OAuth 2.0 `client_id` and `client_secret`. Start developing your app in our sandbox environment.
If you do not have one yet, [request your sandbox](https://yourcircuit.typeform.com/to/d3VDXN). Go create an app, go to the "Manage Applications" > "Custom Apps" and click "Create" and create a "Client Credentials" application.
* DialogFlow service account, the app uses a DialogFlow service account to let the bot access your DialogFlow. To create a service account you must go [here](https://dialogflow.com/) and follow the instructions to create an account. Once you have one you must get the Credentials and add the path to the credentials.json file to your processes environment variables .

## Dependencies
* [circuit-sdk](https://www.npmjs.com/package/circuit-sdk)
* [dialogflow](https://www.npmjs.com/package/dialogflow)
* [uuid](https://www.npmjs.com/package/uuid)

## Usage
1. Clone the respository.
2. Run : `$ npm install`.
3. Add `CIRCUIT_CLIENT_ID`, `CIRCUIT_CLIENT_SECRET`, `DOMAIN`, `SCOPES`, `DIALOG_FLOW_SECRET`, `DIALOG_FLOW_EMAIL`, `DIALOG_FLOW_PROJECT_ID`, `LANGUAGE`, and `GOOGLE_APPLICATION_CREDENTIALS`  to the process environment variables for the trivia session. The `CIRCUIT_CLIENT_ID` and `CIRCUIT_CLIENT_SECRET` refer to the credentials of your circuit bot. The `DOMAIN` refers to the domain your circuit bot exists on. The `SCOPES` refers to the scopes of the bot, for this bot you will need the following scopes: `READ_CONVERSATIONS,WRITE_CONVERSATIONS,READ_USER,READ_USER_PROFILE,MENTION_EVENT`. The `LANGUAGE` refers to which lanuage you want this application to use (e.g `en-US` for english), you can look in the DialogFlow documentation for other languages. The `DIALOG_FLOW_PROJECT_ID` refers to the project Id of your application on google. The `DIALOG_FLOW_SECRET` refers to the private key of your service account that will be used, this is also found in the `.json` file with your other credentials that is used for the `GOOGLE_APPLICATION_CREDENTIALS` environment variable. Finally, `GOOGLE_APPLICATION_CREDENTIALS` refers to the path in your environment pointing to the `.json` file you have with your google credentials.
4. After all that is set up you can either run this in vscode or use `$ npm start` to begin the application.
** Note add the bot to any conversation you want it to answer questions in. **