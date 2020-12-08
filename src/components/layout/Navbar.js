import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function Navbar({ onLogout }) {
  const { language } = useContext(LangContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        EduLane
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
              {language.home}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/posts" className="nav-link">
              {language.Posts}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/lectures" className="nav-link">
              {language.Lectures}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/assignments" className="nav-link">
              {language.Assignments}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/private-messaging" className="nav-link">
              {language.Private_Messaging}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/chat" className="nav-link">
             {language.Chat}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/userprofile" className="nav-link">
              {language.User_Profile}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="#" onClick={Calendar} className="nav-link">
              {language.Calendar}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/filestorage" className="nav-link">
              {language.File_Storage}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/todo-list" className="nav-link">
              {language.Todo}
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
