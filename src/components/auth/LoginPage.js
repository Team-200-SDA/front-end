import React from 'react';
import Auth from '../../services/Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { Card } from '@material-ui/core';

function LoginPage() {
  const { language, changeLanguage } = useContext(LangContext);
  const login = async loginData => {
    const loginSuccess = await Auth.login(loginData);

    if (!loginSuccess) {
      alert(language.invalid);
    }
  };

  const register = async registrationData => {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert(language.Couldnt_register);
    }
  };

  return (
    <div className="card login-wrap">
      <div className="login-picture">
        <div className="card-body login-form-div">
          <h1 className="brandName">Edulane</h1>
          <div className="loginForm">
            <LoginForm onSubmit={login} />
          </div>
          <div className="registerForm">
            <RegisterForm onSubmit={register} />
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <span className="footer-link">
          <a>English</a>
        </span>
        <span className="footer-link">
          <a>Swedish</a>
        </span>
      </footer>
    </div>
  );
}

export default LoginPage;
