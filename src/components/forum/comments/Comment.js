import React, { useState, useEffect } from "react";
import CommentForm from './CommentForm';
import UserApi from '../../../api/UserApi';
import CommentsApi from '../../../api/CommentsApi'

function Comment({comment, onCommentDelete, onCommentUpdate, getAll }) {
  
  const [isUpdate, setIsUpdate] = useState(false);


  const [user, setUser] = useState([]);

  const getUser = () => {
    UserApi.getLoggedInUser().then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const isMyPost = comment.user.id === user.id


  const onUpdateComment = () => {
    setIsUpdate(true);
  };

  const onSaveUpdatedComment = () => {
    setIsUpdate(false);
  };

  const onCommentFormSubmit = (commentData) => {
    const updatedComment = { ...comment, ...commentData };
    return onCommentUpdate(updatedComment)
        .then(() => setIsUpdate(false));
  };



  const onCommentFormCancel = () => {
    setIsUpdate(false);
  };

  return(
  <div>
    { isUpdate ? (
        <CommentForm
            initialBody={comment.body}
            // onSubmit={onCommentFormSubmit}
            onCommentFormSubmit = {onCommentFormSubmit}
            onCancel={onCommentFormCancel}
            formTitle="Update comment"
            // value={body}
            // onChange={(e) => setBody(e.target.value)}
            isUpdate = {isUpdate}
            setIsUpdate = {setIsUpdate}
            comment = {comment}
            onSaveUpdatedComment = {onSaveUpdatedComment}
            onCommentUpdate = {onCommentUpdate}
            getAll = {getAll}
        />
    ) : (
      <div className="card mt-4">
        <div className="card-body">
          <div>{comment.body}</div>
          <p className="badge badge-primary text-wrap">{comment.user.name}</p>


          <div className="mt-3">
          {isMyPost && (
             <>
            <button
              className="btn btn-danger mt-3"
              onClick={() => onCommentDelete(comment)}
            >
              Delete
            </button>
         
            <button className="btn btn-warning mt-3 ml-3" onClick={onUpdateComment}>
                    Update
                  </button>

            </>
            )}
          </div>
        </div>
      </div>
    )
    }
  </div>
  );
}

export default Comment;
