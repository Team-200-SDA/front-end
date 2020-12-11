import React from 'react';
import { DeleteRounded } from '@material-ui/icons';

export default function News({ news, deleteNews }) {
  const user_role = window.sessionStorage.getItem('role');

  return (
    <div className="card news-div">
      <h2>{news.title}</h2>
      <img className="news-image" src={news.image} alt="News" width="70%" />
      <div>
        <div className="news-article-body">{news.body}</div>
      </div>
      {user_role !== 'teacher' ? null : (
        <div>
          <DeleteRounded
            className="delete-thread news-delete"
            onClick={() => deleteNews(news.id)}
          />
        </div>
      )}
    </div>
  );
}
