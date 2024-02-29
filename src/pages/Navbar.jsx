import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/Theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "../design/navbar.css";

function Navbar() {
  const { signOut } = useContext(UserContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Home
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto"> {/* Use ml-auto to push content to the right */}
            <li className="nav-item">
              <NavLink to="/quizBuilder" className="btn btn-outline-light nav-link">
                Quiz Builder
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/myQuizzes" className="btn btn-outline-light nav-link">
                My Quizzes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/auth" className="btn btn-outline-light nav-link">
                Auth
              </NavLink>
            </li>
          </ul>
          <div className="ml-auto"> {/* Create a separate div for Sign Out button */}
            <button className="btn btn-outline-light" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
