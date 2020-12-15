//Component and react imports
import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import { Link } from "react-router-dom";
import CommentForm from "../comments/CommentForm";
import UserApi from "../../../api/UserApi";
import CommentPageDetails from "../comments/CommentPageDetails";
import { useContext } from "react";
import { LangContext } from "../../../contexts/LanguageContext";

//styling import
import { Button, Tooltip, Collapse } from "@material-ui/core";
import "../../../css/forum/forum.css";
import "../../../css/shared.css";
import "../../../css/subjects/_subjects.css";

const defaultImage = "/images/defaultUserImage/blank-profile-pic.png";

function Post({
  post,
  onPostUpdate,
  onPostDelete, //Props come from PostsList
}) {
  const { language } = useContext(LangContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likedUsers.length);

  const getUser = () => {
    UserApi.getLoggedInUser().then((res) => {
      setUser(res.data);
    });
  };

  console.log(post);

  useEffect(() => {
    getUser();
  }, []);

  //To be used in checking if the the post belongs to the logged-in user. If true, makes buttons visible
  const isMyPost = post.user.id === user.id;

  //When user clicks edit button, variable isUpdate is set to true and edit form opens
  const onUpdateClick = () => {
    setIsUpdate(true);
  };

  /**
   * @param {*} postData
   * Takes the current post data and adds the new updated information
   * Returns updated post
   */
  const onPostFormSubmit = (postData) => {
    const updatedPost = { ...post, ...postData };
    return onPostUpdate(updatedPost).then(() => setIsUpdate(false));
  };

  /**
   * If the logged-in user likes a post,
   * User's name is added to the liked users in the backend.
   * If user disliked the post before, user's name is removed from disliked users in the backend.
   * Post updated
   */
  const onPostLike = async () => {
    var newDisLikeList = post.disLikedUsers.filter(
      (item) => item !== user.name
    );
    const updatedPost = {
      ...post,
      likedUsers: [...post.likedUsers, user.name],
      disLikedUsers: newDisLikeList,
    };
    return await onPostUpdate(updatedPost); // setStatus is kept separate to avoid time lag between BE and FE
  };

  /**
   * If the logged-in user dislikes a post,
   * User's name is added to disliked users in the backend.
   * If user liked the post before, user's name is removed from the liked users in the backend.
   * Post updated
   */
  const onPostDislike = async () => {
    var newLikeList = post.likedUsers.filter((item) => item !== user.name);
    const updatedPost = {
      ...post,
      likedUsers: newLikeList,
      disLikedUsers: [...post.disLikedUsers, user.name],
    };
    return await onPostUpdate(updatedPost); //setStatus function is kept separate to avoid any functional lag between BE and FE
  };

  /**
   * When like button clicked increases likeCount
   * Updates post
   */
  const actionLike = () => {
    setLikeCount(likeCount + 1);
    onPostLike();
  };

  /**************
   * When like button clicked increases likeCount
   * Updates post
   */
  const actionDisLike = () => {
    setLikeCount(likeCount - 1);
    onPostDislike();
  };

  // Checks if the user already liked the post
  const userLiked = post.likedUsers.includes(user.name);

  //**********
  const userDisLiked = post.disLikedUsers.includes(user.name);

  const onPostFormCancel = () => {
    setIsUpdate(false);
  };

  const onCreateCommentClick = (data) => {
    setIsFormOpen(true);
  };

  const onCreateCommentCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      {isUpdate ? (
        <PostForm
          initialTitle={post.title}
          initialBody={post.body}
          onSubmit={onPostFormSubmit}
          onCancel={onPostFormCancel}
          formTitle="Update post"
        />
      ) : (
        <div className="card mt-4">
          <div className="card-body forum">
            <span className="card-info">
              <div>
                {/* In case user doesn't upload a picture system default picture is used as user avatar */}
                {post.user.profilepic === null ? (
                  <img
                    className="forum-avatar"
                    src={defaultImage}
                    alt="User profile"
                  />
                ) : (
                  <img
                    className="forum-avatar"
                    src={post.user.profilepic}
                    alt="User profile"
                  />
                )}
              </div>
              <p className="user-name">{post.user.name}</p>
            </span>
            <div className="post-title">
              {" "}
              <h3>{post.title}</h3>
            </div>
            <div className="post-body">{post.body}</div>

            <div className="forum-buttons">
              {isMyPost && (
                <span className="edit-delete">
                  <i
                    class="fas fa-trash fa-2x"
                    title="delete"
                    onClick={() => onPostDelete(post)}
                  >
                    {" "}
                  </i>

                  <i
                    class="fas fa-edit fa-2x"
                    title="edit"
                    onClick={() => onUpdateClick()}
                  >
                    {" "}
                  </i>
                </span>
              )}
            </div>
            <div className="addComment-button">
              <Button
                type="button"
                color="primary"
                variant="contained"
                data-toggle="modal"
                data-target="#myModal"
                onClick={onCreateCommentClick}
              >
                <i class="far fa-comments fa-2x mr-2"></i>{" "}
                {language.Add_Comment}
              </Button>
            </div>
            <div className="like-dislike">
              {/* When user hovers the like button, it gives the liked users' name list */}
              <Tooltip
                title={<h5>{post.likedUsers.join(",  ")}</h5>}
                placement="top"
                TransitionComponent={Collapse}
                enterDelay={800}
                leaveDelay={200}
                arrow
              >
                <i
                  className="far fa-thumbs-up mt-3 fa-2x"
                  onClick={() => (userLiked ? null : actionLike())}
                ></i>
              </Tooltip>
              <h3 className="like-count"> {post.upVote} </h3>

              <i
                className="far fa-thumbs-down mt-4 fa-2x fa-flip-horizontal"
                onClick={() => (userDisLiked ? null : actionDisLike())}
              ></i>
            </div>

            <div className="show-comment">
              <Link to="#">
                <u onClick={() => setShowComments(!showComments)}>
                  {showComments ? (
                    <span>
                      <i class="fas fa-angle-up"></i> close comments
                    </span>
                  ) : (
                    <span>
                      <i class="fas fa-angle-down"></i> show comments
                    </span>
                  )}
                </u>
              </Link>
            </div>

            {/* When "show comments" is clicked comments page expands */}
            {showComments ? <CommentPageDetails post={post} /> : null}

            {isFormOpen && (
              <CommentForm
                onCancel={onCreateCommentCancel}
                onSubmit={onCreateCommentClick}
                setIsFormOpen={setIsFormOpen}
                post={post}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Post;
