import { createContext, useState } from 'react';
import English from '../../Languages/english.json';
import Swedish from '../../Languages/swedish.json';
import Spanish from '../../Languages/spanish.json';

// Created a contextProvider for wrapping whole website
export const LangContext = createContext();

//defined functions to change the langauge
const LangContextProvider = props => {
  const [language, setLanguage] = useState(English, Swedish, Spanish);

  function changeLanguageToEn() {
    setLanguage(English);
  }

  const changeLanguageToSv = () => {
    setLanguage(Swedish);
  };

  const changeLanguageToEs = () => {
    setLanguage(Spanish);
  };
  
  return (
    <LangContext.Provider
      value={{ language, changeLanguageToEn, changeLanguageToSv, changeLanguageToEs }}>
      {props.children}
    </LangContext.Provider>
  );
};
export default LangContextProvider;
