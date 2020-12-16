/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';
import { FormLabel } from '@material-ui/core';
const defaultImage = '/images/defaultUserImage/blank-profile-pic.png';

/**
 * This component displays the current user details, and allows user to update address, phone no and profile picture
 */
function UserProfileForm({
  user,
  onUpdateAddressClick,
  onUpdatePhoneClick,
  onUpdatePicClick
}) {
  const { language } = useContext(LangContext);
  const [address, setAddress] = useState({ address: '' });
  const [phoneno, setPhoneno] = useState({ phoneno: '' });
  const [image, setImage] = useState({ image: '' });

  /**
   *
   * @param {event} e
   * @returns {void}
   * preventDefault takes current event as parameter and prevents the page from refreshing
   * when a button is clicked or Enter is pressed.
   * When user updates address, this function invokes call back function(onUpdateAddressClick) and
   * passes updated address as parameter
   */
  function clickUpdateAddress(e) {
    e.preventDefault();
    onUpdateAddressClick(address.address);
    setAddress({ address: '' });
  }

  /**
   *
   * @param {event} e
   * @returns {void}
   * preventDefault takes current event as parameter and prevents the page from refreshing
   * when a button is clicked or Enter is pressed.
   * When user updates Phoneno, this function invokes call back function(onUpdatePhoneClick) and
   * passes updated phoneno as parameter
   */
  function clickUpdatePhone(e) {
    e.preventDefault();
    onUpdatePhoneClick(phoneno.phoneno);
    setPhoneno({ phoneno: '' });
  }

  /**
   * Whenever user updates Profile picture, this function invokes call back function(onUpdatePicClick) and
   * passes updated profile image url as parameter
   */
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
            {/* ImageUploader component allows the user to choose the image to set as profile picture and 
            uploads chosen image to Cloudinary and returns the url */}
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
                    {language.Update_home_address}
                  </FormLabel>
                  <div className="input-group-prepend">
                    <span className="input-group-text">{language.Address}</span>
                  </div>

                  <input
                    className="form-control"
                    defaultValue={user.address}
                    onChange={event => setAddress({ address: event.target.value })}
                    placeholder={language.Enter_Address}
                  />
                </div>
                <div className="text-right mt-4 mb-0">
                  <button
                    className="btn btn-light profile-update-button"
                    onClick={e => clickUpdateAddress(e)}>
                    <i className="fas fa-save update-icon"></i>
                  </button>
                </div>
              </div>

              {/* Update Phone */}
              <div className="form-group row mt-1 mr-2">
                <div className="col input-group profile-input">
                  <FormLabel className="form-label" component="legend">
                    {language.Update_phone_number}
                  </FormLabel>
                  <div className="input-group-prepend">
                    <span className="input-group-text">{language.Phone_No}</span>
                  </div>
                  <input
                    className="form-control"
                    defaultValue={user.phoneno}
                    onChange={event => setPhoneno({ phoneno: event.target.value })}
                    placeholder={language.Enter_Phone_Number}
                  />
                </div>
                <div className="text-right mt-4 mb-0">
                  <button
                    className="btn btn-light profile-update-button"
                    onClick={e => clickUpdatePhone(e)}>
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
