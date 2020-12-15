import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './css/style.css';
import LangContextProvider from './js/states/LanguageContext';

// document.documentElement.style.setProperty('--primary', 'rgb(47, 104, 134)');
// document.documentElement.style.setProperty('--secondary', 'rgb(22, 27, 34)');
// document.documentElement.style.setProperty('--light', 'rgb(6, 9, 15)');
// document.documentElement.style.setProperty('--accent', 'rgb(13, 17, 23)');
// document.documentElement.style.setProperty('--text', 'rgb(179, 179, 179)');
// document.documentElement.style.setProperty('--subtext', '#606060');

ReactDOM.render(
  <React.StrictMode>
    <LangContextProvider>
      <App />
    </LangContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
