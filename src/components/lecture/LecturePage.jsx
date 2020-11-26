import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid';

import LectureApi from '../../api/LectureApi';

import CreateLecture from './CreateLecture';
import Lecture from './Lecture';


export default function LecturePage() {
    const [ lectures, setLectures ] = useState([]);

    function getAllLectures() {
        LectureApi.getAllLectures()
            .then((data) => {
                setLectures(data.data);
                console.log(data);
            })
    }

    useEffect(() => {
        getAllLectures();
    }, [])
    
    function deleteLecture(lectureId) {
        LectureApi.deleteLecture(lectureId)
            .then(() => {
                getAllLectures(); // to refresh the list immediately
            })
    }

    return (
        <div className= "lecture-div">
            <CreateLecture lectures={lectures} getAllLectures={getAllLectures}/>

            { lectures.length === 0 ? "No lecture yet" :
                   lectures
                    .map((lecture) => 
                    <Lecture key={uuid()} lecture={lecture} deleteLecture={deleteLecture} />
            )}
        </div>
    );

}