import React, { useState, useRef } from "react";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  const sendMessage = () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput === "") return;

    setMessages(prev => [...prev, { sender: "You", text: trimmedInput }]);

    fetch("/chat", {
      method: "POST",
      body: JSON.stringify({ message: trimmedInput }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [...prev, { sender: "Bot", text: data.reply }]);
        setUserInput("");
        setTimeout(() => {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }, 100);
      })
      .catch(error => {
        setMessages(prev => [
          ...prev,
          { sender: "Bot", text: "Sorry, something went wrong." }
        ]);
        console.error("Error:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <div
        id="chat-box"
        ref={chatBoxRef}
        style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}
      >
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>

      <input
        type="text"
        id="user-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        style={{ width: "100%", marginTop: "10px", padding: "5px" }}
      />
    </div>
  );
};

export default ChatComponent;