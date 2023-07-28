const webpush = require('web-push');

const vapidKeys = {
    publicKey: 'BAHc42Ge9Ku-Hgup-66JXrkbsWuwDTUTnoh0Y5UyQFyS04UbP7NF02ZfOMMDf2ujLTMIfKlQ4cx4Thz8ek6hze8',
    privateKey: 'TdolN_-xYH9ARuWRDULgaXO-EFgadIM39FhCSttwswc',
};

webpush.setVapidDetails('mailto:club20608@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

const getVapidKey = () => {
    return vapidKeys.publicKey;
};

const push = ({ data, tokens }) => {
    tokens.forEach(async (token) => {
        try {
            await webpush.sendNotification(token, data.message);
        } catch (e) {
            console.error(e);
        }
    });
};

module.exports = { getVapidKey, push };
