import { Avatar, Box } from '@material-ui/core';
import React from 'react';

function ChatMessage({ message }) {
  const user = window.sessionStorage.getItem('user');
  const { sender, content, date } = message;
  const senderOrUser = sender === user ? 'user' : 'sender';

  return (
    <Box className={`message-body message-box-${senderOrUser}`}>
      <Avatar className={`message-avatar-${senderOrUser}`}>{sender.charAt(0)}</Avatar>
      {senderOrUser === 'sender' ? <div className="message-sender">{sender}</div> : null}
      <div className="message-content">{content}</div>
      <div className="message-time">{date}</div>
    </Box>
  );
}

export default ChatMessage;
