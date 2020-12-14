import React, { useEffect, useState } from "react";
import PostsApi from "../../../api/PostsApi";
import PostForm from "./PostForm";
import PostsList from "./PostsList";
import { useContext } from 'react';
import { LangContext } from '../../../js/states/LanguageContext';


function PostsPage() {
  const { language } = useContext(LangContext);
  const [posts, setPosts] = useState([]);
  const [createForm, setCreateForm] = useState(false);

  const getAll = () => {
    PostsApi.getAllPosts().then((res) => {
      setPosts(res.data.sort((a, b) => b.id - a.id));
    });
  };
  useEffect(() => {
    getAll();
  }, []);

  const createPost = (postData) => {
    return PostsApi.createPost(postData).then((res) => {
      setPosts([res.data, ...posts]);
      setCreateForm(false);
    });
  };

  const updatedPost = (updatedPost) => {
    return PostsApi.updatePost(updatedPost).then((res) => getAll());
  };

  const deletePost = (post) => {
    return PostsApi.deletePost(post.id).then(() =>
      setPosts(posts.filter((a) => a.id !== post.id))
    );
  };

  const onCreateNewPost = () => {
    setCreateForm(true);
  };

  const onCancelCreateForm = () => {
    setCreateForm(false);
  };

  return (
    <div>
      {createForm ? (
        <PostForm onSubmit={createPost} onCancel={onCancelCreateForm} />
      ) : (
        <>
          <button className="btn btn-primary" onClick={onCreateNewPost}>
            {" "}
            {language.Create_new_Post}
          </button>
          <PostsList
            posts={posts}
            onPostUpdate={updatedPost}
            onPostDelete={deletePost}
          />
        </>
      )}
    </div>
  );
}

export default PostsPage;
