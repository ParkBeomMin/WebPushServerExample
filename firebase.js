const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { push } = require('./webPush.controller');

const serviceAccount = require('./firebase-account-file.json');

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

const setToken = async ({ endpoint, keys }) => {
    let isExist = false;
    const q = db.collection('token').where('endpoint', '==', endpoint);
    const querySnapshot = await q.get();
    querySnapshot.forEach((doc) => {
        if (doc.id) {
            isExist = true;
        }
    });
    if (!isExist) {
        const today = new Date();
        db.collection('token').add({
            endpoint,
            keys,
            regDate: today,
        });
    }
};

const deleteToken = async ({ endpoint, keys }) => {
    const q = db.collection('token').where('endpoint', '==', endpoint); // query(collection(db, 'token'), where('endpoint', '==', true));
    const querySnapshot = await q.get();
    querySnapshot.forEach((doc) => {
        if (doc.id) {
            db.doc(`token/${doc.id}`).delete();
        }
    });
};

const sendMessage = async () => {
    const registrationTokens = [];
    const docs = await db.collection('token').get();
    // 디비에 등록된 토큰 가져오기
    docs.forEach((result) => {
        registrationTokens.push({ ...result.data() });
    });

    const message = {
        data: {
            message: '웹푸쉬!',
        },
        tokens: registrationTokens.filter((r) => r.endpoint),
    };

    try {
        push(message);
    } catch (e) {
        console.log(e);
    }
    return;
};

module.exports = {
    setToken,
    sendMessage,
    deleteToken,
};
