import React, { useState, useEffect } from 'react';
import CommentsList from './CommentsList';
import CommentsApi from '../../../api/CommentsApi';

export default function CommentPageDetails({ match, post }) {
  const [comments, setComments] = useState([]);

  const getAllCommentsByPostId = async () => {
    const res = await CommentsApi.getCommentById(post.id);
    console.log('response', res.data);
    return setComments(res.data);
  };

  useEffect(() => {
    getAllCommentsByPostId();
  }, []);

  const deleteComment = async comment => {
    await CommentsApi.deleteComment(comment.id);
    return setComments(comments.filter(a => a.id !== comment.id));
  };

  return (
    <div>{<CommentsList comments={comments} onCommentDelete={deleteComment} />}</div>
  );
}
