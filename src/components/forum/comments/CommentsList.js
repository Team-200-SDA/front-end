import React from "react";
import PostsPage from "../posts/PostsPage";
import Comment from "./Comment";

function CommentsList({ 
  comments,
  onCommentDelete,
  onCommentUpdate,
  setComments,
}) { //props come from CommentsPage
  
  return (
    <div className="mt-4">
      <div className="mt-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onCommentDelete={onCommentDelete}
            onCommentUpdate={onCommentUpdate}
            setComments={setComments}
          />
        ))}
      </div>
    </div>
  );
}
export default CommentsList;
