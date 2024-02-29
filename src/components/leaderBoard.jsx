
import React from "react";
import "../design/Leaderboard.css"
import { useEffect, useContext } from "react";
import { UserContext } from "../Context/Theme";

function Leaderboard({ scores }) {
  const { user } = useContext(UserContext);

    return (
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(scores).map((userId, index) => (
              <tr key={userId}>
                <td>{index + 1}</td>
                <td>{`Player ${scores[userId].user}`}</td>
                <td>{scores[userId]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Leaderboard;