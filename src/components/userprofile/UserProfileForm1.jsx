import React, { useState } from 'react';
import defaultImage from '../../assets/images/blank-profile-picture-973460_1280.png';
import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';


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
    <div className="card user-profile">
      <div className="card-title">
        {language.User_Profile}
      </div>

      <div className="card body-user-profile">
        <div className="form-group row ml-3">
          <div>{language.name} {user.name}</div>
        </div>
        <div className="form-group row ml-3">
          <div>{language.email} {user.email}</div>
        </div>

        <div className="card address">
          <div className="form-group address-form row mt-1">
            
              <div className="input-group-prepend">
                <span className="input-group-text">Address</span>
              </div>
              <input
                className="form-control"
                defaultValue={user.address}
                onChange={(event) =>
                  setAddress({ address: event.target.value })
                }
              ></input>
            
            <div className="text-right mt-0 mb-0">
              <button
                className="btn btn-primary  "
                onClick={(e) => clickUpdateAddress(e)}
              >
                <i class="fas fa-pencil-alt"></i>
              </button>
            </div>
          </div>
          <div className="form-group row mt-1">
            <div className="col input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Phoneno</span>
              </div>
              <input
                className="form-control"
                defaultValue={user.phoneno}
                onChange={(event) =>
                  setPhoneno({ phoneno: event.target.value })
                }
              ></input>
            </div>

            <div className="text-right mt-0 mb-0">
              <button
                className="btn btn-primary "
                onClick={(e) => clickUpdatePhone(e)}
              >
                <i class="fas fa-pencil-alt"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card profile m-2">
          <label className="ml-3">{language.Profile_Picture}</label>
          <div className="form-group row">
            <div className="col ml-3">
              {user.profilepic === null ? (
                <img src={defaultImage} alt="User profile" width="50%" />
              ) : (
                <img src={user.profilepic} alt="User profile" width="50%" />
              )}
            </div>
            <div className="col">
              <ImageUploader setImgUrl={setImage} uploadPreset={"profile"} />
            </div>
          </div>
          <div className="text-right">
            <button
              className="btn btn-primary  "
              onClick={(e) => clickUpdateProfilepic(e)}
            >
              {language.Update_Profile_picture}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfileForm;
