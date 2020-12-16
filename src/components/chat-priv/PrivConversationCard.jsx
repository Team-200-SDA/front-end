import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

function PrivConversationCard({
  conversation,
  setActiveThreadReceiver,
  activeThreadReceiver
}) {
  return (
    <Link to="#" onClick={() => setActiveThreadReceiver(conversation.receiverName)}>
      <Box
        className={`message-box-priv ${
          activeThreadReceiver === conversation.receiverName ? 'active-receiver' : null
        }`}
        color="primary.contrastText">
        <Avatar className={`message-avatar-priv`}>
          {conversation.receiverName.charAt(0)}
        </Avatar>
        <div
          className={`private-message-sender ${
            activeThreadReceiver === conversation.receiverName ? 'active-receiver' : null
          }`}>
          {conversation.receiverName}
        </div>
      </Box>
    </Link>
  );
}

export default PrivConversationCard;
