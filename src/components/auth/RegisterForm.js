import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const { language } = useContext(LangContext);

  useEffect(() => {
    console.log(isTeacher);
  }, [isTeacher]);

  return (
    <div className="card-body">
      <h4 className="card-title">Sign up</h4> {/* //Erkan */}
      <div>
        <div className="form-group">
          <label>{language.name}:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={language.name}
          />
        </div>

        <div className="form-group">
          <label>{language.email}:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            placeholder={language.email}
          />
        </div>

        <div className="form-group">
          <label>{language.pass}:</label>
          <input
            type="password"
            placeholder={language.pass}
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Register as a teacher</label>
          <Checkbox
            checked={isTeacher}
            onChange={e => setIsTeacher(!isTeacher)}
            name="checkedB"
            color="var(--primary)"
          />
          <button
            className="btn login-button"
            onClick={e => onSubmit({ name, email, password, isTeacher })}>
            {language.create}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
