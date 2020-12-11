import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import { Link } from 'react-router-dom';
import CommentForm from '../comments/CommentForm';
import UserApi from '../../../api/UserApi';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LanguageContext';

function Post({
  post,
  onPostUpdate,
  onPostDelete //Props come from PostsList
}) {
  const { language } = useContext(LangContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [user, setUser] = useState([]);

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

  useEffect(() => {
    console.log(post);
  }, []);

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
          <div className="card-body">
            <div className="card-title">
              <Link to={`/post/${post.id}/comments`}>
                <h3>{post.title}</h3>
              </Link>

              <p className="badge badge-primary text-wrap">{post.user.name}</p>
            </div>
            <div>{post.body}</div>

            <div className="mt-3">
              {isMyPost && (
                <>
                  <button className="btn btn-warning" onClick={onUpdateClick}>
                    {language.Update}
                  </button>

                  <button
                    className="btn btn-danger ml-3"
                    onClick={() => onPostDelete(post)}>
                    {language.Delete}
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn btn-info ml-3"
                data-toggle="modal"
                data-target="#myModal"
                onClick={onCreateCommentClick}>
                {language.Add_Comment}
              </button>
            </div>
            {isFormOpen && (
              <CommentForm
                onCancel={onCreateCommentCancel}
                onSubmit={onCreateCommentClick}
                setIsFormOpen={setIsFormOpen}
                post={post}
              />
            )}
            {}
          </div>
        </div>
      )}
    </div>
  );
}
export default Post;
