import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import React from 'react';
import LectureApi from '../../api/LectureApi';
import fileTypeImage from '../../js/functions/fileUpload/fileTypeImage';

export default function Lecture({ getAllLectures, lecture, userRole }) {
  function deleteLecture(lectureId) {
    LectureApi.deleteLecture(lectureId).then(() => {
      alert('Lecture Deleted!');
      getAllLectures();
    });
  }

  return (
    <Card className="lecture-cards">
      <a className="file-link" target="_blank" rel="noreferrer" href={lecture.link}>
        <CardActionArea className="lecture-card-body">
          <img className="file-type" src={fileTypeImage(lecture.type)} alt="" />
          <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {lecture.fileName}
              </Typography>
          </CardContent>
        </CardActionArea>
      </a>

      {/* Delete Button if logged in user is a teacher */}
      {userRole !== 'teacher' ? null : (
        <CardActions className="lecture-button-div">
          <Button
            className="lecture-button"
            onClick={() => deleteLecture(lecture.id)}
            size="small"
            color="var(--dominant)">
            Delete
          </Button>
      </CardActions>
      )}
    </Card>
  );
}
