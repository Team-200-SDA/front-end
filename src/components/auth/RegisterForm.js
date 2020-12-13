import { Checkbox, FormLabel } from '@material-ui/core';
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
    <div className=" register-form">
      <h4 className="card-title">Register</h4> {/* //Erkan */}
      <div>
        <div className="form-group">
          <FormLabel className="form-label" component="legend">
            {language.name}
          </FormLabel>
          <input
            type="text"
            className="form-control subject-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={language.name}
          />
        </div>

        <div className="form-group">
          <FormLabel className="form-label" component="legend">
            {language.email}
          </FormLabel>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control subject-input"
            placeholder={language.email}
          />
        </div>
        <div className="form-group">
          <FormLabel className="form-label" component="legend">
            {language.pass}
          </FormLabel>
          <input
            type="password"
            placeholder={language.pass}
            className="form-control subject-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <Checkbox
            checked={isTeacher}
            onChange={e => setIsTeacher(!isTeacher)}
            name="checkedB"
            color="var(--primary)"
          />
          <label className="checkbox-label">Register as a teacher</label>
        </div>
        <button
          className="btn login-button"
          onClick={e => onSubmit({ name, email, password, isTeacher })}>
          {language.create}
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
