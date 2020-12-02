import React from 'react';
// import '../../css/news/news.css';

export default function News({ news, deleteNews }) {
  return (
    <div className="card news-card">
      <div className="card-body">
        <span>
          <a href={news.link} className="">
            {news.title}
          </a>
        </span>
        <button className="btn btn-light" onClick={() => deleteNews(news.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
