const { HTTP_STATUS_CODES } = require('../../config/constants');

const SendMessage = async (req, res) => {
    try {
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('chat message', (msg) => {
                console.log('Message received:', msg);
                io.emit('chat message', msg); // Broadcast to everyone
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });
        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: '',
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}

const ReceiveMessage = async (req, res) => {
    try {
        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: '',
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}

module.exports = {
    SendMessage,
    ReceiveMessage
}