import React, { useEffect, useState } from 'react';
import ReactImageUploadComponent from 'react-images-upload';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';
/*
Image Uploading Note:
Ideally the API should be in the backend, however, with testing, sending the image to the backend and then uploading takes too long.
Ideally, the backend should just sign an upload request, return the signed request to the frontend, which then uploads the image 
with the signed request. Unfortunately Cloudinary's java documentation is very limited in this regard and we just did not have 
the time to figure it out. I'm sure with more time, we could do it.
*/

function ImageUploader({ setImgUrl, uploadPreset }) {
  const { language } = useContext(LangContext);
  const [payload, setPayload] = useState(null);

  const updateImage = event => {
    var file = event[0];
    var data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);
    setPayload(data);
  };

  useEffect(() => {
    const abortFetch = new AbortController();
    const sendImage = async () => {
      try {
        if (payload !== null) {
          const response = await fetch(
            'https://api.cloudinary.com/v1_1/dyge6kiwf/image/upload', //We should probably put this in .env for now.
            {
              method: 'post',
              body: payload,
              signal: abortFetch.signal
            }
          );
          const jsonResponse = await response.json();
          setImgUrl(jsonResponse['secure_url']);
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendImage();
    return () => abortFetch.abort();
  }, [payload, setImgUrl]);

  return (
    <ReactImageUploadComponent
      singleImage={true}
      onChange={updateImage}
      buttonText={language.Choose_Image}
      className="imgUploader"
      withPreview={false}
      withIcon={false}
      label={language.Max_file}
    />
  );
}

export default ImageUploader;
