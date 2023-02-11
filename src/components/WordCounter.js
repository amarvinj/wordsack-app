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
      newText = newText.replace(/[!@#$%^&*(),.?":{}|<>]\n/gi, "\n");
      /*replaces all occurrences of a special character (specified
        within the square brackets) followed by a line break in the
        string with just a line break. */
      newText = newText.replace(/\n/gi, " ");
      /*Replaces all line breaks ("\n") in the string
      with a single space character. The "gi" flags stand for "global"
      and "case-insensitive". */
      newText = newText.replace(/^[!@#$%^&*(),.?":{}|<>]*$/gi, " ");
      /* Removes all special characters (symbols specified within the
      square brackets) from the start and end of the  string. */
      newText = newText.replace(/[ ]{2,}/gi, " ");
      /*Replaces all sequences of 2 or more space characters within
      the string with a single space character. */
      newText = newText.replace(/\n /, "\n");
      /*Replaces line breaks with a single space character at the
      end of each line in the "newText" string. */
      newText = newText.replace(/\n/gi, " ");
      /*Replaces all line breaks within the string with a single
      space character.*/
      newText = newText.replace(/\s+/, " ");
      /* Replaces multiple spaces within the string with a
      single space character. */
      // console.log(newText.trim().split(" "));
      count = newText.trim().split(" ").length;
    }
  };

  countWord();

  // return addCommas(count);
  return count;
}

export default WordCounter;
