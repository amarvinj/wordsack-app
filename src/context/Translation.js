import { createContext, useState } from "react";
import { DROPDOWN_OPTIONS } from "../common/data/dropdown";

const TranslationContext = createContext();

function TranslationProvider({ children }) {
  const [inputLanguage, setInputLanguage] = useState(DROPDOWN_OPTIONS[1]);
  const [outputLanguage, setOutputLanguage] = useState(DROPDOWN_OPTIONS[0]);
  const [inputText, setInputText] = useState("");
  const [translated, setTranslated] = useState("");
  const [inputTextWords, setInputTextWords] = useState(0);

  const TranslationSelected = {
    inputLanguage: inputLanguage,
    outputLanguage: outputLanguage,
  };

  return (
    <TranslationContext.Provider
      value={{
        inputLanguage,
        setInputLanguage,
        outputLanguage,
        setOutputLanguage,
        inputText,
        setInputText,
        translated,
        setTranslated,
        TranslationSelected,
        inputTextWords,
        setInputTextWords,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export { TranslationProvider };
export default TranslationContext;
