function WordCounter({ text }) {
  let newText = text
    .split(" ")
    // eslint-disable-next-line array-callback-return
    .map((char) => {
      if (char.match(/[\w\u0080-\uFFFF]+/i)) {
        return char;
        /*[\w\u0080-\uFFFF] is a character class that matches any
        word character (as defined by \w) or any character in the
        range \u0080 to \uFFFF in Unicode. The range \u0080 to \uFFFF
        includes most of the characters in the Unicode
        Basic Multilingual Plane (BMP), which includes characters
        from many scripts and symbols. */
      }

      // if (char.match(/[a-z]/i)) {
      //   return char;
      // }
    })
    .join(" ");

  let count = 0;

  const countWord = () => {
    if (text.length === 0) {
      count = 0;
      //if contains only white spaces return zero
    } else if (newText.match(/^\s*$/)) {
      count = 0;
    } else {
      newText = newText.replace(/[^\p{L}\p{N}\s]/gu, ""); // remove all characters except letters, numbers, and whitespace
      newText = newText.replace(/[\s]+/g, " "); // replace multiple whitespaces with a single space
      // console.log(newText.trim().split(" "));
      count = newText.trim().split(" ").length;
    }
  };

  countWord();

  // return addCommas(count);
  return count;
}

export default WordCounter;
