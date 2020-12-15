//Component and react imports
import React from 'react';
import Post from './Post';

function PostsList({ posts, onPostUpdate, onPostDelete }) {
  //props come from PostsPage
  return (
    <div className="">
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          onPostUpdate={onPostUpdate}
          onPostDelete={onPostDelete}
        />
      ))}
    </div>
  );
}

export default PostsList;
