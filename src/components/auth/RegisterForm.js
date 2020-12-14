import { FormLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const { language } = useContext(LangContext);

  return (
    <div className=" register-form">
      <h4 className="card-title">Register</h4>
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
          <FormLabel className="form-label" component="legend">
            {'Teacher Code (Optional)'}
          </FormLabel>
          <input
            type="password"
            placeholder={'Teacher Code'}
            className="form-control subject-input"
            value={teacherCode}
            onChange={e => setTeacherCode(e.target.value)}
          />
        </div>

        <button
          className="btn login-button"
          onClick={e => onSubmit({ name, email, password, teacherCode })}>
          {language.create}
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
