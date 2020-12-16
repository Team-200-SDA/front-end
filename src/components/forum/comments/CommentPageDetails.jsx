//Component and react imports
import React, { useEffect, useState } from "react";
import CommentsApi from "../../../api/CommentsApi";
import Comment from "./Comment";

/**
 * This component has the functions to get and delete comments
 *
 */
export default function CommentPageDetails({ post, currentUser }) {
  const [comments, setComments] = useState([]);

  /**
   * Gets comments related to a specific post by post id
   * Sorts comments in descending order by id
   */
  const getAllCommentsByPostId = async () => {
    const res = await CommentsApi.getCommentById(post.id);
    return setComments(res.data.sort((a, b) => b.id - a.id));
  };

  useEffect(() => {
    getAllCommentsByPostId();
  });

  /**
   * @param {*} comment
   *  Provides the communication with the backend and deletes the specific comment by comment id
   */
  const deleteComment = async (comment) => {
    await CommentsApi.deleteComment(comment.id);
    return setComments(comments.filter((a) => a.id !== comment.id));
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          currentUser={currentUser}
          comment={comment}
          onCommentDelete={deleteComment}
          setComments={setComments}
          getAllCommentsByPostId={getAllCommentsByPostId}
         
        />
      ))}
    </div>
  );
}
