import React, { useEffect, useState } from 'react';
import PrivConversationCard from './PrivConversationCard';
import { v4 as uuid } from 'uuid';
import { Dropdown } from 'semantic-ui-react';
import UserApi from '../../api/UserApi';
import { format } from 'date-fns';
import PrivChatApi from '../../api/PrivChatApi';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

function PrivChatInbox({ conversations }) {
  const loggedInUser = window.sessionStorage.getItem('user');
  const [activeUserThreads, setActiveUserThreads] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getUsers = async () => {
      const response = await UserApi.getAllUsers();
      setUsers(response.data);
      console.log(response.data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const activeUsers = conversations.map(thread => thread.receiverName);
    setActiveUserThreads(activeUsers);
  }, [conversations]);

  const sendMessage = async receiverEmail => {
    try {
      await PrivChatApi.sendMessage({
        content: 'Has started a conversation...',
        date: format(new Date(), 'HH:mm dd-MMM-yyyy'),
        receiverEmail: receiverEmail
      });
      const receiverName = findUserByEmail(receiverEmail).name;
      setTimeout(() => {
        history.push(`chat-thread/${receiverName}`);
      }, 10);
    } catch (error) {
      console.log(error);
    }
  };

  const findUserByEmail = dropDownEmail =>
    users.find(user => user.email === dropDownEmail);

  const dropDownFiltered = users.filter(
    user => user.name !== loggedInUser && !activeUserThreads.includes(user.name)
  );
  const dropDownUsers = dropDownFiltered.map(user => {
    return { key: user.name, text: user.name, value: user.email };
  });

  const jsxConversations = conversations.map(conversation => (
    <PrivConversationCard key={uuid()} conversation={conversation} />
  ));

  return (
    <div>
      <div>
        <Button
          onClick={() => sendMessage(selectedUser)}
          variant="contained"
          color="primary">
          Start a conversation
        </Button>
        <Dropdown
          onChange={(event, data) => setSelectedUser(data.value)}
          placeholder="with... ?"
          selection
          options={dropDownUsers}
        />
      </div>
      {jsxConversations}
    </div>
  );
}

export default PrivChatInbox;
