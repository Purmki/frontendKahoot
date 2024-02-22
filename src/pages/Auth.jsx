import React, { useState, useContext } from 'react';
import SignUp from '../components/Authentication/SignUp';
import Login from '../components/Authentication/Login';
import { UserContext } from '../Context/Theme';

function Auth() {
  const { user } = useContext(UserContext); // Access user from the global state
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthType = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      {user ? (
        // User is logged in, show welcome message or other content
        <div>
          <h1>Welcome, {user.email}!</h1>
          {/* Add any other content or components for logged-in users */}
        </div>
      ) : (
        // User is not logged in, show login or signup form
        isLogin ? (
          <Login toggleAuthType={toggleAuthType} />
        ) : (
          <SignUp toggleAuthType={toggleAuthType} />
        )
      )}
    </div>
  );
}

export default Auth;