/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PrivConversationCard from './PrivConversationCard';
import { v4 as uuid } from 'uuid';
import { Dropdown } from 'semantic-ui-react';
import UserApi from '../../api/UserApi';
import { format } from 'date-fns';
import PrivChatApi from '../../api/PrivChatApi';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';
import PrivChatThread from './PrivChatThread';

function PrivChatInbox({ conversations, setConversations }) {
  const { language } = useContext(LangContext);
  const loggedInUser = window.sessionStorage.getItem('user');
  const [activeUserThreads, setActiveUserThreads] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [activeThreadReceiver, setActiveThreadReceiver] = useState('');
  const [displayUsers, setDisplayUsers] = useState(false); // For mobile mode

  /**
   * On mount, get a list of all the users on the platform.
   */
  useEffect(() => {
    const getUsers = async () => {
      const response = await UserApi.getAllUsers();
      setUsers(response.data);
    };
    getUsers();
  }, []);

  /**
   * Whenever a new conversation is established with a user, map it to an array
   * of message threads that will be displayed in an inbox.
   */
  useEffect(() => {
    const activeUsers = conversations.map(thread => thread.receiverName);
    setActiveUserThreads(activeUsers);
  }, [conversations]);

  /**
   * @param {*} userInfo
   * User info consists of a single string containing both a username and email address.
   * Split the string to separate the values.
   * Do a POST request with the message object, using the email address from the infoArray.
   * Set the new conversation as the active conversation to be rendered to the screen. This
   * is done by username.
   */
  const sendMessage = async userInfo => {
    const infoArray = userInfo.split(' '); // Create array from string info
    try {
      await PrivChatApi.sendMessage({
        content: `Started a conversation with ${infoArray[1]}`,
        date: format(new Date(), 'HH:mm dd-MMM-yyyy'),
        receiverEmail: infoArray[0]
      });
      infoArray.shift();
      // Use timeout to avoid info array not being undefined
      setTimeout(() => {
        setActiveThreadReceiver(infoArray.join(' '));
      }, 75);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Creates a list of users to whom new messages can be sent. This list can not contain the logged
   * in user, or users that already have active conversations with the logged in user.
   */
  const dropDownFiltered = users.filter(
    user => user.name !== loggedInUser && !activeUserThreads.includes(user.name)
  );

  /**
   * The dropdown user list is sorted by name.
   */
  const dropDownSorted = dropDownFiltered.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );

  /**
   * Create the dropdown list objects based on user name and email.
   */
  const dropDownUsers = dropDownSorted.map(user => {
    return {
      key: user.email,
      text: user.name,
      value: `${user.email} ${user.name}` // Have to use string. Object will break dropdown.
    };
  });

  /**
   * Active conversations are sorted based on the latest message received.
   */
  const sortedConversations = conversations
    .slice()
    .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : a.timeStamp < b.timeStamp ? 1 : 0));

  /**
   * Creates an array of conversation threads to render to the inbox.
   */
  const jsxConversations = sortedConversations.map(conversation => (
    <PrivConversationCard
      key={uuid()}
      activeThreadReceiver={activeThreadReceiver}
      setActiveThreadReceiver={setActiveThreadReceiver}
      conversation={conversation}
    />
  ));

  /**
   * Every time the component mounts, set the conversation with the latest reply as the active conversation.
   * Effectively rendering the conversation.
   */
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
            placeholder={language.Send_message_to}
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
          {/* <div></div> */}
          {activeThreadReceiver !== '' ? (
            <PrivChatThread
              setConversations={setConversations}
              setActiveThreadReceiver={setActiveThreadReceiver}
              activeThreadReceiver={activeThreadReceiver}
              conversations={conversations}
            />
          ) : (
            <>
              <div className="no-active-conversation">
                {language.No_Active_Conversations}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PrivChatInbox;
