import React, { useEffect, useState } from "react";
import UserProfileForm from "./UserProfileForm";
import UserApi from "../../api/UserApi";
import { useContext } from "react";
import { LangContext } from "../../contexts/LanguageContext";

/**
 * This component calls Api to get logged in user details and updates address, phone no and profile picture
 */
function UserProfile() {
  const { language } = useContext(LangContext);
  const [user, setUser] = useState([]);

  /**
   * Calls Api function to get logged in user and sets as current user
   */
  const getUser = () => {
    UserApi.getLoggedInUser().then((res) => {
      setUser(res.data);
    });
  };

  /**
   * When loading user profile page, calls Api function to get logged in user and sets as current user
   */
  useEffect(() => {
    getUser();
  }, []);

  /**
   *
   * @param {String} address
   * Calls Api to update address of the current user and 
   * if update successful alerts the user that address is updated
   */
  function updatedAddress(address) {
    UserApi.updateAddress(address)
      .then((res) => {
        alert(language.Address_Updated);
      })
      .catch((err) => console.log(err));
  }

  /**
   *
   * @param {String} phoneno
   * Calls Api to update phoneno of the current user and 
   * if update successful alerts the user that phoneno is updated
   */
  function updatedPhoneno(phoneno) {
    UserApi.updatePhoneno(phoneno)
      .then((res) => {
        alert(language.Phoneno_Updated);
      })
      .catch((err) => console.log(err));
  }

  /**
   * 
   * @param {String} image 
   * Calls Api to update profile picture url of the current user and 
   * if update successful alerts the user that profile picture is updated
   */
  function updatedPic(image) {
    UserApi.updateProfilepic(image)
      .then((res) => {
        alert(language.Profile_picture_Updated);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <UserProfileForm
        user={user}
        onUpdateAddressClick={updatedAddress}
        onUpdatePhoneClick={updatedPhoneno}
        onUpdatePicClick={updatedPic}
      />
    </div>
  );
}
export default UserProfile;
