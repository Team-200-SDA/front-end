import { Fab, IconButton, TextField } from '@material-ui/core';
import { DeleteRounded, Send } from '@material-ui/icons';
import { format } from 'date-fns';
import produce from 'immer';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import PrivChatApi from '../../api/PrivChatApi';
import PrivMessage from './PrivMessage';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function PrivChatThread({
  conversations,
  activeThreadReceiver,
  setActiveThreadReceiver,
  setConversations
}) {
  const [messageField, setMessageField] = useState('');
  // This needs to be let, or inbox (parent component) wont update with
  // messages from other/new 1st time senders 🤷‍♂️
  // const { language } = useContext(LangContext);
  let thread = conversations.find(thread => thread.receiverName === activeThreadReceiver);

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
    setActiveThreadReceiver('');
    removeThread(thread);
  };

  const removeThread = deleteThread => {
    // This is used to remove the empty thread from the conversations array
    const immerState = produce(conversations, draft => {
      return draft.filter(thread => thread.receiverName !== deleteThread.receiverName);
    });
    setConversations(immerState);
  };

  const messagesToRender = thread.thread.map(message => (
    <PrivMessage key={uuid()} message={message} />
  ));

  return (
    <div className="card public-chat-body">
      <div className="private-chat-wrapper">
        <div className="jsx-messages">{messagesToRender}</div>
      </div>
      <form
        onSubmit={e => sendMessage(e)}
        className="message-form"
        noValidate
        autoComplete="off">
        <TextField
          color="primary"
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
        <DeleteRounded className="delete-thread" onClick={() => deleteMessages()} />
      </div>
    </div>
  );
}

export default PrivChatThread;
