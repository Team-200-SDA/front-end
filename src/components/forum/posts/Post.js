
import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import {Link} from "react-router-dom";
import CommentForm from '../comments/CommentForm';
import UserApi from '../../../api/UserApi';
import Comment from '../comments/Comment';


function Post({ post, onPostUpdate, onPostDelete }) {

  const [isUpdate, setIsUpdate] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);



  const [user, setUser] = useState([]);

  const getUser = () => {
    UserApi.getLoggedInUser().then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);


  const isMyPost = post.user.id === user.id

  const onUpdateClick = () => {
    setIsUpdate(true);
  };

  const onPostFormSubmit = (postData) => {
    const updatedPost = { ...post, ...postData };
    return onPostUpdate(updatedPost)
      .then(() => setIsUpdate(false));
  };

  const onPostFormCancel = () => {
    setIsUpdate(false)
  }

  const onCreateCommentClick = (data) => {
    setIsFormOpen(true);
  }

  const onCreateCommentCancel = () => {
    setIsFormOpen(false)
  }

  return (
    <div>
      {
      isUpdate ? (
       
       <PostForm
          initialTitle={post.title}
          initialBody={post.body}
          onSubmit={onPostFormSubmit}
          onCancel={onPostFormCancel}
          formTitle="Update post"
        />
        )
       : (
        <div className="card mt-4">
          <div className="card-body">
            <div className="card-title">
              <Link to={`/post/${post.id}/comments`}>
                <h3>{post.title}</h3>
              </Link>
              
              <p className="badge badge-primary text-wrap">{post.user.name}</p>
            </div>
            <div>{post.body}</div>

            <div className="mt-3">
              {isMyPost && (
                <>
                  <button className="btn btn-warning" onClick={onUpdateClick}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger ml-3"
                    onClick={() => onPostDelete(post)}
                  >
                    Delete
                  </button>
                </>
              )}
              <button type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#myModal" onClick={onCreateCommentClick}>
                  Add Comment 
              </button>
              </div>
              { isFormOpen &&
               < CommentForm
                  onCancel={onCreateCommentCancel}
                  onSubmit={onCreateCommentClick}
                  isFormOpen={setIsFormOpen}
                  post={post}            
                />        
              }  
                 {/* <Comment isMyPost={isMyPost}/> */}
          </div>
        </div>
        )
      }  
    </div>
  );
}
export default Post;

