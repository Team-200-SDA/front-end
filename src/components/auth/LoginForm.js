import React, { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { language } = useContext(LangContext);


    return (
            <div className="card">
            <div className="card-body">
                <h4 className="card-title" >{language.login}</h4>
                <div>
                    <div className="form-group">
                        <label>{language.mail}</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder={language.email}
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>{language.pass}</label>
                        <input
                            type="password"
                            placeholder={language.pass}
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-info"
                            onClick={() => onSubmit({ email, password })}>
                            {language.login}
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    
    );
}

export default LoginForm;