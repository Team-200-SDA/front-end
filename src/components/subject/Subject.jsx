import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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
    <>
      <Card className="">
        <CardActionArea>
          <CardMedia
            className=""
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
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
          <Button onClick={() => deleteSubject(subject.id)} size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Subject;
