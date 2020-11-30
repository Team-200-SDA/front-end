import React, { useContext, useEffect, useState } from 'react';
import PrivConversationCard from './PrivConversationCard';
import { v4 as uuid } from 'uuid';

function PrivChatInbox() {
  const [renderedConv, setRenderConv] = useState([]);
  // console.log(conversations);

  // useEffect(() => {
  //   setRenderConv(conversations);
  // }, [conversations]);

  return (
    <>
      {/* {renderedConv.map(conversation => {
        return <PrivConversationCard key={uuid()} conversation={conversation} />;
      })} */}
    </>
  );
}

export default PrivChatInbox;
