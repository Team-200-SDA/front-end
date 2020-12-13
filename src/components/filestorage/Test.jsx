import React from "react";

export default function Test() {

  
    // client id of the project

    var clientId = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;

    // redirect_uri of the project

    var redirect_uri = "https://localhost";

    // scope of the project

    var scope = "https://www.googleapis.com/auth/drive";

    // the url to which the user is redirected to

    var url = "";

    // this is event click listener for the button

    function upload () {
      // this is the method which will be invoked it takes four parameters

      signIn(clientId, redirect_uri, scope, url);
    };

    function signIn(clientId, redirect_uri, scope, url) {
      // the actual url to which the user is redirected to

      url =
        "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" +
        redirect_uri +
        "&prompt=consent&response_type=code&client_id=" +
        clientId +
        "&scope=" +
        scope +
        "&access_type=offline";

      // this line makes the user redirected to the url

      window.location = url;
    }
  
  return (
    <div>
      
      <button id="login" onClick={() => upload()}>Upload Files to Drive</button>
    </div>
  );
}
