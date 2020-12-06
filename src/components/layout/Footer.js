import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../chatbot-resources/ActionProvider';
import MessageParser from '../../chatbot-resources/MessageParser';
import config from '../../chatbot-resources/config';
import { Button } from '@material-ui/core';

export default function Footer() {
  const [botOpen, setBotOpen] = useState(false);
  return (
    <footer className="bottom bg-dark text-white ">
      <Button className="footer-button" variant="contained" color="primary">
        <a href="mailto: sda.team200@gmail.com">
          Contact-Us <i className="fas fa-envelope"></i>
        </a>
      </Button>

      <Button
        className="footer-button"
        onClick={() => setBotOpen(!botOpen)}
        variant="contained"
        color="primary">
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
