import React, { useState, useEffect } from "react";
import CommentForm from './CommentForm';
import UserApi from '../../../api/UserApi';
import Auth from '../../../services/Auth';


function Comment({comment, onCommentDelete, onCommentUpdate }) {
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


  // const onUpdateComment = () => {
  //   setIsUpdate(true);
  // };

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
            onSubmit={onCommentFormSubmit}
            onCancel={onCommentFormCancel}
            formTitle="Update comment"
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
