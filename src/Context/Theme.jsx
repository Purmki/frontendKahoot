
import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1006/api/v1/users/login",
        formData
      );

      if (response.status === 200) {
        const result = response.data;
        console.log("User logged in successfully:", result);

        // Assuming the backend sends a token upon successful login
        if (result.token) {
          // Store the token in local storage
          localStorage.setItem("token", result.token);
          setUser(result.user)
        }
      } else {
        console.error("Error during login:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  

  const fetchUserData = async () => {
    try {
        
      const response = await axios.get('http://localhost:1006/api/v1/users/tokenKeeper', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      });
      const result = response.data
      setUser(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    console.log(user);
}, []);


const signOut = () => {
  // Clear user authentication details
  localStorage.removeItem("token");
  
  // Set user state to null
  setUser(null);
};



  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        handleLogin,
        handleInputChange,
        formData,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
