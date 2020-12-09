import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

function PrivConversationCard({ conversation, setActiveThreadReceiver }) {
  return (
    <Box className={`message-box-priv`} color="primary.contrastText">
      <Link to="#" onClick={() => setActiveThreadReceiver(conversation.receiverName)}>
        <Avatar className={`message-avatar-priv`}>T</Avatar>
        <div className="message-sender">{conversation.receiverName}</div>
      </Link>
    </Box>
  );
}

export default PrivConversationCard;
