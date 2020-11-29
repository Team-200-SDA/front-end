/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { find } from 'lodash';
let eventSource = undefined;

function PrivChat() {
  const [listening, setListening] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!listening) {
      // Establish Connection
      eventSource = new EventSourcePolyfill('http://localhost:8080/message/stream', {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('_token')
        }
      });

      // Message Received
      eventSource.onmessage = event => {
        let newMessage = JSON.parse(event.data);
        if (newMessage.id !== 'heartbeat') {
          // If event is not a 'heartbeat', create a temp copy of conversations[] to manipulate.
          // See if conversation with respondent exists, if true, add message to the conversation,
          // if false, create a conversation array  and add message to that conversation.
          const tempConversations = conversations;
          const existingConversation = find(conversations, [
            'receiverName',
            newMessage.receiverName
          ]);
          if (existingConversation !== undefined) {
            existingConversation['thread'].push(newMessage);
          } else {
            tempConversations.push({
              receiverName: newMessage.receiverName,
              thread: [newMessage]
            });
          }
          setConversations(tempConversations);
        }
      };

      // Error Received
      eventSource.onerror = event => {
        console.log('Error!', event);
        eventSource.close();
      };

      // Prevent reconnect if connection is active.
      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log('Closing source on unmount');
    };
  }, []);

  return <></>;
}

export default PrivChat;
