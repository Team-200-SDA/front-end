import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { PrivMessageState } from '../../js/states/PrivMessageState-atom';
import { PrivConvState } from '../../js/states/PrivConvState-atom';
import { cloneDeep } from 'lodash';
let eventSource = undefined;
const clone = require('rfdc')();

function PrivChatHandler({ privMessages, setPrivMessages }) {
  const [listening, setListening] = useState(false);
  const [conversations, setConversations] = useRecoilState(PrivConvState);
  const [messages, setMessages] = useRecoilState(PrivMessageState);

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

  useEffect(() => {
    // Message Received
    eventSource.onmessage = event => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.id !== 'heartbeat') {
        newMessage.date = format(new Date(), 'HH:mm dd-MMM-yyyy');
        setMessages(e => [...e, newMessage]);
      }
    };
  }, []);

  useEffect(() => {
    messages.forEach(msg => {
      const dc = cloneDeep(privMessages);
      if (dc.find(thread => thread.receiverName === msg.receiverName)) {
        console.log('found existing');
        const foundThread = dc.find(thread => thread.receiverName === msg.receiverName);
        foundThread.thread.push(msg);
      } else {
        const newC = {
          receiverName: msg.receiverName,
          thread: [msg]
        };
        dc.push(newC);
      }
      setPrivMessages(dc);
    });
  }, [messages]);

  useEffect(() => {
    console.log(privMessages);
  }, [privMessages]);

  return <></>;
}

export default PrivChatHandler;
