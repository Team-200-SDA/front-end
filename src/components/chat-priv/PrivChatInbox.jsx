/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PrivConversationCard from './PrivConversationCard';
import { v4 as uuid } from 'uuid';
import { Dropdown } from 'semantic-ui-react';
import UserApi from '../../api/UserApi';
import { format } from 'date-fns';
import PrivChatApi from '../../api/PrivChatApi';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';
import PrivChatThread from './PrivChatThread';

function PrivChatInbox({ conversations, setConversations }) {
  const { language } = useContext(LangContext);
  const loggedInUser = window.sessionStorage.getItem('user');
  const [activeUserThreads, setActiveUserThreads] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [activeThreadReceiver, setActiveThreadReceiver] = useState('');
  const [displayUsers, setDisplayUsers] = useState(false); // For mobile mode

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
      key: user.email,
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

  useEffect(() => {
    if (conversations.length !== 0) {
      setActiveThreadReceiver(sortedConversations[0].receiverName);
    }
  }, []);

  return (
    <>
      <div className="title-div">
        <h1 className="page-title-text priv-chat-title">
          <i className="fas fa-comments title-icon" />
          {language.Private_Chat}
        </h1>
      </div>
      <div className="card-body ">
        {' '}
        <div className="start-conversation">
          <Dropdown
            disabled={dropDownUsers.length === 0}
            className="conversation-dropdown"
            onChange={(event, data) => setSelectedUser(data.value)}
            // Erkan. Text changed from "with..." to "Send message to"
            placeholder={'Send message to'}
            selection
            options={dropDownUsers}
          />
          <i
            className="fas fa-paper-plane conversation-button"
            onClick={() => sendMessage(selectedUser)}
          />
          <i
            onClick={() => setDisplayUsers(!displayUsers)}
            className="fas fa-bars private-users-toggle"
          />
        </div>
        <div className="private-chat-wrap private-chat-layout">
          <div className={`priv-chat-border ${displayUsers ? null : 'private-users'}`}>
            {jsxConversations}
          </div>
          {activeThreadReceiver !== '' ? (
            <PrivChatThread
              setConversations={setConversations}
              setActiveThreadReceiver={setActiveThreadReceiver}
              activeThreadReceiver={activeThreadReceiver}
              conversations={conversations}
            />
          ) : (
            <>
              <div></div>
              {/* Erkan */}
              <div className="no-active-conversation">No Active Conversations</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PrivChatInbox;
