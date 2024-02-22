// QuizDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../components/baseUrl";

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/${quizId}`);

        if (response.ok) {
          const quiz = await response.json();
          setQuizDetails(quiz);
        } else {
          console.error("Error fetching quiz details:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  if (!quizDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{quizDetails.title} Quiz Details</h1>
      <h3>quiz</h3>
      {quizDetails.questions.map((question) => (
        <div key={question._id}>
          <h4>question: {question.questionText}</h4>
          <ul>
            {question.answers.map((answer) => (
              <li key={answer._id}>
                <span>answer: {answer.answerText}</span>
                <span>{answer.isCorrect ? "(Correct)" : ""}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizDetails;
