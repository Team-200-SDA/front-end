import React, { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

// Chat Bot
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../js/chatbot-resources/ActionProvider';
import MessageParser from '../../js/chatbot-resources/MessageParser';
import config from '../../js/chatbot-resources/config';

export default function Footer() {
  const { language, changeEn, changeSv, changeEs } = useContext(LangContext);
  const [botOpen, setBotOpen] = useState(false);
  return (
    <footer className="bottom">
      <div class="btn-group dropup">
        <i
          type="button"
          class="fas fa-globe language-icon"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div class="dropdown-menu dropdown-menu-right">
          {' '}
          <li className="dropdown-item" href="#" onClick={changeEn}>
            {language.english}
          </li>
          <li className="dropdown-item" href="#" onClick={changeSv}>
            {language.swedish}
          </li>
          <li className="dropdown-item" href="#" onClick={changeEs}>
            {language.spanish}
          </li>
        </div>
      </div>
      <div className="footer-button" variant="contained">
        <a href="https://www.youtube.com/">
          <i class="fas fa-info-circle footer-icon" />
        </a>
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
