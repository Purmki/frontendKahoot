import React, { useEffect, useState, useContext } from "react";
import { socketBaseUrl } from "./baseUrl";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/Theme";
const socket = io.connect(socketBaseUrl);

function RoomGame() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { quizId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Listen for incoming chat messages and user-joined events from the server
    socket.on("message", (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data]);

      // Check if the received message indicates a user has entered
      if (data === "User entered the room") {
        console.log("A user has entered the room!");
      }
    });
    socket.on("user-joined", (user) => {
      setConnectedUsers((prevUsers) => [...prevUsers, user.email]);
    });

    
    // Clean up the chat and user-joined event listeners when the component unmounts
    return () => {
      socket.off("message");
      socket.off("user-joined");
    };
  }, []);
  useEffect(() => {
    console.log(user);
    user ? socket.emit("join", { quizId, user }) : null;
  }, [user]);

  const sendMessage = () => {
    // Placeholder for your sendMessage implementation using socket
    socket.emit("message", message);
    setMessage(""); // Clear the input field after sending a message
  };

  return (
    <div>
      <h1>Room</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h3>Received Chat Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </ul>
      </div>
      <div>
        <h3>Connected Users:</h3>
        <ul>
          {connectedUsers.map((user, index) => (
            <p key={index}>{`User ${index + 1}: ${user} has joined`}</p>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoomGame;
