/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatMessage from './ChatMessage';
import { Fab, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { format } from 'date-fns';
import { LangContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';

const wsEndpoint = 'https://edulane-backend.herokuapp.com/ws';
const sockJsConfig = {
  transports: ['xhr-streaming'],
  headers: { Authorization: window.sessionStorage.getItem('_token') }
};
// These need to be re-instantiated in a UE for the connection to re-establish the
// connection when revisiting the page. The initial SockJS instantiation needs to take place
// outside of the function to avoid NOE. Doing in an a UE,[] is not fast enough.
let socket = new SockJS(wsEndpoint, null, sockJsConfig);
let stompClient = Stomp.over(socket);

function Chat() {
  const { language } = useContext(LangContext);
  const user = window.sessionStorage.getItem('user');
  const [messages, setMessages] = useState([]);
  const [messageField, setMessageField] = useState('');

  useEffect(() => {
    socket = new SockJS(wsEndpoint, null, sockJsConfig);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    // Disconnect the socket connection when component un-mounts.
    return () => stompClient.disconnect();
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
    if (message.type === 'JOIN' || message.type === 'LEAVE') {
      return;
    }
    message.time = format(new Date(), 'HH:mm');
    setMessages(oldMessages => [...oldMessages, message]);
  }

  function sendMessage(event) {
    event.preventDefault();
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

  const messagesToRender = messages.map(msg => {
    return <ChatMessage key={uuid()} message={msg} />;
  });

  return (
    <div className="public-chat-wrap">
      <div className="public-chat-title-div">
        <h1 className="public-chat-title">
          <i class="far fa-comments title-icon" />
          Public Chat
        </h1>
      </div>

      <div className="card-body public-chat-body">
        <div className="chat-wrapper">
          <div className="jsx-messages">{messagesToRender}</div>
        </div>

        <form
          onSubmit={event => sendMessage(event)}
          className="message-form"
          noValidate
          autoComplete="off">
          <TextField
            className="message-text-field"
            id="outlined-full-width"
            placeholder={language.Type_message}
            helperText={language.Enter_Click}
            fullWidth
            margin="normal"
            onChange={e => setMessageField(e.target.value)}
            value={messageField}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          <Fab size="small" onClick={event => sendMessage(event)}>
            <Send />
          </Fab>
        </form>
      </div>
    </div>
  );
}

export default Chat;
