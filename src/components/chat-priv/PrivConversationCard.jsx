import React from 'react';
import { Avatar, Box, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

function PrivConversationCard({ conversation }) {
  const lastMessage = conversation['thread'][conversation['thread'].length - 1];

  return (
    <Paper elevation={3}>
      <Link to={`/chat-thread/${conversation.receiverName}`}>
        <Box className={`message-body message-box-priv`} color="primary.contrastText">
          <Avatar className={`message-avatar-priv`}>T</Avatar>
          <div className="message-sender">{conversation.receiverName}</div>
          <div className="message-content">
            {lastMessage.content.length < 20
              ? lastMessage.content
              : lastMessage.content.substring(0, 19)}
          </div>
          <div className="message-time">{lastMessage.date}</div>
        </Box>
      </Link>
    </Paper>
  );
}

export default PrivConversationCard;
