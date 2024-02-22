import React, { useState, useContext } from 'react';
import AddQuizCard from '../components/addQuizComponent/addQuizCard';
import axios from "axios"
import { UserContext } from '../Context/Theme';
import { baseUrl } from '../components/baseUrl';



const QuizBuilder = () => {
const { user } = useContext(UserContext);
  const [quiz, setQuiz] = useState({
    title: '',
    creator: user?.id,  
    questions: [
      {
        questionText: '',
        answers: [{ answerText: '', isCorrect: false }],
      },
    ],
  });

  const handleInputChange = (e, questionIndex, answerIndex) => {
    const { name, value, type, checked } = e.target;
  console.log(quiz.creator);
  console.log(user);
    if (type === 'checkbox') {
      // Handle checkbox (for answer's isCorrect)
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: prevQuiz.questions.map((q, qIndex) =>
          qIndex === questionIndex
            ? {
                ...q,
                answers: q.answers.map((a, aIndex) =>
                  aIndex === answerIndex ? { ...a, isCorrect: checked } : a
                ),
              }
            : q
        ),
      }));
    } else {
        if (name === 'title') {
          // If the input is for the quiz title, update it directly
          setQuiz((prevQuiz) => ({
            ...prevQuiz,
            title: value,
          }));
          return; // Stop further processing
        } else if (name === 'creator') {
          // If the input is for the creator, update it directly
          setQuiz((prevQuiz) => ({
            ...prevQuiz,
            creator: value,
          }));
          return; // Stop further processing
        } else {
          // If the input is for other fields, update nested properties in the quiz state
          setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: prevQuiz.questions.map((q, qIndex) =>
              qIndex === questionIndex
                ? {
                    ...q,
                    [name]: name === 'questionText' || name === 'answerText' ? value : q[name],
                    answers: q.answers.map((a, aIndex) =>
                      aIndex === answerIndex ? { ...a, [name]: value } : a
                    ),
                  }
                : q
            ),
          }));
        }
      }
      
  };
  
  

  const addQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [
        ...prevQuiz.questions,
        { questionText: '', answers: [{ answerText: '', isCorrect: false }] },
      ],
    }));
  };

  const addAnswer = (questionIndex) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((q, qIndex) =>
        qIndex === questionIndex
          ? { ...q, answers: [...q.answers, { answerText: '', isCorrect: false }] }
          : q
      ),
    }));
  };

  const removeQuestion = (questionIndex) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.filter((_, qIndex) => qIndex !== questionIndex),
    }));
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((q, qIndex) =>
        qIndex === questionIndex
          ? { ...q, answers: q.answers.filter((_, aIndex) => aIndex !== answerIndex) }
          : q
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(quiz);
    try {
      const res = await axios.post(`${ baseUrl }/quizzes`,{
        title:quiz.title,
        creator:quiz.creator,
        questions:quiz.questions
      })
        console.log(res.data);
    } catch (error) {
      console.error('Error during fetch:', error);
    }

    // Log the quiz data directly after the fetch
    console.log('Quiz data:', quiz);
  };

  return (
    <div>
      <AddQuizCard
        quiz={quiz}
        handleInputChange={handleInputChange}
        addQuestion={addQuestion}
        removeQuestion={removeQuestion}
        addAnswer={addAnswer}
        removeAnswer={removeAnswer}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default QuizBuilder;
