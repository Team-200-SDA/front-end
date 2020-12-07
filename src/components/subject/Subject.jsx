import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import React from 'react';
import SubjectApi from '../../api/SubjectApi';

function Subject({ subject, getSubjects }) {
  console.log(subject);

  const deleteSubject = async id => {
    await SubjectApi.delete(id);
    getSubjects();
  };

  return (
    <Card className="subject-cards">
      <CardActionArea className="subject-card-body" onClick={null}>
        <img className="subject-image" src={subject.link} alt="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {subject.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {subject.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          className="subject-button"
          onClick={() => deleteSubject(subject.id)}
          size="small"
          color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Subject;
