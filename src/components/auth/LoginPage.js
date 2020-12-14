import React, { useState } from 'react';
import Auth from '../../services/Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

function LoginPage() {
  const { language, changeLanguageToEn, changeLanguageToSv, changeLanguageToEs } = useContext(LangContext);
  const [registered, setRegistered] = useState(true);

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

  const registerFlip = () => {
    setRegistered(!registered);
  };

  return (
    <div className="login-wrap">
      <div className="login-background" />
      <div className="card-body login-form-div">
        <h1 className="brand-name">Edulane</h1>

        <div className="login-register">
          {registered ? (
            <>
              <LoginForm onSubmit={login} />
              <div className="login-flip" onClick={registerFlip}>
                {language.Signup}
              </div>
            </>
          ) : (
            <>
              <RegisterForm onSubmit={register} />
              <div className="login-flip" onClick={registerFlip}>
                {language.Already_Registered}
              </div>
            </>
          )}
        </div>

        <div className="login-footer">
          <span>
            <span className="footer-link" onClick={changeLanguageToEn}>
              {language.english}
            </span>
          </span>
          <span>
            <span className="footer-link" onClick={changeLanguageToSv}>
              {language.swedish}
            </span>
          </span>
          <span>
            <span className="footer-link" onClick={changeLanguageToEs}>
              {language.spanish}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
