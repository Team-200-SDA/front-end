import React from "react";
import Auth from "../../services/Auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';
import Button from 'react-bootstrap/Button';


function LoginPage() {
    const { language, changeEn, changeSv } = useContext(LangContext);
    const login = async (loginData) => {
        const invalidCredential = language.invalid;
        const loginSuccess = await Auth.login(loginData);
        
        if (!loginSuccess) {
            
            alert(invalidCredential);
        }
    }

    const register = async (registrationData) => {
        const registerSuccess = await Auth.register(registrationData);
        if (!registerSuccess) {
            alert("Couldn't register check credentials and try again");
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-6 " style={{ color: "white" }}>
                        <Button onClick={changeEn} variant="primary">English</Button>{' '}
                        <Button onClick={changeSv} variant="primary">Swedish</Button>{' '}   
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