import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './services/Auth';
import Navbar from './components/layout/Navbar';
// Chat Bot
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './chatbot-resources/ActionProvider';
import MessageParser from './chatbot-resources/MessageParser';
import config from './chatbot-resources/config';
// Import pages
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/home/HomePage';
import Chat from './components/chat/Chat';
import LiveVideo from './components/live/LiveVideo/LiveVideo';
// import Userprofile from './components/userprofile/UserProfile';
import Lecture from './components/lecture/Lecture';
import AssignmentPage from './components/assignment/AssignmentPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  Auth.bindLoggedInStateSetter(setLoggedIn);

  const loggedInRouter = (
    <Router>
      <Navbar onLogout={() => Auth.logout()} />

      <div className="container mt-5">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/lectures" exact>
            <Lecture />
          </Route>
          <Route path="/assignments" exact>
            <AssignmentPage />
          </Route>
          <Route path="/chat" exact>
            <Chat />
          </Route>

          <Route path="/bot" exact>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </Route>

          <Route path="/live">
            <LiveVideo />
          </Route>

          {/* <Route path="/userprofile">
            <Userprofile />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );

  return loggedIn ? loggedInRouter : <LoginPage />;
}

export default App;
