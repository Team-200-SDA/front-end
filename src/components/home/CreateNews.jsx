import React, { useState } from 'react';
import NewsApi from '../../api/NewsApi';

export default function CreateNews(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    
    function createNews() {
        if (body === "") { return;}   //we dont want to post a news with no body.

        const newNews = {
            title: title,
            body: body,
            image: image,
        };

        NewsApi.createNews(newNews)
            .then((res) => {
                console.log(res);
                props.getAllNews();
                setTitle("");
                setBody("");
                setImage("");
            })
    }
    
    return (
        <div className="container col-sm-12 col-md-10 col-lg-8">
            <div className="form-group">
                <input className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                
                <textarea className="form-control"
                    placeholder={`Body of the news`}
                    value={body}
                    onChange={event => setBody(event.target.value)}
                />

                <textarea className="form-control"
                    placeholder={`Image for the news`}
                    value={image}
                    onChange={event => setImage(event.target.value)}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-primary  " onClick={createNews}>Upload</button>
            </div>
        </div>
    );

}