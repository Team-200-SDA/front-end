import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import { DeleteRounded } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import SubjectApi from '../../api/SubjectApi';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function Subject({ subject, getSubjects, userRole }) {
  const { language } = useContext(LangContext);
  const deleteSubject = async id => {
    await SubjectApi.delete(id);
    alert(language.Subject_Deleted);
    getSubjects();
  };

  return (
    <div className="subject-cards">
      <Link to={`/lectures/${subject.id}`}>
        <CardActionArea className="subject-card-body">
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
      </Link>

      {userRole !== 'teacher' ? null : (
        <CardActions className="subject-delete-div">
          <div>
            <DeleteRounded
              className="delete-thread subject-delete"
              onClick={() => deleteSubject(subject.id)}
            />
          </div>
        </CardActions>
      )}
    </div>
  );
}

export default Subject;
