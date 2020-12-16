//Component and react imports
import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import UserApi from '../../../api/UserApi';
import { useContext } from 'react';
import { LangContext } from '../../../js/states/LanguageContext';

//Styling import
import '../../../css/forum/forum.css';

//Default user image for the forum
const defaultImage = '/images/defaultUserImage/blank-profile-pic.png';

/**
 * This component lists the comments and allows the logged-in user to delete or edit * own comment.
 */
function Comment({ comment, onCommentDelete, onCommentUpdate, getAllCommentsByPostId }) {
  //props come from CommentsList

  const { language } = useContext(LangContext);
  const [isUpdate, setIsUpdate] = useState(false); // Opens/closes the Comment update form
  const [user, setUser] = useState([]);

  const getUser = () => {
    UserApi.getLoggedInUser().then(res => {
      setUser(res.data);
    });
  };

  /**
   * When component is rendered, do an API call to get the logged-in user information
   */
  useEffect(() => {
    getUser();
  }, []);

  //To be used in checking if the comment belongs to the loggedin user. If true makes buttons visible
  const isMyComment = comment.user.id === user.id;

  //When user clicks edit button, variable isUpdate is set to true and edit form opens
  const onUpdateComment = () => {
    setIsUpdate(true);
  };

  //When user clicks save, variable isUpdate is set to false and edit form closes
  const onSaveUpdatedComment = () => {
    setIsUpdate(false);
  };

  //When user clicks cancel, variable isUpdate is set to false and edit form closes
  const onCommentFormCancel = () => {
    setIsUpdate(false);
  };

  return (
    <>
      {/* If variable isUpdate is true comment creating form opens */}
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
        <div className="comment-card forum">
          <span className="card-info">
            <div className= "forum-avatar-comment">
              {/* If user didn't upload a picture, system default picture is used as the user avatar. */}
              {comment.user.profilepic === null ? (
                <img
                  className="forum-avatar comment-avatar"
                  src={defaultImage}
                  alt={language.User_Profile}
                />
              ) : (
                <img
                  className="forum-avatar comment-avatar"
                  src={comment.user.profilepic}
                  alt={language.User_Profile}
                />
              )}
            </div>

            <p className="user-name-comment">{comment.user.name}</p>
          </span>

          <div className="comment-body">{comment.body}</div>
          <div className="forum-buttons">
            {/* Variable isMyComment checks if the comment belongs to the logged in user. If the user and the logged-in user are the same delete and edit buttons are visible */}
            {isMyComment && (
              <span className="edit-delete comment-icon">
                <i
                  class="fas fa-trash post-button  fa-lg"
                  title={language.Delete}
                  onClick={() => onCommentDelete(comment)}></i>

                <i
                  class="fas fa-edit post-button  fa-lg"
                  title={language.Edit}
                  onClick={onUpdateComment}></i>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
