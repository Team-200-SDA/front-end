import React, { useState } from 'react';
import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

import { Card } from '@material-ui/core';
const defaultImage = '/images/defaultUserImage/blank-profile-pic.png';
function UserProfileForm({ user, onUpdateClick, onUpdatePhoneClick, onUpdatePicClick }) {
  const { language } = useContext(LangContext);
  const [address, setAddress] = useState({ address: '' });
  const [phoneno, setPhoneno] = useState({ phoneno: '' });
  const [image, setImage] = useState({ image: '' });

  function clickUpdateAddress(e) {
    e.preventDefault();
    onUpdateClick(address.address);
    setAddress({ address: '' });
  }
  function clickUpdatePhone(e) {
    e.preventDefault();
    onUpdatePhoneClick(phoneno.phoneno);
    setPhoneno({ phoneno: '' });
  }

  function clickUpdateProfilepic(e) {
    e.preventDefault();
    onUpdatePicClick(image);
    setImage({ image: '' });
  }

  return (
    <>
      <div className="user-profile-title-div">
        <h1 className="user-profile-title">
          <i className="far fa-address-card title-icon"></i>
          {language.User_Profile}
        </h1>
      </div>

      <div className="card user-profile">
        <div className="card-body">
          <div className="grid-Userdetails">
            <article className="lblname">Name : {user.name}</article>
            <article className="lblemail">E-mail : {user.email}</article>
          </div>

          <div className="form-group row mt-1 mr-2">
            <div className="col input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">{language.Address}</span>
              </div>
              <input
                className="form-control"
                defaultValue={user.address}
                onChange={event => setAddress({ address: event.target.value })}></input>
            </div>
            <div className="text-right mt-0 mb-0">
              <button className="btn btn-light" onClick={e => clickUpdateAddress(e)}>
                <i className="fas fa-pencil-alt update-icon"></i>
              </button>
            </div>
          </div>
          <div className="form-group row mt-1 mr-2">
            <div className="col input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Phoneno</span>
              </div>
              <input
                className="form-control"
                defaultValue={user.phoneno}
                onChange={event => setPhoneno({ phoneno: event.target.value })}></input>
            </div>

            <div className="text-right mt-0 mb-0">
              <button className="btn btn-light" onClick={e => clickUpdatePhone(e)}>
                <i className="fas fa-pencil-alt update-icon"></i>
              </button>
            </div>
          </div>

          <Card className="profile-pic-card">
            <label className="ml-3 mt-3">Profile Picture</label>

            <div className="grid-profile">
              <article>
                {user.profilepic === null ? (
                  <img src={defaultImage} alt="User profile" width="30%" />
                ) : (
                  <img src={user.profilepic} alt="User profile" width="30%" />
                )}
              </article>
              <article className="prof-img">
                <ImageUploader setImgUrl={setImage} uploadPreset={'profile'} />
              </article>
            </div>

            <div className="text-right">
              <button className="button-update " onClick={e => clickUpdateProfilepic(e)}>
                Update profile picture
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
export default UserProfileForm;
