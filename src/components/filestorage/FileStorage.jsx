import React from "react";
import "./FileStorage.css";
import { Link } from "react-router-dom";

export default function FileStorage({ file, onFileDelete }) {
  return (
    <div className="card card-filestorage">
      <div className="card-body">
        <span>
          <Link to={file.link} className="file-link" target="_blank">
            {file.fileName}
          </Link>
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
