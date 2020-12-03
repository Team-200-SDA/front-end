import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './services/Auth';
import Navbar from './components/layout/Navbar';
//import React, { Component } from 'react';
//import { Chat as ChatPopup } from 'react-chat-popup';
import PrivMessageContext from './js/states/PrivMessageContext';
import PrivMessageSetterContext from './js/states/PrivMessageSetterContext';

/// Import pages
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/home/HomePage';
import Chat from './components/chat/Chat';
import LiveVideo from './components/live/LiveVideo/LiveVideo';
// import Userprofile from './components/userprofile/UserProfile';
import Userprofile from './components/userprofile/UserProfile';
import Calendar from './components/calendar/Calendar';
// import Userprofile from './components/userprofile/UserProfile';
import LecturePage from './components/lecture/LecturePage';
import AssignmentPage from './components/assignment/AssignmentPage';
import PrivChatHandler from './components/chat-priv/PrivChatHandler';
import PrivChatInbox from './components/chat-priv/PrivChatInbox';
import PrivChatThread from './components/chat-priv/PrivChatThread';
import FooterComponent from './components/layout/FooterComponent';

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [conversations, setConversations] = useState([]);
  Auth.bindLoggedInStateSetter(setLoggedIn);

  const loggedInRouter = (
    <Router>
      <PrivMessageContext.Provider value={conversations}>
        <PrivMessageSetterContext.Provider value={setConversations}>
          <PrivChatHandler />
          <Navbar onLogout={() => Auth.logout()} />
          <div className="container mt-5">
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/lectures" exact>
                <LecturePage />
              </Route>
              <Route path="/assignments" exact>
                <AssignmentPage />
              </Route>
              <Route path="/chat" exact>
                <Chat />
              </Route>

              <Route path="/live">
                <LiveVideo />
              </Route>

              <Route path="/calendar">
                <Calendar />
              </Route>
              <Route path="/userprofile">
                <Userprofile />
              </Route>
              <Route path="/pchat">
                <PrivChatInbox conversations={conversations} />
              </Route>
              <Route path="/chat-thread">
                <PrivChatThread />
              </Route>
            </Switch>
          </div>
          <FooterComponent />
        </PrivMessageSetterContext.Provider>
      </PrivMessageContext.Provider>
    </Router>
  );

  return loggedIn ? loggedInRouter : <LoginPage />;
}

export default App;
