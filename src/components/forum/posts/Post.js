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

function Post({
  post,
  onPostUpdate,
  onPostDelete, //Props come from PostsList
}) {
  const { language } = useContext(LangContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [activePost, setActivePost] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likedUsers.length);

  const getUser = () => {
    UserApi.getLoggedInUser().then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const isMyPost = post.user.id === user.id;

  const onUpdateClick = () => {
    setIsUpdate(true);
  };

  const onPostFormSubmit = (postData) => {
    const updatedPost = { ...post, ...postData };
    return onPostUpdate(updatedPost).then(() => setIsUpdate(false));
  };

  const onPostLike = async () => {
    const updatedPost = {
      ...post,
      likedUsers: [...post.likedUsers, user.name],
    };
    return await onPostUpdate(updatedPost); //a time lag happens between BE and FE so setStatus added to onClick
  };

  const actionLike = () => {
    setLikeCount(likeCount + 1);
    onPostLike();
  };
  const userLiked = post.likedUsers.includes(user.name);

  const onPostDislike = async () => {
    var newLikeList = post.likedUsers.filter((item) => item !== user.name);
    console.log(newLikeList);
    const updatedPost = {
      ...post,
      likedUsers: newLikeList,
    };
    return await onPostUpdate(updatedPost); //a time lag happens between backend so setStatus added to onClick
  };

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
        <div className="card">
          <div className="card-body forum">
            <span className="card-info">
              <img className="forum-avatar" src={post.user.profilepic} />
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
              <h3 className="like-count"> {likeCount} </h3>

              <i
                className="far fa-thumbs-down mt-4 fa-2x fa-flip-horizontal"
                onClick={() => {
                  setLikeCount(likeCount - 1);
                  onPostDislike();
                }}
              ></i>
            </div>

            <div className="show-comment">
              <Link to="#">
                <u onClick={() => setActivePost(!activePost)}>
                  {activePost ? (
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

            {activePost ? <CommentPageDetails post={post} /> : null}

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
