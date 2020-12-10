import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

const logo = '/images/logo/logo.png';
function Navbar({ onLogout }) {
  const { language, changeEn, changeSv } = useContext(LangContext);
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="" />
      </Link>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {language.home}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/lectures" className="nav-link">
            {language.Lectures}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/live" className="nav-link">
            {language.Live_Stream}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/assignments" className="nav-link">
            {language.Assignments}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/filestorage" className="nav-link">
            File Storage
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/chat" className="nav-link">
            {language.Chat}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/private-chat" className="nav-link">
            {language.Private_Messaging}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/todo-list" className="nav-link">
            {language.Todo}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="#" onClick={Calendar} className="nav-link">
            {language.Calendar}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/userprofile" className="nav-link">
            {language.User_Profile}
          </Link>
        </li>

        <li className="nav-item dropdown">
          <div
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {language.language}
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="dropdown-item" href="#" onClick={changeEn}>
              {language.english}
            </div>
            <div className="dropdown-item" href="#" onClick={changeSv}>
              {language.swedish}
            </div>
          </div>
        </li>
      </ul>
      <i className="fas fa-door-open sign-out-button" onClick={onLogout} />
    </nav>
  );
}

export default Navbar;
