// Room.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, socketBaseUrl } from './baseUrl';
import { io } from 'socket.io-client';
const socket = io.connect( socketBaseUrl );

function Room() {
  const { roomId, quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/${quizId}`);
        if (response.ok) {
          const quiz = await response.json();
          setQuizDetails(quiz);
        } else {
          console.error('Error fetching quiz details:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  const sendMessage = () => {
    // Emit the message to the server
    socket.emit("message", message);

    // Clear the input field
    setMessage('');
  };

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (data) => {
      console.log(data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div>
      <h1>Room {roomId}</h1>
      {quizDetails && (
        <div>
          <h2>Quiz Title: {quizDetails.title}</h2>
          {/* Render other quiz details as needed */}
        </div>
      )}

      {/* Message input and send button */}
      <input
        type="text"
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      {/* Display received messages */}
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Room;
