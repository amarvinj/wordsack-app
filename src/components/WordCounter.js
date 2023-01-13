import React from "react";
import "../App.css";

const WordCounter = ({ text, clsName }) => {
  let newText = text
    .split(" ")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        return char;
      }
    })
    .join(" ");
  let count = 0;

  const countWord = () => {
    if (text.length === 0) {
      count = 0;
    } else if (newText.match(/^\s*$/)) {
      count = 0;
    } else {
      newText = newText.replace(/\n/gi, " ");
      newText = newText.replace(/^[!@#$%^&*(),.?":{}|<>]*$/gi, "");
      newText = newText.replace(/\s+/, " ");
      newText = newText.replace(/[ ]{2,}/gi, " ");
      newText = newText.replace(/\n /, "\n");
      newText = newText.replace(/\n/gi, " ");

      count = newText.trim().split(" ").length;
    }
  };

  countWord();

  // return addCommas(count);
  return count;
};

export default WordCounter;
