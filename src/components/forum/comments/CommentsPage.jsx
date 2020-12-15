//simdilik kullanmiyoruz

//Component and react imports
import React, { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import CommentsApi from "../../../api/CommentsApi";
import Comment from './Comment';

function CommentsPage() {
  const [comments, setComments] = useState([]);

  const getAll = () => {
    CommentsApi.getAllComments().then((res) => setComments(res.data));
  };

  useEffect(() => {
    getAll();
  }, []);

  const deleteComment = (comment) => {
    return CommentsApi.deleteComment(comment.id).then(() =>
      setComments(comments.filter((a) => a.id !== comment.id))
    );
  };

  

  return (
    <div>
      {
        // <CommentsList
        //   comment={comments}
        //   setComments={setComments}
        //   onCommentDelete={deleteComment}
        // />

        // comments.map(comment => (
        //   <Comment
        //     key={comment.id}
        //     comment={comments}
        //     onCommentDelete={deleteComment}
        //  //   onCommentUpdate={onCommentUpdate}
        //     setComments={setComments}
        //   />
        // ))
      }
    </div>
  );
}

export default CommentsPage;
