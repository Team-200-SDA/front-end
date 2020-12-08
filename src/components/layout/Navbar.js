import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function Navbar({ onLogout }) {
  const { language, changeEn, changeSv } = useContext(LangContext);
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">
        EduLane
      </a>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/lectures" className="nav-link">
            Lectures
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/live" className="nav-link">
            Live Stream
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/assignments" className="nav-link">
            Assignments
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/filestorage" className="nav-link">
            File Storage
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/chat" className="nav-link">
            Public Chat
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/private-messaging" className="nav-link">
            Private Messaging
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/todo-list" className="nav-link">
            Todo-List
          </Link>
        </li>

        <li className="nav-item">
          <Link to="#" onClick={Calendar} className="nav-link">
            Calendar
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/userprofile" className="nav-link">
            User Profile
          </Link>
        </li>
      </ul>

      <button className="sign-out-button" onClick={onLogout}>
        Sign Out
      </button>
    </nav>
  );
}

export default Navbar;
