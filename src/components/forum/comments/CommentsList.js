import React from 'react';
import Comment from './Comment';

function CommentsList({comments, onCommentDelete, onCommentUpdate}) {
    return <div className="mt-4">
        {
        comments.map(comment => <Comment 
                key={comment.id} 
                comment= {comment} 
                onCommentDelete = {onCommentDelete} 
                onCommentUpdate = {onCommentUpdate}/>)
        }
    </div>
}
export default CommentsList;  