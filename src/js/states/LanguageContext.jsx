import { createContext, useState } from 'react';
import English from '../../Languages/english.json';
import Swedish from '../../Languages/swedish.json';
import Spanish from '../../Languages/spanish.json';

export const LangContext = createContext();

const LangContextProvider = props => {
  const [language, setLanguage] = useState(English, Swedish);

  const changeEn = () => {
    setLanguage(English);
  };

  const changeSv = () => {
    setLanguage(Swedish);
  };

  const changeEs = () => {
    setLanguage(Spanish);
  };
  

  return (
    <LangContext.Provider
      value={{ language, changeSv, changeEn, changeEs }}>
      {props.children}
    </LangContext.Provider>
  );
};
export default LangContextProvider;
