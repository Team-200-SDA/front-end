import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './services/Auth';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { RecoilRoot } from 'recoil';

// Import pages
import LoginPage from './components/auth/LoginPage';
import NewsPage from './components/news/NewsPage';
import Chat from './components/chat/Chat';
import LiveVideo from './components/live/LiveVideo';
import Userprofile from './components/userprofile/UserProfile';
import AssignmentPage from './components/assignment/AssignmentPage';
import FileStoragePage from './components/filestorage/FileStoragePage';
import PrivChatHandler from './components/chat-priv/PrivChatHandler';
import PrivChatInbox from './components/chat-priv/PrivChatInbox';
import TodoCreateComponent from './components/todo/TodoCreateComponent';
import TodoListComponent from './components/todo/TodoListComponent';
import SubjectsPage from './components/subject/SubjectsPage';
import LecturePage from './components/lecture/LecturePage';
import PostsPage from './components/forum/posts/PostsPage';
import CommentPageDetails from './components/forum/comments/CommentPageDetails';
import CalendarComponent from './components/calendar/CalendarComponent';

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [conversations, setConversations] = useState([]);

  Auth.bindLoggedInStateSetter(setLoggedIn);

  const loggedInRouter = (
    <div className="app">
      <RecoilRoot>
        <Router>
          <PrivChatHandler
            conversations={conversations}
            setConversations={setConversations}
          />
          <Navbar onLogout={() => Auth.logout()} />
          <div className="center">
            <Switch>
              <Route path="/" exact>
                <NewsPage />
              </Route>
              <Route path="/lectures" exact>
                <SubjectsPage />
              </Route>
              <Route path="/lectures/:id" exact>
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
              <Route path="/filestorage">
                <FileStoragePage />
              </Route>

              <Route path="/calendar">
                <CalendarComponent />
              </Route>

              <Route path="/userprofile">
                <Userprofile />
              </Route>
              <Route path="/private-chat">
                <PrivChatInbox
                  conversations={conversations}
                  setConversations={setConversations}
                />
              </Route>
              <Route path="/todo-list">
                <TodoListComponent />
              </Route>
              <Route path="/todo-form">
                <TodoCreateComponent />
              </Route>

              <Route path="/forum" exact>
                <PostsPage />
              </Route>
              <Route
                path="/post/:id/comments"
                render={({ match }) => <CommentPageDetails match={match} />}
              />
            </Switch>
          </div>

          <Footer />
        </Router>
      </RecoilRoot>
    </div>
  );

  return loggedIn ? loggedInRouter : <LoginPage />;
}

export default App;
