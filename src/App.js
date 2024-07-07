// src/App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket.disconnect();
  }, [socket]);

  const sendMessage = () => {
    if (message) {
      socket.emit('send_message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Live Notifications</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
