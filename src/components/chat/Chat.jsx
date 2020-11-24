import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Chat() {
  const user = window.sessionStorage.getItem('user');
  const socket = new SockJS('http://localhost:8080/ws', null, {
    transports: ['xhr-streaming'],
    headers: { Authorization: window.sessionStorage.getItem('_token') }
  });
  const stompClient = Stomp.over(socket);
  stompClient.connect({}, onConnected, onError);

  function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);
    stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({ sender: user, type: 'JOIN' })
    );
  }

  const onMessageReceived = () => {
    console.log('msg received');
  };

  // const sendMessage = () => {
  //   console.log('send msg');
  // };

  function onError() {
    console.log('error');
  }

  return (
    <div>
      <ul></ul>
    </div>
  );
}

export default Chat;
