import React from "react";
import Auth from "../../services/Auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useContext } from "react";
import { LangContext } from "../../contexts/LanguageContext";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { Card } from "@material-ui/core";

function LoginPage() {
  const { language, changeLanguage } = useContext(LangContext);
  const login = async (loginData) => {
    const loginSuccess = await Auth.login(loginData);

    if (!loginSuccess) {
      alert(language.invalid);
    }
  };

  const register = async (registrationData) => {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert(language.Couldnt_register);
    }
  };

  return (
    <div className="login-page">
      <div className="card login-header">
        <div className="row">
          <div className="col name">
            <h2>Edulane</h2>
          </div>
          <div className="col lang">
            <BootstrapSwitchButton
              checked={true}
              onlabel="EN"
              onstyle="danger"
              offlabel="SV"
              offstyle="success"
              style="w-10 mx-3"
              onChange={changeLanguage}
            />
          </div>
        </div>
      </div>
      <div className="container logincont">
        <div className="login-card">
          <div className="row loginregforms">
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
  );
}

export default LoginPage;
