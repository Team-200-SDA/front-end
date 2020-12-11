import { createContext, useState } from 'react';
import English from '../Languages/English/login.json';
import Swedish from '../Languages/Swedish/login.json';
import Spanish from '../Languages/Spanish/login.json';
import detector from 'detect-browser-language';

export const LangContext = createContext();

const LangContextProvider = props => {
  const [language, setLanguage] = useState(English, Swedish);

  const lang = detector();

  const changeEn = () => {
    setLanguage(English);
  };

  const changeSv = () => {
    setLanguage(Swedish);
  };

  const changeEs = () => {
    setLanguage(Spanish);
  };
  const changeLanguage = () => {
    if (language === English) {
      setLanguage(Swedish);
    }
    if (language === Swedish) {
      setLanguage(English);
    }
  };

  // const detectLang = () => {
  //   lang === 'sv' ? setLanguage(Swedish) : setLanguage(English);
  // };

  return (
    <LangContext.Provider
      value={{ language, changeSv, changeEn, changeLanguage, changeEs }}>
      {props.children}
    </LangContext.Provider>
  );
};
export default LangContextProvider;
