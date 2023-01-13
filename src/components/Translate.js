import React, { useState, useContext } from "react";
import TranslationContext from "../context/Translation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Dropdown from "./dropdown";
import { DROPDOWN_OPTIONS } from "../common/data/dropdown";
import "../App.css";
import Convert from "./Convert";
import DownloadDropdown from "./downloadDropdown";
import { copy, arrowMaximize, rotate } from "../common/data/icons";
import WordCounter from "./WordCounter";
import CopySound from "../common/data/sound.wav";

const Translate = () => {
  const {
    inputLanguage,
    setInputLanguage,
    outputLanguage,
    setOutputLanguage,
    inputText,
    setInputText,
    translated,
    setTranslated,
  } = useContext(TranslationContext);

  // const [inputLanguage, setInputLanguage] = useState(DROPDOWN_OPTIONS[1]);
  // const [outputLanguage, setOutputLanguage] = useState(DROPDOWN_OPTIONS[0]);
  // const [inputText, setInputText] = useState("");
  // const [translated, setTranslated] = useState("");

  const [copied, setCopied] = useState(false);

  const play = () => {
    new Audio(CopySound).play();
  };

  copied &&
    setTimeout(() => {
      setCopied(false);
    }, 150);

  const handleKeyPress = (e) => {
    setInputText(e.target.value);
  };

  const handleReset = () => {
    setInputText("");
    setTranslated("");
  };

  return (
    <div className="App">
      <div className="left">
        {/* <div className="heading">Wordsack</div> */}

        <form>
          <textarea
            className="text-area"
            placeholder="Type in English"
            value={inputText}
            onChange={handleKeyPress}
          />
        </form>

        <br />
        <Dropdown
          borderOn={true}
          options={DROPDOWN_OPTIONS}
          selectedOption={inputLanguage}
          setSelectedOption={setInputLanguage}
        />
        <button className="zoom-button">{arrowMaximize}</button>
        <div className="counter">
          <WordCounter text={inputText} clsName="counter" /> Words
        </div>
        {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div className="rotate" onClick={handleReset}>
          {rotate}
        </div>
      </div>

      <div className="right">
        <Convert
          text={inputText}
          language={outputLanguage}
          translated={translated}
          setTranslated={setTranslated}
        />

        <br />
        <Dropdown
          borderOn={true}
          options={DROPDOWN_OPTIONS}
          selectedOption={outputLanguage}
          setSelectedOption={setOutputLanguage}
        />

        <DownloadDropdown
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          translated={translated}
        />

        {copied ? <span className="copy-text">Copied</span> : null}
        <CopyToClipboard text={translated} onCopy={() => setCopied(true)}>
          <button onClick={play} className="copy-button">
            {copy}
          </button>
        </CopyToClipboard>
        <div className="counter">
          <WordCounter text={translated} clsName="counter" /> Words
        </div>
      </div>
    </div>
  );
};

export default Translate;
