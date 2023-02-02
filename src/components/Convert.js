import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "./translate.css";
import WordCounter from "./WordCounter";

function Convert({ language, text, translated, setTranslated }) {
  const [debouncedText, setDebouncedText] = useState(text);

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
            key: "AIzaSyDfr8quOrmhLX1yyXJnImr-wRJdit5jWOY",
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
      />
      <div className="bottom-container">
        <div className="counter">{showCounter}</div>
      </div>
    </div>
  );
}

export default Convert;
