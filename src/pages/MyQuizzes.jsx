import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/Theme';
import '../design/myQuizzes.css'
import { baseUrl } from '../components/baseUrl';
import Room from '../components/Room';

function MyQuizzes() {
  const { user } = useContext(UserContext);
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        console.log('Fetching quizzes...');
        
        if (user && user.id) {
          // Fetch quizzes for the user using their ID
          const response = await fetch(`${ baseUrl }/quizzes/userQuiz/${user.id}`);

          if (response.ok) {
            const allQuizzes = await response.json();
            console.log('All quizzes:', allQuizzes);

            // Update userQuizzes directly without filtering based on role
            setUserQuizzes(allQuizzes);
            console.log('Quizzes fetched successfully:', userQuizzes);
          } else {
            console.error('Error fetching quizzes:', response.statusText);
          }
        } else {
          console.log('User object or user ID not available. Skipping fetch.');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    // Only fetch quizzes if the user is logged in
    if (user) {
      fetchUserQuizzes();
    } else {
      console.log('User not logged in. Skipping fetch.');
    }
  }, [user]);

  const handleRemoveQuiz = async (quizId) => {
    try {
      const response = await fetch(`${baseUrl}/quizzes/${quizId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Quiz removed successfully!');
        // Remove the quiz from the userQuizzes state
        setUserQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
      } else {
        console.error('Error removing quiz:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };


  return (
    <div>
      <h1>{user?.email} Quizzes </h1>
      {userQuizzes.map((quiz) => (
        <div key={quiz._id} className="card">
          <h2>Title: {quiz.title}</h2>
          <Link to={`/quizDetails/${quiz._id}`}>View Details</Link>
          <Link to={`/createRoom/${quiz._id}`}>Create Room </Link>
          <button onClick={() => handleRemoveQuiz(quiz._id)}>Remove Quiz</button>
        </div>
      ))}
    </div>
  );
}

export default MyQuizzes;