import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RunGame from "./runGame";
import RoomGame from "./roomGame";
import { socketBaseUrl } from "./baseUrl";
import { io } from "socket.io-client";
import { UserContext } from "../Context/Theme";

const socket = io.connect(socketBaseUrl);

function Room() {
  const { user } = useContext(UserContext);
  const [quizStarted, setQuizStarted] = useState(false);
  const { quizId } = useParams();

  const startQuiz = () => {
    socket.emit("gameStart", quizId);
  };

  useEffect(() => {
    user ? socket.emit("join", { quizId, user }) : null;
  }, [user]);

  useEffect(() => {
    socket.on("gameStart", () => {
      setQuizStarted(true);
    });

    socket.on("gameEnd", () => {
      setQuizStarted(false);
    });

    // Cleanup the event listeners when the component unmounts
    return () => {
      socket.off("gameStart");
      socket.off("gameEnd");
    };
  }, [setQuizStarted]);

  const handleGameRestart = () => {
    setQuizStarted(false);
  };

  return (
    <div>
      <button onClick={quizStarted ? handleGameRestart : startQuiz}>
        {quizStarted ? "stop Game" : "Start Quiz"}
      </button>
      {quizStarted ? <RunGame /> : <RoomGame />}
    </div>
  );
}

export default Room;
