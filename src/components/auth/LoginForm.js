import { FormLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { language } = useContext(LangContext);

  return (
    <div className="login-form">
      <h4 className="card-title">{language.login}</h4>
      <div>
        <div className="form-group">
          <FormLabel className="form-label" component="legend">
            {language.email}
          </FormLabel>
          <input
            type="email"
            className="form-control subject-input"
            placeholder={language.email}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <FormLabel className="form-label" component="legend">
            {language.pass}
          </FormLabel>
          <input
            type="password"
            placeholder={language.pass}
            className="form-control subject-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button
            className="btn login-button"
            onClick={() => onSubmit({ email, password })}>
            {language.login}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
