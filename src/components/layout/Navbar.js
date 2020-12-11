import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

const logo = '/images/logo/logo.png';
function Navbar({ onLogout }) {
  const { language } = useContext(LangContext);

  return (
    <div className="nav-wrap">
      <div className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="" />
        </Link>

        <ul>
          <li>
            <Link to="/" className="nav-link">
              {/* Erkan */}
              <i className="fas fa-newspaper nav-icon" /> News
            </Link>
          </li>

          <li>
            <Link to="/lectures" className="nav-link">
              <i className="fas fa-book-open nav-icon" />
              {language.Lectures}
            </Link>
          </li>

          <li>
            <Link to="/live" className="nav-link">
              <i className="fas fa-video nav-icon" />
              {language.Live_Stream}
            </Link>
          </li>

          <li>
            <Link to="/assignments" className="nav-link">
              <i className="fas fa-clipboard nav-icon" />
              {language.Assignments}
            </Link>
          </li>
          {/* Erkan */}
          <li>
            <Link to="/filestorage" className="nav-link">
              <i className="fas fa-archive nav-icon" /> File Storage
            </Link>
          </li>

          <li>
            <Link to="/chat" className="nav-link">
              <i className="far fa-comments nav-icon" />
              {language.Chat}
            </Link>
          </li>
          {/* Erkan */}
          <li>
            <Link to="/private-chat" className="nav-link">
              <i className="fas fa-comments nav-icon" /> Private Chat
            </Link>
          </li>

          <li>
            <Link to="/todo-list" className="nav-link">
              <i className="fas fa-tasks nav-icon" /> {language.Todo}
            </Link>
          </li>

          <li>
            <Link to="#" onClick={Calendar} className="nav-link">
              <i className="fas fa-calendar-alt nav-icon" /> Calendar
            </Link>
          </li>

          <li>
            <Link to="/forum" className="nav-link">
              <i className="fas fa-pencil-alt nav-icon" /> Forum
            </Link>
          </li>

          <li>
            <Link to="/userprofile" className="nav-link">
              <i className="fas fa-address-card nav-icon" /> {language.User_Profile}
            </Link>
          </li>

          <li>
            <Link to="#" className="nav-link">
              <i className="fas fa-sign-out-alt nav-icon sign-out" onClick={onLogout} />
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
