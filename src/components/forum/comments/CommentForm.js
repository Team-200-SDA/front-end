import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import CommentsApi from '../../../api/CommentsApi';
import { commentState } from '../../../js/states/CommentState';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LanguageContext';

export default function CommentForm({
  initialBody,
  onCancel,
  formTitle,
  setIsFormOpen,
  post,
  isUpdate,
  setIsUpdate,
  comment
}) {
  //props come from Comment
  const [body, setBody] = useState(initialBody || '');
  const { language } = useContext(LangContext);
  const [commentAtom, setCommentAtom] = useRecoilState(commentState);

  // another copy of whatever.
  const getAllCommentsByPostId = async () => {
    const res = await CommentsApi.getCommentById(commentAtom[0].post.id);
    return setCommentAtom(res.data);
  };

  const onCreateCommentClick = async e => {
    e.preventDefault();
    const commentData = { body, post: post };
    await CommentsApi.createComment(commentData);
    setIsFormOpen(false);
    getAllCommentsByPostId(commentAtom[0].post.id);
  };

  const onUpdateCommentClick = async e => {
    e.preventDefault();
    const updatedComment = { ...comment, body };
    await CommentsApi.updateComment(updatedComment);
    getAllCommentsByPostId(commentAtom[0].post.id);
    setIsUpdate(false);
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">{formTitle || 'Create a comment'}</h4>

        <form
          onSubmit={
            isUpdate ? e => onUpdateCommentClick(e) : e => onCreateCommentClick(e)
          }>
          <div className="form-group">
            <label>{language.Body}</label>
            <textarea
              className="form-control"
              placeholder={language.Comment_Body}
              value={body}
              onChange={e => setBody(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-info" t ype="submit">
              {language.Save}
            </button>

            <button className="btn btn-outline" type="button" onClick={onCancel}>
              {language.Cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
