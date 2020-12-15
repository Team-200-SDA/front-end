import React from 'react';
import Calendar from '@ericz1803/react-google-calendar';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

function CalendarComponent() {
  const API_KEY = 'AIzaSyBYTS15rNiD7rLgO1SIjMYu8DnZ-TfxX1E';
  const CALENDAR_ID = 'sda.team200@gmail.com';
  const { language } = useContext(LangContext);

  /**
   * These can be any colours. But setting them here applies
   * classes, allowing us to manipulate them in CSS.
   */
  const styles = {
    eventCircle: {
      color: '#B241D1'
    },
    multiEvent: css`
      background: #b241d1;
      &:hover {
        background: #86319e;
      }
      &:after {
        border-left-color: #b241d1;
      }
      &:hover::after {
        border-left-color: #86319e;
      }
      &:before {
        border-right-color: #b241d1;
      }
      &:hover::before {
        border-right-color: #86319e;
      }
    `
  };

  return (
    <>
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="far fa-calendar-alt title-icon"></i>
          {language.Calendar}
        </h1>
      </div>
      <div className="card-body calendar-card">
        <Calendar apiKey={API_KEY} calendarId={CALENDAR_ID} styles={styles} />
      </div>
    </>
  );
}

export default CalendarComponent;
