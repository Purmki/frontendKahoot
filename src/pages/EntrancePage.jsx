
import React from 'react'
import "../design/EntrancePage.css"
import logoImg from "../assets/logo.png"
function EntrancePage() {
  return (
    <div className='HomeWorldDiv'>
      <h1>Welcome to quizzies!</h1>
        <p>Challenge your knowledge, have fun, and become a QuizMaster!</p>
        <br></br>
      <img class='logo' src={logoImg} alt="" />
      <div className="content">
        
    </div>
    </div>
  )
}

export default EntrancePage