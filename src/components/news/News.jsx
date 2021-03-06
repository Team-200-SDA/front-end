import React, { useState } from 'react';
import { DeleteRounded } from '@material-ui/icons';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

export default function News({ news, deleteNews }) {
  const user_role = window.sessionStorage.getItem('role');
  const [showAll, setShowAll] = useState(false);
  const { language } = useContext(LangContext);
  const toggleNewsView = () => {
    setShowAll(!showAll);
  };

  /**
   * Allows option to see the news in a short summary
   * or in full context
   */
  const fullNewsBody = (
    <>
      {news.body}
      {news.body.length > 1000 ? (
        <p onClick={toggleNewsView} className="toggle-news-view">
          {language.Read_less}
        </p>
      ) : null}
    </>
  );

  const newsSummary = (
    <>
      {news.body.substring(0, 700)}
      <p onClick={toggleNewsView} className="toggle-news-view">
        {language.Read_More}
      </p>
    </>
  );

  return (
    <div className="card-body news-div">
      <img className="news-image" src={news.image} alt="News" width="70%" />
      <div>
        <h2>{news.title}</h2>
        <div className="news-article-body">{showAll ? fullNewsBody : newsSummary}</div>
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
