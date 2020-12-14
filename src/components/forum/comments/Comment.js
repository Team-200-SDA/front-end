import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import UserApi from "../../../api/UserApi";
import { useContext } from "react";
import { LangContext } from "../../../contexts/LanguageContext";

//styling import
import "../../../css/forum/forum.css";

function Comment({
  comment,
  onCommentDelete,
  onCommentUpdate,
  getAllCommentsByPostId,
}) {
  //props come from CommentsList

  const { language } = useContext(LangContext);
  const [isUpdate, setIsUpdate] = useState(false); //opens the Comment update form
  const [user, setUser] = useState([]);

  const getUser = () => {
    UserApi.getLoggedInUser().then(res => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const isMyComment = comment.user.id === user.id; //checks if comment belongs to the loggedin user if true makes buttons visible

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
          getAllCommentsByPostId={getAllCommentsByPostId}
        />
        ) : (
        <div className="card mt-4">
         <div className="card-body forum">
         <span className="card-info">
              <img className="forum-avatar" src={comment.user.profilepic} />
              <p className="user-name">{comment.user.name}</p>
            </span>
            <div className="comment-body">{comment.body}</div>
          
            <div className="forum-buttons">
              {isMyComment && (
                <span className="edit-delete">
                  <i
                    class="fas fa-trash fa-lg"
                    title="delete"
                    onClick={() => onCommentDelete(comment)}
                  >
                 
                  </i>

                  <i
                    class="fas fa-edit fa-lg"
                    title="edit"
                    onClick={onUpdateComment}
                  >
                
                    </i>
                 
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
