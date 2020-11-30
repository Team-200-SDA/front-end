import React from 'react';
import { Avatar, Box, Paper } from '@material-ui/core';

function PrivConversationCard({ conversation }) {
  const lastMessage = conversation['thread'][conversation['thread'].length - 1];

  return (
    <>
      <Paper elevation={3}>
        <Box className={`message-body message-box-sender`} color="primary.contrastText">
          <Avatar className={`message-avatar-sender`}>T</Avatar>
          <div className="message-sender">{conversation.receiverName}</div>
          <div className="message-content">
            {lastMessage.content.length < 20
              ? lastMessage.content
              : lastMessage.content.substring(0, 19)}
          </div>
          <div className="message-time">{lastMessage.date}</div>
        </Box>
      </Paper>
    </>
  );
}

export default PrivConversationCard;
