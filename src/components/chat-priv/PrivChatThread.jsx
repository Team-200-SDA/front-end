import { Fab, IconButton, TextField } from '@material-ui/core';
import { DeleteRounded, Send } from '@material-ui/icons';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import PrivChatApi from '../../api/PrivChatApi';
import PrivMessage from './PrivMessage';

function PrivChatThread({ conversations }) {
  const history = useHistory();
  const [messageField, setMessageField] = useState('');
  const receiverName = useParams().receiverName;
  // This needs to be let, or inbox (parent component) wont update with
  // messages from other/new 1st time senders 🤷‍♂️
  let thread = conversations.find(thread => thread.receiverName === receiverName);

  const sendMessage = async event => {
    event.preventDefault();
    try {
      await PrivChatApi.sendMessage({
        content: messageField,
        date: format(new Date(), 'HH:mm dd-MMM-yyyy'),
        receiverEmail: thread.thread[0].receiverEmail
      });
      setMessageField('');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessages = () => {
    thread.thread.forEach(async msg => {
      await PrivChatApi.deleteMessage(msg.id);
    });
    history.push('/private-messaging');
    window.location.reload();
  };

  const messagesToRender = thread.thread.map(message => (
    <PrivMessage key={uuid()} message={message} />
  ));

  return (
    <div className="public-chat-wrap">
      <div className="public-chat-title-div">
        <h1 className="public-chat-title">Private Chat</h1>
      </div>
      <div className="card-body public-chat-body">
        <h3>Chatting with {thread.thread[0].receiverName}</h3>
        <div className="chat-wrapper">
          <div className="jsx-messages">{messagesToRender}</div>
        </div>

        <form
          onSubmit={e => sendMessage(e)}
          className="message-form"
          noValidate
          autoComplete="off">
          <TextField
            className="message-text-field"
            id="outlined-full-width"
            placeholder={`Send a message to ${thread.thread[0].receiverName}`}
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
          <Fab size="small" onClick={event => sendMessage(event)}>
            <Send />
          </Fab>
        </form>
        <div>
          <IconButton onClick={() => deleteMessages()}>
            <DeleteRounded />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default PrivChatThread;
