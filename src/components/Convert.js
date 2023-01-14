import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Convert({ language, text, translated, setTranslated }) {
  const [debouncedText, setDebouncedText] = useState(text);

  let placeHolder = "Translation";

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

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
    if (debouncedText.length <= 3000) {
      doTranslation();
    } else {
      console.log(
        "LIMIT: More than 3900 cant be transalted.Go To Hire Experts"
      );
    }
  }, [language, debouncedText, setTranslated]);

  text !== "" && !text.match(/^\s*$/) && (placeHolder = "Translating...");

  return (
    <div>
      <textarea
        className="output-area"
        placeholder={placeHolder}
        readOnly="readonly"
        value={translated}
      />
    </div>
  );
}

export default Convert;
