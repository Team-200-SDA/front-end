import { Avatar, Box, Paper } from '@material-ui/core';
import React from 'react';

function PrivMessage({ message }) {
  const user = window.sessionStorage.getItem('user');
  const { content, date, author } = message;
  const senderOrUser = author === user ? 'user' : 'sender';

  return (
    <Box className={`message-body message-box-${senderOrUser}`}>
      <Avatar className={`message-avatar-${senderOrUser}`}>{author.charAt(0)}</Avatar>
      <div className="message-sender">{author}</div>
      <div className="message-content">{content}</div>
      <div className="message-time">{date}</div>
    </Box>
  );
}

export default PrivMessage;
