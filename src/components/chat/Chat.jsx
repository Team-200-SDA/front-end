import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatMessage from './ChatMessage';
import { Fab, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';

const wsEndpoint = 'http://localhost:8080/ws';
const user = window.sessionStorage.getItem('user');
const socket = new SockJS(wsEndpoint, null, {
  transports: ['xhr-streaming'],
  headers: { Authorization: window.sessionStorage.getItem('_token') }
});
const stompClient = Stomp.over(socket);
console.log(stompClient);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageField, setMessageField] = useState('');

  useEffect(() => {
    stompClient.connect({}, onConnected, onError);
  }, []);

  function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);
    //Send Username To Server
    stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({ sender: user, type: 'JOIN' })
    );
  }

  function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {
      message.content = 'Joined!';
    } else if (message.type === 'LEAVE') {
      message.content = 'Left!';
    }
    setMessages(oldMessages => [...oldMessages, message]);
  }

  function sendMessage() {
    console.log(stompClient);
    if (messageField && stompClient) {
      const chatMessage = {
        sender: user,
        content: messageField,
        type: 'CHAT'
      };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
    }
    setMessageField('');
  }

  function onError() {
    console.log('error');
  }

  const submitHandler = e => {
    e.preventDefault();
    sendMessage();
  };

  const messagesToRender = messages.map(msg => {
    return <ChatMessage key={uuid()} message={msg} />;
  });

  return (
    <div className="paper">
      <div className="jsx-messages">{messagesToRender}</div>

      <form
        onSubmit={e => submitHandler(e)}
        className="message-form"
        noValidate
        autoComplete="off">
        <TextField
          className="message-text-field"
          id="outlined-full-width"
          placeholder="Type a message..."
          helperText="Enter or Click to send."
          fullWidth
          margin="normal"
          onChange={e => setMessageField(e.target.value)}
          value={messageField}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />

        <Fab size="small" onClick={e => submitHandler(e)}>
          <Send />
        </Fab>
      </form>
    </div>
  );
}

export default Chat;
