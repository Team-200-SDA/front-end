import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

const logo = '/images/logo/logo.png';
function Navbar({ onLogout }) {
  const { language, changeEn, changeSv, changeEs } = useContext(LangContext);
  return (
    <div className="nav-wrap">
      <div className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="" />
        </Link>

        <ul>
          <li>
            <Link to="/" className="nav-link">
              {language.home}
            </Link>
          </li>

          <li>
            <Link to="/lectures" className="nav-link">
              {language.Lectures}
            </Link>
          </li>

          <li>
            <Link to="/live" className="nav-link">
              {language.Live_Stream}
            </Link>
          </li>

          <li>
            <Link to="/assignments" className="nav-link">
              {language.Assignments}
            </Link>
          </li>

          <li>
            <Link to="/filestorage" className="nav-link">
              File Storage
            </Link>
          </li>

          <li>
            <Link to="/chat" className="nav-link">
              {language.Chat}
            </Link>
          </li>

          <li>
            <Link to="/private-chat" className="nav-link">
              {language.Private_Messaging}
            </Link>
          </li>

          <li>
            <Link to="/todo-list" className="nav-link">
              {language.Todo}
            </Link>
          </li>

          <li>
            <Link to="#" onClick={Calendar} className="nav-link">
              Calendar
            </Link>
          </li>

          <li>
            <Link to="/forum" className="nav-link">
              Forum
            </Link>
          </li>

          <li>
            <Link to="/userprofile" className="nav-link">
              {language.User_Profile}
            </Link>
          </li>

          <li>
            <i className="fas fa-door-open sign-out-button" onClick={onLogout} />
          </li>
        </ul>
        <div className="lang-drop">
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
            <div className="dropdown-item" href="#" onClick={changeEs}>
              {language.spanish}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
