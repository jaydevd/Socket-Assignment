const socket = io();

const useSendMessage = async (msg) => {
    try {
        socket.emit('join', {
            email: "jaydevd@gmail.com"
        });
        socket.emit('chat', msg);
        console.log("Message sent!");
    } catch (error) {
        console.log(error.message);
    }
}

export default useSendMessage;