import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';
import Postspage from '../forum/posts/PostsPage'
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
            {language.File_Storage}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/chat" className="nav-link">
            {language.Public_Chat}
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
              Calendar
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/forum" className="nav-link">
              Forum
            </Link>
          </li>
        
        <li className="nav-item">
          <Link to="/userprofile" className="nav-link">
            {language.User_Profile}
          </Link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {language.language}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" onClick={changeEn}>
              {language.english}
            </a>
            <a class="dropdown-item" href="#" onClick={changeSv}>
              {language.swedish}
            </a>
          </div>
        </li>
      </ul>

      <button className="sign-out-button" onClick={onLogout}>
        {language.Logout}
      </button>
    </nav>
);
}

export default Navbar;
