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
      <div className="navbar navbar-expand-md">
        <div to="/" className="navbar-brand">
          Edulane
        </div>

        {/* Burger Button */}
        <button
          className="navbar-toggler toggler-example"
          type="button"
          data-toggle="collapse"
          data-target="#navbarlinks"
          aria-controls="navbarlinks"
          aria-expanded="true"
          aria-label="Toggle navigation">
          <span className="dark-blue-text">
            <i className="fas fa-bars fa-1x"></i>
          </span>
        </button>
        {/* End of Burger Button */}

        {/* Collapse Content */}
        <div className="collapse navbar-collapse" id="navbarlinks">
          {/* The List */}
          <ul className="navbar-nav mr-auto">
            <Link to="/" className="">
              <img src={logo} alt="" />
            </Link>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-newspaper nav-icon" /> {language.News}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/lectures" className="nav-link">
                <i className="fas fa-book-open nav-icon" />
                {language.Lectures}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/live" className="nav-link">
                <i className="fas fa-video nav-icon" />
                {language.Live_Stream}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/assignments" className="nav-link">
                <i className="fas fa-clipboard nav-icon" />
                {language.Assignments}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/filestorage" className="nav-link">
                <i className="fas fa-archive nav-icon" /> {language.File_Storage}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/chat" className="nav-link">
                <i className="far fa-comments nav-icon" />
                {language.Chat}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/private-chat" className="nav-link">
                <i className="fas fa-comments nav-icon" /> {language.Private_Chat}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/todo-list" className="nav-link">
                <i className="fas fa-tasks nav-icon" /> {language.Todo}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="#" onClick={Calendar} className="nav-link">
                <i className="fas fa-calendar-alt nav-icon" /> {language.Calendar}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/forum" className="nav-link">
                <i className="fas fa-pencil-alt nav-icon" /> {language.Forum}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/userprofile" className="nav-link">
                <i className="fas fa-address-card nav-icon" /> {language.User_Profile}
              </Link>
            </li>

            <li className="nav-item">
              <Link to="#" className="nav-link" onClick={onLogout} >
                <i className="fas fa-sign-out-alt nav-icon sign-out"  />
                {language.Sign_Out}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
