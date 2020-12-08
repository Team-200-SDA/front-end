import { createContext, useState } from 'react';
import English from '../Languages/English/login.json';
import Swedish from '../Languages/Swedish/login.json';
import detector from 'detect-browser-language';

export const LangContext = createContext();

const LangContextProvider = (props) => {
    
    const [language, setLanguage] = useState(English, Swedish)

    const lang = detector();

    // setLanguage(English);

    const changeEn = () => {

        setLanguage(English)
    
    }
        
    const changeSv = () => {
    
        setLanguage(Swedish)
        
    }

    // { lang === "sv" ? language = Swedish : language = English }

    return (
        <LangContext.Provider value={{ language ,changeSv, changeEn}}>
            {props.children}
        </LangContext.Provider>
    )
}
export default LangContextProvider;