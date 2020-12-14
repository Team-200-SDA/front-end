import React from 'react';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

export default function StartButton({ disabled, onClick }) {
  const { language } = useContext(LangContext);
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      color="primary"
      size="large"
      className="join-button"
      startIcon={<RecordVoiceOverIcon />}>
      {language.Join_Classroom}
    </Button>
  );
}
