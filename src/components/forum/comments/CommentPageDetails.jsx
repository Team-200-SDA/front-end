//Component and react imports
import React, { useEffect } from "react";
import CommentsList from "./CommentsList";
import CommentsApi from "../../../api/CommentsApi";
import { useRecoilState } from "recoil";
import { commentState } from "../../../js/states/CommentState";

/**
 * This component has the functions to get and delete comments
 *
 */
export default function CommentPageDetails({ post }) {
  const [comments, setComments] = useRecoilState(commentState);

  /**
   * ***********************
   */
  const getAllCommentsByPostId = async () => {
    const res = await CommentsApi.getCommentById(post.id);
    return setComments(res.data.sort((a, b) => b.id - a.id));
  };

  useEffect(() => {
    getAllCommentsByPostId();
  }, []);

  /**
   * @param {*} comment
   *  Communicates with the backend and deletes the specific comment by comment id
   */
  const deleteComment = async (comment) => {
    await CommentsApi.deleteComment(comment.id);
    return setComments(comments.filter((a) => a.id !== comment.id));
  };

  return (
    <div>
      {<CommentsList comments={comments} onCommentDelete={deleteComment} />}
    </div>
  );
}
