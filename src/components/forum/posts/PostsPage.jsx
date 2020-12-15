//Component and react imports
import React, { useEffect, useState } from 'react';
import PostsApi from '../../../api/PostsApi';
import PostForm from './PostForm';
import PostsList from './PostsList';
import { useContext } from 'react';
import { LangContext } from '../../../js/states/LanguageContext';
import { Button } from '@material-ui/core';

function PostsPage() {
  const { language } = useContext(LangContext);
  const [posts, setPosts] = useState([]);
  const [createForm, setCreateForm] = useState(false);

  const getAll = () => {
    PostsApi.getAllPosts().then(res => {
      setPosts(res.data.sort((a, b) => b.id - a.id));
    });
  };
  useEffect(() => {
    getAll();
  }, []);

  const createPost = postData => {
    return PostsApi.createPost(postData).then(res => {
      setPosts([res.data, ...posts]);
      setCreateForm(false);
    });
  };

  const updatedPost = updatedPost => {
    return PostsApi.updatePost(updatedPost).then(res => getAll());
  };

  const deletePost = post => {
    return PostsApi.deletePost(post.id).then(() =>
      setPosts(posts.filter(a => a.id !== post.id))
    );
  };

  const onCreateNewPost = () => {
    setCreateForm(true);
  };

  const onCancelCreateForm = () => {
    setCreateForm(false);
  };

  return (
    <>
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-pencil-alt title-icon" />
          {language.Forum}
        </h1>
      </div>

      {createForm ? (
        <PostForm onSubmit={createPost} onCancel={onCancelCreateForm} />
      ) : (
        <>
          <div className="card-body forum-card">
            <Button variant="contained" color="primary" onClick={onCreateNewPost}>
              {language.Create_new_Post}
            </Button>
          </div>
          <PostsList posts={posts} onPostUpdate={updatedPost} onPostDelete={deletePost} />
        </>
      )}
    </>
  );
}

export default PostsPage;
