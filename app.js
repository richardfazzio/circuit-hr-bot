const dialogflow = require('dialogflow');
const Circuit = require('circuit-sdk');
const uuid = require('uuid/v1');
const { DIALOG_FLOW_SECRET, DIALOG_FLOW_EMAIL, DIALOG_FLOW_PROJECT_ID, CIRCUIT_CLIENT_ID, CIRCUIT_CLIENT_SECRET, LANGUAGE, SCOPES } = process.env; // Get needed credentials
let bot; // The bot that will post messages

// Create a dialogflaw client
const sessionClient = new dialogflow.SessionsClient({
    private_key: DIALOG_FLOW_SECRET,
    client_email: DIALOG_FLOW_EMAIL
});

// Creates a session path to send requests to
const sessionPath = sessionClient.sessionPath(DIALOG_FLOW_PROJECT_ID, uuid());

// Create circuit client 
const client = Circuit.Client({
    client_id: CIRCUIT_CLIENT_ID,
    client_secret: CIRCUIT_CLIENT_SECRET,
    scope: SCOPES
});

// Circuit functions
const addEventListeners = () => {
    client.addEventListener('mention', async evt => {
        try {
            const item = await client.getItemById(evt.mention.itemReference.itemId);
            if (item.type !== Circuit.Enums.ConversationItemType.TEXT) {
                return;
            }
            const question = item.text.content.replace(`@${bot.displayName}`, '');
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: question || 'Hello', // If question is left empty send Hello for default welcome
                        languageCode: LANGUAGE
                    }
                }
            };
            const res = await sessionClient.detectIntent(request);
            const text = res[0].queryResult.fulfillmentText;
            await client.addTextItem(item.convId, {
                parentId: item.parentItemId || item.itemId,
                content: text
            });
        } catch (err) {
            console.error(err);
            item && await client.addTextItem(item.convId, {
                parentId: item.parentItemId || item.itemId,
                content: `I'm sorry but there was an error...`
            });
        }
    });
}

// Replace the span span tags for mention events
Circuit.Injectors.itemInjector = (item) => {  
    if (item.type === 'TEXT') {
    item.text.content = item.text.content.replace(/(<([^>]+)>)/ig, '');  
}};

(async () => {
    try {
        bot = await client.logon();
        addEventListeners();
        console.log('Bot listening...');
    } catch (err) {
        console.error(err);
    }
})();