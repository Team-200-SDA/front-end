/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { format } from 'date-fns';
import ChatMessage from './ChatMessage';

const wsEndpoint = 'http://localhost:8080/ws';
const user = window.sessionStorage.getItem('user');

function Chat() {
  const [messages, setMessages] = useState([]);
  const socket = new SockJS(wsEndpoint, null, {
    transports: ['xhr-streaming'],
    headers: { Authorization: window.sessionStorage.getItem('_token') }
  });
  const stompClient = Stomp.over(socket);

  useEffect(() => {
    stompClient.connect({}, onConnected, onError);
  }, []);

  const onConnected = () => {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);
    //Send Username To Server
    stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({ sender: user, type: 'JOIN' })
    );
  };

  const onMessageReceived = payload => {
    const message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {
      message.content = 'Joined!';
    } else if (message.type === 'LEAVE') {
      message.content = 'Left!';
    }
    message.time = format(new Date(), 'HH:MM');
    setMessages(...messages, [message]);
  };

  // const sendMessage = () => {
  //   console.log('send msg');
  // };

  function onError() {
    console.log('error');
  }

  const messagesToRender = messages.map(message => (
    <ChatMessage key={uuid()} message={message} />
  ));

  return <div>{messagesToRender}</div>;
}

export default Chat;
