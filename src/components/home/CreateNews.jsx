import React, { useState } from 'react';
import NewsApi from '../../api/NewsApi';

import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function CreateNews(props) {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

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
      console.log(res);
      props.getAllNews();
      setTitle('');
      setBody('');
      setImage('');
    });
  }

  return (
    <div className="card-body create-news-div">
      <div className="form-group">
        <input
          className="form-control"
          placeholder="News Title..."    //Erkan  
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <textarea
          className="form-control"
          placeholder="News Body..."    //Erkan  
          value={body}
          onChange={event => setBody(event.target.value)}
        />    

        <ImageUploader setImgUrl={setImage} uploadPreset={'newspics'} />
        
      </div>

      <div className="form-group">
        <button className="btn btn-primary" onClick={createNews}>
          {language.Publish}
        </button>
      </div>
      
    </div>
  );
}
