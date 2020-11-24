import { Avatar, Box, Paper } from '@material-ui/core';
import React from 'react';
const user = window.sessionStorage.getItem('user');

function ChatMessage({ message }) {
  const { sender, content, time } = message;
  const senderOrUser = sender === user ? 'user' : 'sender';

  return (
    <Paper elevation={3}>
      <Box className={`message-box-${senderOrUser}`} color="primary.contrastText">
        <Avatar className={`message-avatar-${senderOrUser}`}>{sender.charAt(0)}</Avatar>
        <div className="message-sender">{sender}</div>
        <div className="message-content">{content}</div>
        <div className="message-time">{time}</div>
      </Box>
    </Paper>
  );
}

export default ChatMessage;
