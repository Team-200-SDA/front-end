import React from 'react';
// import '../../css/news/news.css';

export default function News({ news, deleteNews }) {
  return (
    <div className="card news-card">
      <div className="card-body">
        <div>
          <h3>{news.title}</h3>
          <p>{news.body}</p>
        </div>
        <div>{news.image}</div>
        <button className="btn btn-light" onClick={() => deleteNews(news.id)}>
            Delete
        </button>
      </div>
    </div>
  );
}
