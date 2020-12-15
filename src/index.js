import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './css/style.css';
import LangContextProvider from './js/states/LanguageContext';

document.documentElement.style.setProperty('--primary', 'rgb(47, 104, 134)');
document.documentElement.style.setProperty('--secondary', '#d8d8d8');
document.documentElement.style.setProperty('--light', '#f2f2f2');
document.documentElement.style.setProperty('--text', ' hsla(193, 100%, 8%, 1)');
document.documentElement.style.setProperty('--accent', '#ececec');

ReactDOM.render(
  <React.StrictMode>
    <LangContextProvider>
      <App />
    </LangContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
