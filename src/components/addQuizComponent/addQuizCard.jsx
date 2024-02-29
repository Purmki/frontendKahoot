import React from 'react';
import "../../design/addQuizCard.css"

const AddQuizCard = ({ quiz, handleInputChange, addQuestion, removeQuestion, addAnswer, removeAnswer, handleSubmit }) => {
  return (
    <div>
      <div className='headline'>
      <h1>build your own quiz starting today!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Quiz Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => handleInputChange(e)}
        />
        {quiz.questions.map((question, questionIndex) => (
          <div className='q' key={questionIndex}>
            <label htmlFor={`questionText_${questionIndex}`}>Question:</label>
            <input
              type="text"
              id={`questionText_${questionIndex}`}
              name="questionText"
              onChange={(e) => handleInputChange(e, questionIndex, 0)}
            />
            <button type="button" className='removeQuestion' onClick={() => removeQuestion(questionIndex)}>
              Remove Question
            </button>
            {question.answers.map((answer, answerIndex) => (
              <div className='answers' key={answerIndex}>
                <label htmlFor={`answerText_${questionIndex}_${answerIndex}`}>Answer:</label>
                <input
                  type="text"
                  id={`answerText_${questionIndex}_${answerIndex}`}
                  name="answerText"
                  onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                />
                <label htmlFor={`isCorrect_${questionIndex}_${answerIndex}`}>
                  Correct Answer:
                </label>
                <input
                  type="checkbox"
                  id={`isCorrect_${questionIndex}_${answerIndex}`}
                  name="isCorrect"
                  checked={answer.isCorrect}
                  onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                />
                <button type="button" className='removeAnswers' onClick={() => removeAnswer(questionIndex, answerIndex)}>
                  Remove Answer
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addAnswer(questionIndex)}>
              Add Answer
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button className='submitQuiz' type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default AddQuizCard;