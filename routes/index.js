const express = require('express');

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const webPush = require('./webPush.js');
router.use('/webPush', webPush);

module.exports = router;
