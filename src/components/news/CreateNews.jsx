import React, { useState } from 'react';
import NewsApi from '../../api/NewsApi';

import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';
import { Button, FormLabel } from '@material-ui/core';

export default function CreateNews(props) {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

  /**
   * Creates a news object based on state values.
   * Do a POST request with the news as the payload.
   * Resets state values.
   * Updates list of news by doing a GET request.
   */
  function createNews() {
    if (body === '') {
      return;
    } //we dont want to post a news with no body.

    const newNews = {
      title: title,
      body: body,
      image: image
    };

    NewsApi.createNews(newNews).then(res => {
      props.getAllNews();
      setTitle('');
      setBody('');
      setImage('');
    });
  }

  return (
    <div className="card-body create-news-div">
      <div className="creation-form upload-file-tag">
        {language.Post_Article_Announcement}
      </div>
      <FormLabel className="form-label" component="legend">
        {language.Enter_article_announcement_title}
      </FormLabel>
      <div className="form-group">
        <input
          className="form-control subject-input"
          placeholder={language.News_Announcement_Title}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <FormLabel className="form-label" component="legend">
          {language.Article_announcement_content}
        </FormLabel>
        <textarea
          className="form-control subject-input"
          placeholder={language.News_Article_Content}
          value={body}
          onChange={event => setBody(event.target.value)}
        />

        <ImageUploader setImgUrl={setImage} uploadPreset={'newspics'} />
        {/* upload image from local storage */}
      </div>

      <div className="form-group">
        <Button
          className="upload-button"
          variant="contained"
          color="primary"
          onClick={createNews}
          disabled={image === ''}>
          {language.Publish}
        </Button>
      </div>
    </div>
  );
}
