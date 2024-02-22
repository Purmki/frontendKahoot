import React from 'react';

const AddQuizCard = ({ quiz, handleInputChange, addQuestion, removeQuestion, addAnswer, removeAnswer, handleSubmit }) => {
  return (
    <div>
      <h1>Quiz Builder</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Quiz Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => handleInputChange(e)}
        />
        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label htmlFor={`questionText_${questionIndex}`}>Question:</label>
            <input
              type="text"
              id={`questionText_${questionIndex}`}
              name="questionText"
              onChange={(e) => handleInputChange(e, questionIndex, 0)}
            />
            <button type="button" onClick={() => removeQuestion(questionIndex)}>
              Remove Question
            </button>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
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
                <button type="button" onClick={() => removeAnswer(questionIndex, answerIndex)}>
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
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default AddQuizCard;