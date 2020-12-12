import React from 'react';
import Auth from '../../services/Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function LoginPage() {
  const { language, changeEn, changeSv, changeEs } = useContext(
    LangContext
  );
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
    <div className="wrapper">
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-6 " style={{ color: 'white' }}>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                {language.language}
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" onClick={changeEn} href="#">
                  {language.english}
                </a>
                <a class="dropdown-item" onClick={changeSv} href="#">
                  {language.swedish}
                </a>
                <a class="dropdown-item" onClick={changeEs} href="#">
                  {language.spanish}
                </a>
              </div>
            </div>
            <h1>SDA</h1>
            <p>{language.starter}</p>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-12  strong-shadow">
                <LoginForm onSubmit={login} />
              </div>

              <div className="col-12 mt-4">
                <RegisterForm onSubmit={register} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
