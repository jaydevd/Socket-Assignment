const ChatRoutes = require('./chats/ChatRoutes');
const express = require('express');

const router = express.Router();

router.use('/chat', ChatRoutes);

module.exports = router;