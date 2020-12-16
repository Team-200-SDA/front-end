import React, { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

// Chat Bot
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../js/chatbot-resources/ActionProvider';
import MessageParser from '../../js/chatbot-resources/MessageParser';
import config from '../../js/chatbot-resources/config';

export default function Footer() {
  const {
    language,
    changeLanguageToEn,
    changeLanguageToSv,
    changeLanguageToEs
  } = useContext(LangContext);
  const [botOpen, setBotOpen] = useState(false);
  const [dark, setDark] = useState(false);

  function darkMode() {
    setDark(!dark);
    if (dark) {
      document.documentElement.style.setProperty('--primary', 'rgb(47, 104, 134)');
      document.documentElement.style.setProperty('--secondary', 'rgb(22, 27, 34)');
      document.documentElement.style.setProperty('--light', 'rgb(6, 9, 15)');
      document.documentElement.style.setProperty('--accent', 'rgb(13, 17, 23)');
      document.documentElement.style.setProperty('--text', 'rgb(179, 179, 179)');
      document.documentElement.style.setProperty('--subtext', '#606060');
    } else {
      document.documentElement.style.setProperty('--primary', 'rgb(47, 104, 134)');
      document.documentElement.style.setProperty('--secondary', '#d8d8d8');
      document.documentElement.style.setProperty('--light', '#f2f2f2');
      document.documentElement.style.setProperty('--accent', '#ececec');
      document.documentElement.style.setProperty('--text', 'hsla(193, 100%, 8%, 1)');
      document.documentElement.style.setProperty('--subtext', '#8e8e8e');
    }
  }

  return (
    <footer className="bottom">
      <div className="btn-group dropup">
        <i
          type="button"
          className="fas fa-globe language-icon"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div className="dropdown-menu dropdown-menu-right">
          {' '}
          <li className="dropdown-item" href="#" onClick={changeLanguageToEn}>
            {language.english}
          </li>
          <li className="dropdown-item" href="#" onClick={changeLanguageToSv}>
            {language.swedish}
          </li>
          <li className="dropdown-item" href="#" onClick={changeLanguageToEs}>
            {language.spanish}
          </li>
        </div>
      </div>
      <div className="footer-button" variant="contained">
        <i onClick={darkMode} className="fas fa-adjust footer-icon" />
      </div>
      <span className="copyright">&#169;2020 EDULANE. All Rights Reserved</span>

      <div className="footer-button" variant="contained">
        <a href="mailto: sda.team200@gmail.com">
          <i className="fas fa-envelope footer-icon" />
        </a>
      </div>
      <div
        className="footer-button"
        onClick={() => setBotOpen(!botOpen)}
        variant="contained">
        <span className="bot-button-text">
          <i className="fas fa-robot footer-icon" />
        </span>
      </div>
      {botOpen ? (
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      ) : null}
    </footer>
  );
}
