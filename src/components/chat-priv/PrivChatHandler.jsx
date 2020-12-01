/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { produce } from 'immer';
import PrivMessageContext from '../../js/states/PrivMessageContext';
import PrivMessageSetter from '../../js/states/PrivMessageSetterContext';

// Helper vars
let eventSource = undefined;

function PrivChatHandler() {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const conversations = useContext(PrivMessageContext);
  const setConversations = useContext(PrivMessageSetter);

  useEffect(() => {
    if (!listening) {
      // Establish Connection
      eventSource = new EventSourcePolyfill('http://localhost:8080/message/stream', {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('_token')
        }
      });
      // Error Received
      eventSource.onerror = event => {
        console.log('Error!', event);
        // eventSource.close();
      };
      // Prevent reconnect if connection is active.
      setListening(true);
    }
    return () => {
      eventSource.close();
      console.log('Closing event source on unmount');
    };
  }, []);

  useEffect(() => {
    // Message Received
    eventSource.onmessage = event => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.id !== 'heartbeat') {
        setMessages(existingMessages => [...existingMessages, newMessage]);
      }
    };
  }, []);

  useEffect(() => {
    messages.forEach(msg => {
      const immerState = produce(conversations, draftState => {
        if (draftState.find(thread => thread.receiverName === msg.receiverName)) {
          const foundThread = draftState.find(
            thread => thread[`receiverName`] === msg.receiverName
          );
          foundThread.thread.push(msg);
        } else {
          const newThread = {
            receiverName: msg.receiverName,
            thread: [msg]
          };
          draftState.push(newThread);
        }
      });
      setConversations(immerState);
    });
  }, [messages]);

  return <></>;
}

export default PrivChatHandler;
