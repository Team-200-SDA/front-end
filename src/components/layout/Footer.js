import React, { useState } from 'react';
import { Button } from '@material-ui/core';

// Chat Bot
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../js/chatbot-resources/ActionProvider';
import MessageParser from '../../js/chatbot-resources/MessageParser';
import config from '../../js/chatbot-resources/config';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function Footer() {
  const { language } = useContext(LangContext);
  const [botOpen, setBotOpen] = useState(false);
  return (
    <footer className="bottom bg-dark text-white ">
      <Button className="footer-button" variant="contained">
        <a href="mailto: sda.team200@gmail.com">
          {language.Contact_Us} <i className="fas fa-envelope"></i>
        </a>
      </Button>
      <Button
        className="footer-button"
        onClick={() => setBotOpen(!botOpen)}
        variant="contained">
        <span className="bot-button-text">
          Bot &nbsp;&nbsp;
          <i className="fas fa-robot" />
        </span>
      </Button>
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
