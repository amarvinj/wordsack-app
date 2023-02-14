import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TranslationContext from "../context/Translation";
import HireExpertsContext from "../context/HireExperts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Dropdown from "./dropdown";
import { DROPDOWN_OPTIONS } from "../common/data/dropdown";
import { SUPPORTED_LANGUAGES } from "../common/data/supported-languages";
// import "../App.css";
import "./translate.css";
import Convert from "./Convert";
import DownloadDropdown from "./downloadDropdown";
import { copy, maximize, rotate } from "../common/data/icons";
import WordCounter from "./WordCounter";
import CopySound from "../common/data/sound.wav";
import Button from "../components/button";
import { BUTTON_TYPES } from "../common/data/button";
import { Intermediate } from "../common/data/packages";

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
    setInputTextWords,
  } = useContext(TranslationContext);

  const {
    setPage,
    setProgressBarClassName,
    setFirstVisit,
    setSelectedPackage,
    setHours,
  } = useContext(HireExpertsContext);

  const [copied, setCopied] = useState(false);
  const [supported, setSupported] = useState(false);

  /*check whether the language is supported or not 
  for translation by our experts */
  useEffect(() => {
    let outputValidate = false;
    let inputValidate = false;

    inputValidate = !!SUPPORTED_LANGUAGES.find(
      (language) => language.one.value === inputLanguage.value
    );

    if (inputValidate) {
      outputValidate = !!SUPPORTED_LANGUAGES.find(
        (language) => language.two.value === outputLanguage.value
      );
    }

    if (inputValidate === false) {
      inputValidate = !!SUPPORTED_LANGUAGES.find(
        (language) => language.two.value === inputLanguage.value
      );

      outputValidate = !!SUPPORTED_LANGUAGES.find(
        (language) => language.one.value === outputLanguage.value
      );
    }

    setSupported(() => {
      return inputValidate && outputValidate;
    });
  }, [outputLanguage, inputLanguage]);

  const play = () => {
    new Audio(CopySound).play();
  };

  copied &&
    setTimeout(() => {
      setCopied(false);
    }, 150);

  const handleKeyPress = (e) => {
    setInputText(e.target.value);
    setFirstVisit(true);
    setSelectedPackage(Intermediate);
    setHours(48);
  };

  const handleReset = () => {
    setInputText("");
    setTranslated("");
    setInputTextWords(0);
  };

  const onButtonClick = () => {
    if (inputText.length > 0) {
      setInputTextWords(WordCounter({ text: inputText }));
    } else {
      setInputTextWords(0);
    }

    setPage(1);
    setProgressBarClassName("title-bar-progress-bar");
  };

  return (
    <motion.div
      className="translate-container"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      exit={{ scale: 1.15, opacity: 0 }}
    >
      <div className="left">
        <div className="container-area">
          <form>
            <textarea
              className="text-area"
              placeholder={`Type in ${inputLanguage.label}`}
              value={inputText}
              onChange={handleKeyPress}
            />
          </form>

          <div className="top-container">
            <Dropdown
              borderOn={true}
              options={DROPDOWN_OPTIONS}
              selectedOption={inputLanguage}
              setSelectedOption={setInputLanguage}
              disabled={true}
            />
            <Link to={"/maximized"}>
              <button className="zoom-button">{maximize}</button>
            </Link>
          </div>

          <div className="bottom-container">
            <div className="counter">
              <WordCounter text={inputText} clsName="counter" /> Words
            </div>
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div className="rotate" onClick={handleReset}>
              {rotate}
            </div>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="container-area container-right">
          <Convert
            text={inputText}
            language={outputLanguage}
            translated={translated}
            setTranslated={setTranslated}
          />

          <div className="top-container">
            <Dropdown
              borderOn={true}
              options={DROPDOWN_OPTIONS}
              selectedOption={outputLanguage}
              setSelectedOption={setOutputLanguage}
              color={true}
            />
            <div className="buttons">
              <div className="copy">
                {copied ? <span className="copy-text">Copied</span> : null}
                <CopyToClipboard
                  text={translated}
                  onCopy={() => setCopied(true)}
                >
                  <button onClick={play} className="copy-button">
                    {copy}
                  </button>
                </CopyToClipboard>
              </div>

              <DownloadDropdown />
            </div>
          </div>
          {/* <div className="bottom-container">
            <div className="counter">
              <WordCounter text={translated} clsName="counter" /> Words
            </div>
          </div> */}
        </div>
      </div>
      <Link to={supported ? "/hire-experts" : "/unsupported-language"}>
        <Button
          type={BUTTON_TYPES.PRIMARY}
          btnText={"Hire Experts"}
          iconPos="LEFT"
          onButtonClick={onButtonClick}
        />
      </Link>
    </motion.div>
  );
};

export default Translate;
