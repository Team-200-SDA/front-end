import React from "react";
import "./FileStorage.css";


export default function FileStorage({ file, onFileDelete }) {
  return (
    <div className="card card-filestorage">
      <div className="card-body">
        <span>
          <a href={file.link} className="file-link" target="_blank">
            {file.fileName}
          </a>
        </span>
        <button
          className="btn btn-danger"
          onClick={() => onFileDelete(file.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
