import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "./translate.css";
import WordCounter from "./WordCounter";

function Convert({ language, text, translated, setTranslated }) {
  const [debouncedText, setDebouncedText] = useState(text);
  const [right, setRight] = useState(false);

  let showCounter = (
    <div className="counter">
      <WordCounter text={translated} clsName="counter" /> Words
    </div>
  );

  text !== "" &&
    !text.match(/^\s*$/) &&
    translated === "" &&
    (showCounter = "Calculating...");

  let placeHolder = "Translation";
  let words = 0;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  if (debouncedText) {
    words = WordCounter({ text: debouncedText });
  }

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: `${process.env.REACT_APP_GOOGLE_TRANSLATE_KEY}`,
          },
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    if (words < 3900) {
      doTranslation();
    } else {
      console.log(
        "LIMIT: More than 3900 cant be transalted.Go To Hire Experts"
      );
    }
  }, [language, debouncedText, setTranslated, words]);

  useEffect(() => {
    const flagExists =
      ["ar", "he", "dv", "ckb", "ps", "fa", "sd", "ur", "ug", "yi"].filter(
        (lang) => {
          return lang === language.value;
        }
      ).length > 0;

    setRight(!flagExists);
  }, [language]);

  text !== "" && !text.match(/^\s*$/) && (placeHolder = "Translating...");

  text !== "" &&
    !text.match(/^\s*$/) &&
    words >= 39000 &&
    (placeHolder =
      "LIMIT: More than 3900 cant be transalted.Go To Hire Experts");

  return (
    <div>
      <textarea
        className="output-area"
        placeholder={placeHolder}
        readOnly="readonly"
        value={translated}
        style={{
          textAlign: `${
            right ? "left" : translated.length !== 0 ? "right" : "left"
          }`,
        }}
      />
      <div className="bottom-container">
        <div className="counter">{showCounter}</div>
      </div>
    </div>
  );
}

export default Convert;
