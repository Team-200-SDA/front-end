import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import { Link } from "react-router-dom";
import CommentForm from "../comments/CommentForm";
import UserApi from "../../../api/UserApi";
import CommentPageDetails from "../comments/CommentPageDetails";
import { useContext } from "react";
import { LangContext } from "../../../js/states/LanguageContext";

//styling import
import { Button, Tooltip, Collapse } from "@material-ui/core";
import "./style.css";
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
          formTitle={language.Update_post}
        />
      ) : (
        <div className="card">
          <div className="card-body forum">
            <span className="card-info">
              <img className="forum-avatar" src={user.profilepic} />
              <p className="user-name">{post.user.name}</p>
            </span>
            <div className="post-title">
              {" "}
              <h3>{post.title}</h3>
            </div>
            <div className="post-body">{post.body}</div>

            <div className="forum-buttons">
              {isMyPost && (
                <>
                  <Button
                    className="upload-button"
                    variant="contained"
                    color="primary"
                    onClick={onUpdateClick}
                  >
                    {language.Edit}
                    <i class="fas fa-edit"></i>
                  </Button>

                  <Button
                    className="button"
                    color="primary"
                    variant="contained"
                    onClick={() => onPostDelete(post)}
                  >
                    {language.Delete}
                  </Button>
                </>
              )}
              <Button
                type="button"
                color="primary"
                variant="contained"
                data-toggle="modal"
                data-target="#myModal"
                onClick={onCreateCommentClick}
              >
                {language.Add_Comment}
              </Button>
            </div>

            <div className="like-dislike">
              <Tooltip
                title={<h5>{post.likedUsers.join(",  ")}</h5>}
                TransitionComponent={Collapse}
                enterDelay={800}
                leaveDelay={200}
                arrow
              >
                <i
                  className="far fa-thumbs-up mt-4 fa-2x"
                  onClick={() => (userLiked ? null : actionLike())}
                >
                  <p> {likeCount} </p>
                </i>
              </Tooltip>

              <i
                className="far fa-thumbs-down fa-2x fa-flip-horizontal"
                onClick={() => {
                  setLikeCount(likeCount - 1);
                  onPostDislike();
                }}
              ></i>
            </div>

            <Link to="#">
              <u
                className="showComment"
                onClick={() => setActivePost(!activePost)}
              >
                {language.show_comments}
              </u>
            </Link>

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
