import React, { useState } from "react";


export default function FileStorageForm({ onUploadFile }) {
  const [filename, setFilename] = useState("");
  const [link, setLink] = useState("");

  function uploadFileHandler(e) {
    if (link === "") {
      return;
    }
    e.preventDefault();

    const fileData = { fileName: filename, link: link };
    
    onUploadFile(fileData)
      .then(() => {
        setFilename("");
        setLink("");
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">File Storage</h4>

        <div className="container col-sm-12 col-md-10 col-lg-8">
          <div className="form-group">
            <input
              className="form-control mb-3"
              placeholder="File name"
              value={filename}
              onChange={(event) => setFilename(event.target.value)}
            />
            <input
              className="form-control"
              placeholder={`Link to the file`}
              value={link}
              onChange={(event) => setLink(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary  "
              onClick={(e) => uploadFileHandler(e)}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
