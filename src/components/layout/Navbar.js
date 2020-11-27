import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar({ onLogout }) {
  const history = useHistory();

  function chatRefresh() {
    history.push('/chat');
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        SDA starter
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/posts" className="nav-link">
              Posts
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/lectures" className="nav-link">
              Lectures
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/assignments" className="nav-link">
              Assignments
            </Link>
          </li>

          <li className="nav-item">
            <Link onClick={chatRefresh} to="/chat" className="nav-link">
              Chat
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/userprofile" className="nav-link">
              User Profile
            </Link>
          </li>
        </ul>

        <button className="btn btn-outline-info my-2 my-sm-0" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
