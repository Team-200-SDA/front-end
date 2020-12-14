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

  /**
   * API Call: Get all news created by teachers
   */
  function getAllNews() {
    NewsApi.getAllNews().then(data => {
      setNews(data.data);
    });
  }

  useEffect(() => {
    getAllNews();
  }, []);

  /**
   *
   * @param {Long} newsId
   * Delete a specific news by id and then update the component by doing API
   * calls to get the updated list of news.
   */
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
          {language.News}
        </h1>
      </div>

      {user_role !== 'teacher' ? null : (
        <CreateNews news={news} getAllNews={getAllNews} />
      )}

      {news.length === 0
        ? null
        : news.map(news => <News key={uuid()} news={news} deleteNews={deleteNews} />)}
    </div>
  );
}
