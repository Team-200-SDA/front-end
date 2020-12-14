import React, { useState, useEffect } from 'react';
import CommentsList from './CommentsList';
import CommentsApi from '../../../api/CommentsApi';
import { useRecoilState } from 'recoil';
import { commentState } from '../../../js/states/CommentState';

export default function CommentPageDetails({ match, post }) {
  const [comments, setComments] = useRecoilState(commentState);

  const getAllCommentsByPostId = async () => {
    const res = await CommentsApi.getCommentById(post.id);
    return setComments((res.data.sort((a, b) => b.id - a.id)));
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
