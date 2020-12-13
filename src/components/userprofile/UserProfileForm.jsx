import React, { useEffect, useState } from 'react';
import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

import { Card, FormLabel } from '@material-ui/core';
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

  useEffect(() => {
    if (image.image === '') {
      return;
    }
    onUpdatePicClick(image);
  }, [image]);

  return (
    <>
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="far fa-address-card title-icon"></i>
          {language.User_Profile}
        </h1>
      </div>

      <div className="user-profile card-body">
        <div className="profile-page-wrap">
          {/* Profile Pic Stuff */}
          <div className="profile-pic-card">
            {user.profilepic === null ? (
              <img className="profile-avatar" src={defaultImage} alt="User profile" />
            ) : (
              <img className="profile-avatar" src={user.profilepic} alt="User profile" />
            )}
            <ImageUploader setImgUrl={setImage} uploadPreset={'profile'} />
          </div>

          {/* User Name and Email */}
          <div className="profile-details">
            <div className="fixed-details">
              <div className="profile-labels">
                <i className="fas fa-user-alt profile-icons" />
                {user.name}
              </div>
              <div className="profile-labels">
                <i className="fas fa-envelope profile-icons" />
                {user.email}
              </div>
            </div>

            <div className="profile-fields">
              {/* Update Address */}
              <div className="form-group row mt-1 mr-2">
                <div className="col input-group profile-input">
                  <FormLabel className="form-label" component="legend">
                    Update home address
                  </FormLabel>
                  <div className="input-group-prepend">
                    <span className="input-group-text">{language.Address}</span>
                  </div>

                  <input
                    className="form-control"
                    defaultValue={user.address}
                    onChange={event => setAddress({ address: event.target.value })}
                    placeholder="Enter an Address"
                  />
                </div>
                <div className="text-right mt-4 mb-0">
                  <button className="btn btn-light" onClick={e => clickUpdateAddress(e)}>
                    <i className="fas fa-save update-icon"></i>
                  </button>
                </div>
              </div>

              {/* Update Phone */}
              <div className="form-group row mt-1 mr-2">
                <div className="col input-group profile-input">
                  <FormLabel className="form-label" component="legend">
                    Update phone number
                  </FormLabel>
                  <div className="input-group-prepend">
                    <span className="input-group-text">Phone No.</span>
                  </div>
                  <input
                    className="form-control"
                    defaultValue={user.phoneno}
                    onChange={event => setPhoneno({ phoneno: event.target.value })}
                    placeholder="Enter a Phone Number"
                  />
                </div>
                <div className="text-right mt-4 mb-0">
                  <button className="btn btn-light" onClick={e => clickUpdatePhone(e)}>
                    <i className="fas fa-save update-icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Updatable Fields */}
      </div>
    </>
  );
}
export default UserProfileForm;
