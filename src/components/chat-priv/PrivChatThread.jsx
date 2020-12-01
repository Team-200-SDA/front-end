import { Fab, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import PrivMessage from './PrivMessage';

function PrivChatThread() {
  const location = useLocation();
  const conversation = location.state.conversation.thread;
  const [messageField, setMessageField] = useState('');

  function sendMessage() {
    console.log('sending message');
    setMessageField('');
  }

  const submitHandler = e => {
    e.preventDefault();
    sendMessage();
  };

  const messagesToRender = conversation.map(msg => {
    return <PrivMessage key={uuid()} message={msg} />;
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

export default PrivChatThread;
