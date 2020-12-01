import { Avatar, Box, Paper } from '@material-ui/core';
import React from 'react';

const user = window.sessionStorage.getItem('user');

function PrivMessage({ message }) {
  const { senderName, content, date } = message;
  const senderOrUser = senderName === user ? 'user' : 'sender';

  return (
    <Paper elevation={3}>
      <Box
        className={`message-body message-box-${senderOrUser}`}
        color="primary.contrastText">
        <Avatar className={`message-avatar-${senderOrUser}`}>
          {senderName.charAt(0)}
        </Avatar>
        <div className="message-sender">{senderName}</div>
        <div className="message-content">{content}</div>
        <div className="message-time">{date}</div>
      </Box>
    </Paper>
  );
}

export default PrivMessage;
