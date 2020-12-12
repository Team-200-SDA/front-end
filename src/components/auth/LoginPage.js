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
        <div className="col-md-6 " style={{ color: 'white' }}>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {language.language}
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" onClick={changeEn} href="#">
                {language.english}
              </a>
              <a className="dropdown-item" onClick={changeSv} href="#">
                {language.swedish}
              </a>
              <a className="dropdown-item" onClick={changeEs} href="#">
                {language.spanish}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
