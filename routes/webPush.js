const express = require('express');
const { setToken, deleteToken, sendMessage } = require('../firebase');
const { getVapidKey } = require('../webPush.controller');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', async (req, res) => {
    res.json({ rtCode: 'S', vapidKey: getVapidKey() });
});

router.post('/', (req, res) => {
    const { endpoint, keys } = req.body;
    setToken({ endpoint, keys });
    res.json({ rtCode: 'S' });
});

router.post('/delToken', (req, res) => {
    const { endpoint } = req.body;
    deleteToken({ endpoint: decodeURIComponent(endpoint) });
    res.json({ rtCode: 'S' });
});

router.post('/send', (req, res) => {
    sendMessage();
    res.json({ rtoCode: 'S' });
});

module.exports = router;
