import React from 'react';
import Auth from '../../services/Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function LoginPage() {
  const { language, changeEn, changeSv, changeEs } = useContext(LangContext);
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
          <h1 className="brand-name">Edulane</h1>
          <div className="login-form">
            <LoginForm onSubmit={login} />
          </div>
          <div className="register-form">
            <RegisterForm onSubmit={register} />
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <div className="btn-group">
          <span>
            <a className="footer-link" onClick={changeEn} href="#">
              {language.english}
            </a>
          </span>
          <span>
            <a className="footer-link" onClick={changeSv} href="#">
              {language.swedish}
            </a>
          </span>
          <span>
            <a className="footer-link" onClick={changeEs} href="#">
              {language.spanish}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
