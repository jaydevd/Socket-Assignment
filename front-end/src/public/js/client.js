const socket = io();

const input = document.getElementById('input');
const messages = document.getElementById('messages');

function sendMessage() {
    console.log("Send message!");
    const msg = input.value;
    if (msg.trim()) {
        socket.emit('chat message', msg);
        input.value = '';
    }
}

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
});
