import { ContactsOutlined } from "@material-ui/icons";
import React, { useState } from "react";
//import defaultImage from "../../assets/blank-profile-picture-973460_1280.png";

function UserProfileForm({ user, onUpdateClick, onUpdatePicClick }) {
  const [address, setAddress] = useState({ address: "" });
  const [image, setImage] = useState({ image: "" });

  function clickHandler(e) {
    e.preventDefault();
    onUpdateClick(address.address);
    setAddress({ address: "" });
  }

  function clickUpdatepic(e) {
    e.preventDefault();
    console.log("image" ,image.image);
    onUpdatePicClick(image.image);
    setImage({ image: "" });
  }

  console.log("user profile pic",user.profilepic);
/* 
    if((user.image)!==""){
        
        profilePic={user.image};
        console.log("profile pic from server",profilePic);
    }else{
         profilePic={defaultImage};
         console.log("profile pic default", profilePic);
    } */
  
 /*  function updateImage(e) {
    console.log("print event target");
    console.log("event.target.file", e.target.files[0].name);
  } */

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
    <div className="card">
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
          <label for="staticEmail" class="col-sm-2 col-form-label">
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

        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">User Address</span>
                </div>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  value={address.text}
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
              onClick={(e) => clickHandler(e)}
            >
              Update
            </button>
          </div>
        </div>

        <div>
          
          <img src={user.profilepic} alt="User profile picture" width="20%" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlFile1">Profile Image</label>
          <input
            type="file"
            class="form-control"
            id="exampleFormControlFile1"
            onChange={(event) => setImage({ image: event.target.files[0].name})}
          />
          <button
            className="btn btn-primary  "
            onClick={(e) => clickUpdatepic(e)}
          >
            Update Profile picture
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserProfileForm;
