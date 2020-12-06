import { createContext } from 'react';
import English from '../Languages/English/login.json';
import Swedish from '../Languages/Swedish/login.json';
import detector from 'detect-browser-language';

export const LangContext = createContext();

const LangContextProvider = (props) => {

    const lang = detector();
    
    let language =English;

    {lang === "sv" ? language = Swedish : language = English }

    return (
        <LangContext.Provider value= {{language}}>
            {props.children}
        </LangContext.Provider> 
    )
}
export default LangContextProvider;