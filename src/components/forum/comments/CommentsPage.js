
import React ,{ useState, useEffect } from "react";
import CommentsList from './CommentsList';
import CommentsApi from "../../../api/CommentsApi";
import PostsPage from "../posts/PostsPage";

function CommentsPage() {
  const [comments, setComments] = useState([]);
    
  const getAll = () => {
        CommentsApi.getAllComments()
            .then(res => setComments(res.data));
            
    }

    useEffect(() => {
        getAll();
    }, []);

    const updateComment  = (comment) => {
        return CommentsApi.updateComment(comment)
            .then(res => getAll());
    }

    const deleteComment = (comment) => {
       return CommentsApi.deleteComment(comment.id)
            .then(() => setComments(comments.filter(a => a.id !== comment.id)));
    }
    
    return (
        
        <div>
           
           {
               <CommentsList
                    comment= {comments}
                    setComments = {setComments}
                    onCommentDelete = {deleteComment} 
                    onCommentUpdate = {updateComment}

                />
           }
        </div>
    );
}

export default CommentsPage;