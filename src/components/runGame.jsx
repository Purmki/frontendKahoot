import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "./baseUrl";
import ScoreBar from "./scoreBar";
import { UserContext } from "../Context/Theme";

import Leaderboard from "./leaderBoard";
import { socketBaseUrl } from "./baseUrl";
import { io } from "socket.io-client";
import "../design/runGame.css";

const socket = io.connect(socketBaseUrl);

function RunGame() {
  const { user } = useContext(UserContext);
  const [quizDetails, setQuizDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [timer, setTimer] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [allScores, setAllScores] = useState([]);
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/${quizId}`);
        if (response.ok) {
          const quiz = await response.json();
          setQuizDetails(quiz);
          resetTimer();
        } else {
          console.error("Error fetching quiz details:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    // socket.emit("join", quizId)

    fetchQuizDetails();
  }, [quizId]);

  useEffect(() => {
    if (quizDetails) {
      
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            console.log(quizDetails);
            clearInterval(intervalId);
            return handleNextQuestion();
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    // return () => clearInterval(intervalId); // Cleanup interval on component unmount or change of question
  }, [currentQuestionIndex, quizDetails]);

  const resetTimer = () => {
    setTimer(30);
  };

  useEffect(() => {
    socket.on("score", (data) => {
      console.log(data);
      setAllScores(data);
    });
    return () => {
      socket.off("score");
    };
  }, []);

  useEffect(() => {
    console.log(user);
    user ? socket.emit("join", { quizId, user }) : null;
  }, [user]);

  const handleAnswerClick = (answerText, isCorrect) => {
    setSelectedAnswer(answerText);
    if (isCorrect) {
      const timeRemainingFactor = timer / 30;
      const scoreIncrement = Math.floor(timeRemainingFactor * 100);
      setUserScore(userScore + scoreIncrement);
      socket.emit("userScore", userScore + scoreIncrement, quizId);
    }
    setIsPressed(true);
  };

  const handleNextQuestion = () => {
    console.log("Before question update:", currentQuestionIndex);
    console.log(quizDetails);
    if (currentQuestionIndex < quizDetails?.questions?.length) {
      console.log(",mzvhdcjmsgdjm,cbvasj,dcvmansvdcnmvasdcnvasdnmcv");
      // const currentQuestion = quizDetails.questions[currentQuestionIndex];
      // const correct = currentQuestion.answers.find(
      //   (answer) => answer.isCorrect
      // )?.answerText;
      // if (selectedAnswer === correct) {
      //   setIsPressed(true);
      // }
      setShowQuestion(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeout(() => {
        setShowQuestion(true);
        setIsPressed(false);
        resetTimer();
      }, 5000); // 5000 milliseconds = 5 seconds
    } else {
      console.log("Moving to the next question");

      // Display leaderboard for 5 seconds before moving to the next question
    }

    console.log("After question update:", currentQuestionIndex);

    setSelectedAnswer(null);
    // resetTimer();
  };

  const handleEndQuiz = () => {
    // Logic for ending the quiz
    setShowQuestion(false);
  };
  // console.log({
  //   isSmall: currentQuestionIndex < quizDetails?.questions?.length,
  //   showQuestion,
  // });

  
    return (
      <div className="runGameDiv">
        <ScoreBar score={userScore} />
        {showQuestion &&
          currentQuestionIndex < quizDetails?.questions?.length && (
            <div className="questionDiv">
              <h3>Question {currentQuestionIndex + 1}:</h3>
              <p>{quizDetails?.questions[currentQuestionIndex].questionText}</p>
              <div className="answerDiv">
                {quizDetails.questions[currentQuestionIndex].answers.map(
                  (answer, index) => (
                    <button
                      disabled={isPressed}
                      key={index}
                      onClick={() =>
                        handleAnswerClick(answer.answerText, answer.isCorrect)
                      }
                    >
                      {answer.answerText}
                    </button>
                  )
                )}
              </div>
              <p className="clocke">Time Remaining: {timer} seconds</p>
              <button onClick={handleEndQuiz}>End Quiz</button>
            </div>
          )}
        {!showQuestion &&
          currentQuestionIndex < quizDetails?.questions?.length && (
            <Leaderboard scores={allScores} />
          )}
      </div>
    );
  };
  

export default RunGame;
