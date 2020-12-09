import React, { useEffect, useState } from 'react';
import PrivConversationCard from './PrivConversationCard';
import { v4 as uuid } from 'uuid';
import { Dropdown } from 'semantic-ui-react';
import UserApi from '../../api/UserApi';
import { format } from 'date-fns';
import PrivChatApi from '../../api/PrivChatApi';
import { Button } from '@material-ui/core';
import PrivChatThread from './PrivChatThread';

function PrivChatInbox({ conversations, setConversations }) {
  const loggedInUser = window.sessionStorage.getItem('user');
  const [activeUserThreads, setActiveUserThreads] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [activeThreadReceiver, setActiveThreadReceiver] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const response = await UserApi.getAllUsers();
      setUsers(response.data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const activeUsers = conversations.map(thread => thread.receiverName);
    setActiveUserThreads(activeUsers);
  }, [conversations]);

  const sendMessage = async userInfo => {
    const infoArray = userInfo.split(' '); // Create array from string info
    try {
      await PrivChatApi.sendMessage({
        content: `Started a conversation with ${infoArray[1]}`,
        date: format(new Date(), 'HH:mm dd-MMM-yyyy'),
        receiverEmail: infoArray[0]
      });
      infoArray.shift();
      setTimeout(() => {
        setActiveThreadReceiver(infoArray.join(' '));
      }, 75);
    } catch (error) {
      console.log(error);
    }
  };

  const dropDownFiltered = users.filter(
    user => user.name !== loggedInUser && !activeUserThreads.includes(user.name)
  );

  const dropDownSorted = dropDownFiltered.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );

  const dropDownUsers = dropDownSorted.map(user => {
    return {
      key: user.name,
      text: user.name,
      value: `${user.email} ${user.name}` // Have to use string. Object will break dropdown.
    };
  });

  const sortedConversations = conversations
    .slice()
    .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : a.timeStamp < b.timeStamp ? 1 : 0));

  const jsxConversations = sortedConversations.map(conversation => (
    <PrivConversationCard
      key={uuid()}
      activeThreadReceiver={activeThreadReceiver}
      setActiveThreadReceiver={setActiveThreadReceiver}
      conversation={conversation}
    />
  ));

  return (
    <>
      <div className="public-chat-title-div">
        <h1 className="public-chat-title">Private Chat</h1>
      </div>
      <div className="start-conversation">
        <Button
          className="conversation-button"
          onClick={() => sendMessage(selectedUser)}
          variant="contained"
          color="primary">
          Start a conversation
        </Button>
        <Dropdown
          disabled={dropDownUsers.length === 0}
          className="conversation-dropdown"
          onChange={(event, data) => setSelectedUser(data.value)}
          placeholder="with... ?"
          selection
          options={dropDownUsers}
        />
      </div>
      <div className="card-body private-chat-wrap private-chat-layout">
        <div>{jsxConversations}</div>
        {activeThreadReceiver !== '' ? (
          <PrivChatThread
            setConversations={setConversations}
            setActiveThreadReceiver={setActiveThreadReceiver}
            activeThreadReceiver={activeThreadReceiver}
            conversations={conversations}
          />
        ) : null}
      </div>
    </>
  );
}

export default PrivChatInbox;
