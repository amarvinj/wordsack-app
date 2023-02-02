import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/button";
import { BUTTON_TYPES } from "../common/data/button";
import WordCounter from "./WordCounter";
import TranslationContext from "../context/Translation";
import "../App.css";
import "./maximized.css";
import { minimize, rotate } from "../common/data/icons";
import DownloadDropdown from "./downloadDropdown";

function Maximized() {
  const {
    inputLanguage,
    outputLanguage,
    inputText,
    setInputText,
    translated,
    setTranslated,
    setInputTextWords,
  } = useContext(TranslationContext);

  const onButtonClick = () => {
    if (inputText.length > 0) {
      setInputTextWords(WordCounter({ text: inputText }));
    } else {
      setInputTextWords(0);
    }
  };

  const handleKeyPress = (e) => {
    setInputText(e.target.value);
  };

  const handleReset = () => {
    setInputText("");
    setTranslated("");
    setInputTextWords(0);
  };

  return (
    <motion.div
      className="App"
      initial={{ scale: 0.9, opacity: 0, x: -500 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      exit={{ scale: 0.5, opacity: 0, x: -500 }}
    >
      <div className="maximized">
        <form>
          <textarea
            className="maximized-text-area"
            placeholder="Type in English"
            // rome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus={true}
            value={inputText}
            onChange={handleKeyPress}
          />
        </form>
        <div className="maximized-bottom-container">
          <div className="counter">
            <WordCounter text={inputText} clsName="counter" /> Words
          </div>
          {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div className="rotate" onClick={handleReset}>
            {rotate}
          </div>
        </div>
      </div>
      <div className="maximized-buttons">
        <DownloadDropdown
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          translated={translated}
        />
        <Link to={"/"}>
          <button className="minimize-button">{minimize}</button>
        </Link>
      </div>
      <Link to={"/hire-experts"}>
        <Button
          type={BUTTON_TYPES.PRIMARY}
          btnText={"Hire Experts"}
          iconPos="LEFT"
          onButtonClick={onButtonClick}
        />
      </Link>
    </motion.div>
  );
}

export default Maximized;
