import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Theme";
function Navbar() {
  const { signOut } = useContext(UserContext);

  const handleSignOut = () => {
    // Call the signOut function when the user clicks a sign-out link
    signOut();
  };

  return (
    <div>
      <nav>
        <Link to="/">Entrance Page</Link>
        <Link to="/quizBuilder"> Quiz Builder</Link>
        <Link to="/myQuizzes"> My Quizzes</Link>
        <Link to="/auth"> Auth</Link>
        <button onClick={handleSignOut}> Sign Out</button>
      </nav>
    </div>
  );
}

export default Navbar;