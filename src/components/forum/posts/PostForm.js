import React, { useState } from "react";

function PostForm({initialTitle, initialBody, onSubmit, onCancel, formTitle}) {
  const [title, setTitle] = useState(initialTitle || "");
  const [body, setBody] = useState(initialBody || "");

  const onCreatePostClick = (e) => {
    e.preventDefault();
    const postData = { title, body };
    onSubmit(postData).catch((err) => {
      alert("error occured");
    });
};

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">{formTitle || "Create a post"}</h4>
        <form onSubmit={onCreatePostClick}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Body:</label>
            <textarea
              className="form-control"
              placeholder="Post Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            
            <button
              className="btn btn-primary"
              type="submit">
              Save
            </button>
            
            <button
              className="btn btn-outline"
              type="button"
              onClick={onCancel}>
              Cancel
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
