import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import NewsApi from '../../api/NewsApi';

import CreateNews from './CreateNews';
import News from './News';

import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function HomePage() {
  const { language } = useContext(LangContext);
  const [news, setNews] = useState([]);

  const user_role = window.sessionStorage.getItem('role');

  function getAllNews() {
    NewsApi.getAllNews().then(data => {
      setNews(data.data);
      console.log(data);
    });
  }

  useEffect(() => {
    getAllNews();
  }, []);

  function deleteNews(newsId) {
    NewsApi.deleteNews(newsId).then(() => {
      alert(language.News_Deleted);
      getAllNews(); // to refresh the list immediately
    });
  }

  return (
    <div className="home-page-wrap">
      <div className="title-div">
        <h1 className="page-title-text">
        <i className="fas fa-newspaper title-icon" />
        {language.Daily_Highlight}
        </h1>
      </div>
      
      <div className="card-body">
        {user_role !== 'teacher' ? null : (
          <CreateNews news={news} getAllNews={getAllNews} />
        )}
        
        {news.length === 0
          ? null
          : news.map(news => <News key={uuid()} news={news} deleteNews={deleteNews} />)}
      </div>
    </div>
   
  );
}
