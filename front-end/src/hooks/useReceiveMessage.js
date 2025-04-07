const socket = io();

const useReceiveMessage = async () => {
    const [message, setMessage] = useState("");
    try {
        const result = await socket.on('chat', msg);
        setMessage(result);
        console.log("Message Received!");
        return message;
    } catch (error) {
        console.log(error.message);
    }
}

export default useReceiveMessage;