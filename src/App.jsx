import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './services/Auth';
import Navbar from './components/layout/Navbar';

// Import pages
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/home/HomePage';
import Chat from './components/chat/Chat';
// import Userprofile from './components/userprofile/UserProfile';
import LecturePage from './components/lecture/LecturePage';

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
            <LecturePage />
          </Route>
          <Route path="/chat" exact>
            <Chat />
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
