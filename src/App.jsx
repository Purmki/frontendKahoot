import { useState, createContext  } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './pages/Navbar';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import MyQuizzes from './pages/MyQuizzes';
import Auth from './pages/Auth';
import QuizBuilder from './pages/QuizBuilder';
import { UserProvider } from './Context/Theme';
import EntrancePage from './pages/EntrancePage';
import QuizDetails from './pages/QuizDetails';
import Room from './components/Room';
 


export const UserContext = createContext();

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<EntrancePage />} />
            <Route path='/Auth' element={<Auth />} />
            <Route path='/myQuizzes' element={<MyQuizzes />} />
            <Route path='/quizBuilder' element={<QuizBuilder />} />
            <Route path="/quizDetails/:quizId" element={<QuizDetails />} /> 
            <Route path="/createRoom/:quizId" element={<Room />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
