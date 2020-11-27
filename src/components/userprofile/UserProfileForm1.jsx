import { ContactsOutlined } from "@material-ui/icons";
import { render } from "@testing-library/react";
import React, { useState } from "react";
import defaultImage from "../../assets/images/blank-profile-picture-973460_1280.png";
import ImageUploader from "./ImageUploader";
import "./UserProfile.css";

function UserProfileForm({
  user,
  onUpdateClick,
  onUpdatePhoneClick,
  onUpdatePicClick,
}) {
  const [address, setAddress] = useState({ address: "" });
  const [phoneno, setPhoneno] = useState({ phoneno: "" });
  const [image, setImage] = useState({ image: "" });

  function clickUpdateAddress(e) {
    e.preventDefault();
    onUpdateClick(address.address);
    setAddress({ address: "" });
  }
  function clickUpdatePhone(e) {
    e.preventDefault();
    onUpdatePhoneClick(phoneno.phoneno);
    setPhoneno({ phoneno: "" });
  }

  function clickUpdatepic(e) {
    e.preventDefault();
    console.log("image", image);
    onUpdatePicClick(image);
    setImage({ image: "" });
  }

  console.log("user profile pic", user.profilepic);
  console.log("user address", user.address);

  return (
    /*  <div className="form-group row">
      <label>Email address</label>

      <input
        readonly
        className="form-control-plaintext"
        type="email"
        placeholder="name@example.com"
      ></input>
    </div> */
    <div className="card user-profile">
      <div className="card-title bg-secondary text-white m-0 p-1">
        User Profile
      </div>

      <div className="card-body">
        <div className="form-group row">
          <label for="staticUsername" class="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              value={user.name}
            />
          </div>
        </div>

        <div className="form-group row">
          <label for="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              value={user.email}
            />
          </div>
        </div>

        <div className="card address">
          <div className="card-body">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Address</span>
                </div>
                <textarea
                  class="form-control"
                  value={user.address}
                  onChange={(event) =>
                    setAddress({ address: event.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              className="btn btn-primary  "
              onClick={(e) => clickUpdateAddress(e)}
            >
              Update Address
            </button>
          </div>

          <div className="form-group">
            <div className="input-group p-2">
              <div className="input-group-prepend">
                <span className="input-group-text">Phoneno</span>
              </div>
              <input
                className="form-control"
                value={user.phoneno}
                onChange={(event) =>
                  setPhoneno({ phoneno: event.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="text-right">
            <button
              className="btn btn-primary "
              onClick={(e) => clickUpdatePhone(e)}
            >
              Update Phoneno
            </button>
          </div>
        </div>

        <div className="card profile m-2">
          <div className="form-group row">
            <div className="col">
              <label>Profile Picture</label>
              {user.profilepic === null ? (
                <img src={defaultImage} alt="User profile" width="70%" />
              ) : (
                <img src={user.profilepic} alt="User profile" width="70%" />
              )}
            </div>
            <div className="col">
              <ImageUploader
                user={user}
                setUploading={true}
                setImgUrl={setImage}
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="btn btn-primary  "
              onClick={(e) => clickUpdatepic(e)}
            >
              Update Profile picture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfileForm;
