import React, { useState } from "react";
import axios from "axios"
import { baseUrl } from "../baseUrl";

const Signup = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "regular", // Default to regular, assuming regular is a valid default value
    // Add other necessary fields
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${baseUrl}/users/register`, formData);
  
      if (response.status === 200) {
        const result = response.data;
        console.log('User registered successfully:', result);
  
        // Assuming the backend sends a token upon successful registration
        if (result.token) {
          // Store the token in local storage
          localStorage.setItem('token', result.token);
        }
      } else {
        console.error('Error registering user:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

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
      <label>
        Role:
        <select name="role" onChange={handleInputChange} value={formData.role}>
          <option value="regular">Regular</option>
          <option value="creator">Creator</option>
        </select>
      </label>
      <br />
      {/* Add other necessary input fields */}
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account?{' '}
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={props.toggleAuthType}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
