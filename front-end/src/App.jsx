import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [message, setMessage] = useState({
    text: ''
  });

  // const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const SOCKET_SERVER_URL = "http://localhost:5000";
  const messages = [];

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Optional: listen to an event
    newSocket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    newSocket.emit('join', {
      email: "jaydevd@gmail.com"
    });

    newSocket.on("chat", (data) => {
      console.log("Received message:", data);
      messages.push(message);
      console.log(messages);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
    messages.push({ text: e.target.value });
    console.log(messages);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("message: ", message);
    if (message) {
      console.log("message is present");
      socket.emit('chat', message);
      console.log("emitted");
    }
  }

  return (
    <div className="w-5/12 bg-neutral-300  mx-auto h-screen flex flex-col items-center justify-between" >

      {/* Receive Messages */}
      <div className="h-11/12 flex w-full p-5">
        {
          messages.map(msg => {
            return <ul key={uuidv4()} className="h-fit rounded-full px-4 py-2 my-2 bg-white">
              <li className="h-fit">{msg.text}</li>
            </ul>
          })
        }
      </div>

      {/* Send Message */}
      <div className="h-1/12 w-full flex items-center justify-center">
        < form onSubmit={handleSubmit} className=" bg-neutral-200 p-2 rounded-lg flex justify-between">
          <input type="text" name="text" placeholder="Type..." value={message.text} onChange={handleInputChange} className='w-96 bg-transparent px-2 focus:outline-none' />
          <button type="submit" className="bg-white rounded-md px-3 py-1 text-sm cursor-pointer">Send</button>
        </form >
      </div>
    </div>
  )
}

export default App;