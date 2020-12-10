import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import UserApi from "../../../api/UserApi";


function Comment({
  comment,
  onCommentDelete,
  onCommentUpdate
}) {     //props come from CommentsList


  const [isUpdate, setIsUpdate] = useState(false); //opens the Comment update form

  const [user, setUser] = useState([]);

  const getUser = () => {
    UserApi.getLoggedInUser().then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const isMyComment = comment.user.id === user.id;  //checks if comment belongs to the loggedin user if true makes buttons visible

  const onUpdateComment = () => {
    setIsUpdate(true);
  };

  const onSaveUpdatedComment = () => {
    setIsUpdate(false);
  };

  const onCommentFormCancel = () => {
    setIsUpdate(false);
  };

  return (
    <div>
      {isUpdate ? (
        <CommentForm
          formTitle="Update comment"
          initialBody={comment.body}
        
          onCancel={onCommentFormCancel}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          comment={comment}
          onSaveUpdatedComment={onSaveUpdatedComment}
          onCommentUpdate={onCommentUpdate}
        />
      ) : (
        <div className="card mt-4">
          <div className="card-body">
            <div>{comment.body}</div>
            <p className="badge badge-primary text-wrap">{comment.user.name}</p>

            <div className="mt-3">
              {isMyComment && (
                <>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => onCommentDelete(comment)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-warning mt-3 ml-3"
                    onClick={onUpdateComment}
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
