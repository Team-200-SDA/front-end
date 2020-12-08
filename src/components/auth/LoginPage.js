import React from "react";
import Auth from "../../services/Auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginPage() {
  const login = async (loginData) => {
    const loginSuccess = await Auth.login(loginData);
    if (!loginSuccess) {
      alert("Invalid credentials");
    }
  };

  const register = async (registrationData) => {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert("Couldn't register check credentials and try again");
    }
  };

  return (
    <div className="login-page">
      {/* <div className="container">
          <div className="col-md-6"> */}
            <div className="row">
              <div className="col  strong-shadow">
                <LoginForm onSubmit={login} />
              </div>

              <div className="col mt-4">
                <RegisterForm onSubmit={register} />
              </div>
            </div>
          
    </div>
  );
}

export default LoginPage;
