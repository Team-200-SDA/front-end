import React, { useEffect, useState } from 'react';
import LectureApi from '../../api/LectureApi';

export default function Lecture(props) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    function createLecture() {
        if (link === "") { return;}   //we dont want to post a Lecture with no details.

        const newLecture = {
            lectureTitle: title,
            lectureLink: link,
        };

        LectureApi.createLecture(newLecture)
            .then(() => {
                props.getAllLectures();
                setLink("");
                setTitle("");
            })
    }   

    return (
        <div className="container col-sm-12 col-md-10 col-lg-8">
            {/* <p className="card-title">Create a new Post</p> */}
            <div className="form-group">
                <input className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <textarea className="form-control post-content"
                    placeholder={`Link for the lecture.`}
                    value={link}
                    onChange={event => setLink(event.target.value)}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-primary  " onClick={createLecture}>Upload</button>
            </div>
        </div>
    );

}