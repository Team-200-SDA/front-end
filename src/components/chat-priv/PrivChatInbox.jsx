import React from 'react';
import PrivConversationCard from './PrivConversationCard';
import { v4 as uuid } from 'uuid';

function PrivChatInbox({ conversations }) {
  const jsxConversations = conversations.map(conversation => (
    <PrivConversationCard key={uuid()} conversation={conversation} />
  ));

  return <>{jsxConversations}</>;
}

export default PrivChatInbox;
