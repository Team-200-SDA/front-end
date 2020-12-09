import React, { useState } from 'react';
import { Button } from '@material-ui/core';

// Chat Bot
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../js/chatbot-resources/ActionProvider';
import MessageParser from '../../js/chatbot-resources/MessageParser';
import config from '../../js/chatbot-resources/config';

export default function Footer() {
  const [botOpen, setBotOpen] = useState(false);
  return (
    <footer className="bottom">
      <div className="footer-button" variant="contained">
        <a href="mailto: sda.team200@gmail.com">
          <i class="fas fa-envelope footer-icon" />
        </a>
      </div>
      <span className="copyright">&#169;2020 EDULANE. All Rights Reserved</span>
      <div
        className="footer-button"
        onClick={() => setBotOpen(!botOpen)}
        variant="contained">
        <span className="bot-button-text">
          <i class="fas fa-robot footer-icon" />
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
