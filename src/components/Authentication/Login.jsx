import React, { useState,useContext } from 'react';

import { UserContext } from '../../Context/Theme';

const Login = (props) => {
    const {handleLogin, handleInputChange, formData} = useContext(UserContext)
 
 

  return (
    <div>
      <label>
        Email:
        <input type="text" name="email" onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={props.toggleAuthType}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;