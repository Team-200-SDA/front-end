import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import { Link } from 'react-router-dom';
import CommentForm from '../comments/CommentForm';
import UserApi from '../../../api/UserApi';
import CommentPageDetails from '../comments/CommentPageDetails';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LanguageContext';

//styling import
import { Button } from '@material-ui/core';
import './style.css';
import '../../../css/shared.css';
import '../../../css/subjects/_subjects.css'

function Post({
  post,
  onPostUpdate,
  onPostDelete //Props come from PostsList
}) {
  const { language } = useContext(LangContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [activePost, setActivePost] = useState(false);

  const getUser = () => {
    UserApi.getLoggedInUser().then(res => {
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

  const onPostFormSubmit = postData => {
    const updatedPost = { ...post, ...postData };
    return onPostUpdate(updatedPost).then(() => setIsUpdate(false));
  };

  const onPostFormCancel = () => {
    setIsUpdate(false);
  };

  const onCreateCommentClick = data => {
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
          <div className="card-body">
            <div className="card-title">
              
                <h3>{post.title}</h3>
             

              <p className="badge badge-primary text-wrap">{post.user.name}</p>
            </div>
            <div>{post.body}</div>

            <div className="mt-3">
              {isMyPost && (
                <>
                  <Button className="upload-button"
                  variant="contained"
                   color="primary" onClick={onUpdateClick}>
                    {language.Update}
                    <i class="fas fa-edit"></i>
                  </Button>

                  <Button
                    className="button" 
                    color="primary"
                    variant="contained"
                    onClick={() => onPostDelete(post)}>
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
                onClick={onCreateCommentClick}>
                {language.Add_Comment}
              </Button>
            </div>
            <Link to="#" >
              <u className = "showComment"  onClick={() => setActivePost(!activePost)}>show comments</u>
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
