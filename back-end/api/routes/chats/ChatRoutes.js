const express = require('express');
const router = express.Router();
const { User } = require('../../models/index.js');
const { SendMessage, ReceiveMessage } = require('../../controllers/chats/ChatController.js');

router.route('/send')
    .post(SendMessage);

router.route('/receive')
    .post(ReceiveMessage);

module.exports = router;