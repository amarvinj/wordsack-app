import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Document as DOCXDocument, Packer, Paragraph, TextRun } from "docx";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

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
import { PdfDoc } from "./PdfDoc";

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

  const rightFlag =
    ["ar", "he", "dv", "ckb", "ps", "fa", "sd", "ur", "ug", "yi"].filter(
      (lang) => {
        return lang === outputLanguage.value;
      }
    ).length > 0;

  const handlePdfDownload = () => {
    //code to download a pdf file

    let font;

    if (outputLanguage.value === "ja") {
      font = "Noto Sans Japanese";
    } else if (outputLanguage.value === "ko") {
      font = "Noto Sans Korean";
    } else if (outputLanguage.value === "zh-TW") {
      font = "Noto Sans Traditional Chinese";
    } else if (outputLanguage.value === "zh-CN") {
      font = "Noto Sans Simplified Chinese";
    } else if (outputLanguage.value === "th") {
      font = "Noto Sans Thai";
    } else if (outputLanguage.value === "ta") {
      font = "Noto Sans Tamil";
    } else if (outputLanguage.value === "ml") {
      font = "Noto Sans Malayalam";
    } else if (outputLanguage.value === "he" || outputLanguage.value === "yi") {
      font = "Noto Sans Hebrew";
    } else if (outputLanguage.value === "bn" || outputLanguage.value === "as") {
      font = "Noto Sans Bengali";
    } else if (outputLanguage.value === "ka") {
      font = "Noto Sans Georgian";
    } else if (outputLanguage.value === "si") {
      font = "Noto Sans Sinhala";
    } else if (outputLanguage.value === "te") {
      font = "Noto Sans Telugu";
    } else if (outputLanguage.value === "hy") {
      font = "Noto Sans Armenian";
    } else if (outputLanguage.value === "kn") {
      font = "Noto Sans Kannada";
    } else if (outputLanguage.value === "km") {
      font = "Noto Sans Khmer";
    } else if (outputLanguage.value === "or") {
      font = "Noto Sans Oriya";
    } else if (outputLanguage.value === "gu") {
      font = "Noto Sans Gujarati";
    } else if (outputLanguage.value === "dv") {
      font = "Noto Sans Thaana";
    } else if (outputLanguage.value === "lo") {
      font = "Noto Sans Lao";
    } else if (outputLanguage.value === "my") {
      font = "Noto Sans Myanmar";
    } else if (outputLanguage.value === "am" || outputLanguage.value === "ti") {
      font = "Noto Sans Ethiopic";
    } else if (
      outputLanguage.value === "ar" ||
      outputLanguage.value === "sd" ||
      outputLanguage.value === "ug" ||
      outputLanguage.value === "ckb" ||
      outputLanguage.value === "ur" ||
      outputLanguage.value === "ps" ||
      outputLanguage.value === "fa"
    ) {
      font = "Noto Sans Arabic";
    } else if (outputLanguage.value === "mni-Mtei") {
      font = "Noto Sans Meetei Mayek";
    } else if (outputLanguage.value === "pa") {
      font = "Noto Sans Gurmukhi";
    } else {
      font = "Noto Sans";
    }

    console.log(font);

    pdf(PdfDoc({ translated, font, rightFlag, inputLanguage, outputLanguage }))
      .toBlob()
      .then(function (blob) {
        const url = URL.createObjectURL(blob);
        saveAs(
          url,
          `wordsack-${inputLanguage.label}-to-${outputLanguage.label}.pdf`
        );
      });
  };

  const handleDocxDownload = () => {
    //code to download a docx file
    const doc = new DOCXDocument({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Wordsack",
                  bold: true,
                  size: 84,
                }),
              ],
              alignment: "center",
              spacing: {
                before: 100, // add 100 twips (1/20th of a point) of space before the paragraph
                after: 200, // add 200 twips of space after the paragraph
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${inputLanguage.label}-to-${outputLanguage.label}`,
                  bold: true,
                  size: 35,
                }),
              ],
              alignment: "center",
              spacing: {
                before: 100, // add 100 twips (1/20th of a point) of space before the paragraph
                after: 500, // add 500 twips of space after the paragraph
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `\t${translated}`,
                }),
              ],
              alignment: rightFlag ? "right" : "left",
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(function (blob) {
      saveAs(
        blob,
        `wordsack-${inputLanguage.label}-to-${outputLanguage.label}.docx`
      );
    });
  };
  return (
    <motion.div
      className="translate-container"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 170,
        damping: 20,
      }}
      exit={{ scale: 1.15, opacity: 0 }}
    >
      <div className="left">
        <div className="container-area">
          <form>
            <textarea
              className="text-area"
              placeholder="Type in English"
              value={inputText}
              onChange={handleKeyPress}
              // rome-ignore lint/a11y/noAutofocus: <explanation>
              autoFocus={true}
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

              <DownloadDropdown
                handlePdfClick={handlePdfDownload}
                handleDocxClick={handleDocxDownload}
              />
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
