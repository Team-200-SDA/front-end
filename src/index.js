import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './css/style.css';
import LangContextProvider from './js/states/LanguageContext';

ReactDOM.render(
  <React.StrictMode>
    <LangContextProvider>
      <App />
    </LangContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);