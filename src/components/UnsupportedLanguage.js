import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TranslationContext from "../context/Translation";
import "./unsupported-language.css";
import Button from "../components/button";
import { BUTTON_TYPES } from "../common/data/button";
import { ReactComponent as Logo } from "../wordsack.svg";
import { ReactComponent as AlembicEmoji } from "../common/emojis/Alembic.svg";

function UnsupportedLanguage() {
  const [emailError, setEmailError] = useState(false);

  const { emailData, setEmailData } = useContext(TranslationContext);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleInformMe = (event) => {
    event.preventDefault();

    validateEmail(emailData);

    if (emailError === null) {
      console.log("inform client when available");
    }
  };

  const handleChangeEmail = (e) => {
    setEmailData(e.target.value);

    const value = e.target.value;

    // Check that the email is not empty
    if (value.trim().length === 0) {
      setEmailError("*Email is required");
    } else {
      setEmailError(false);
      if (emailRegex.test(emailData)) {
        setEmailError(null);
      }
    }
  };

  const validateEmail = (email) => {
    // Check that the email is not empty
    if (email.trim().length === 0) {
      setEmailError("*Email is required");
    } else {
      // Check that the emaail is valid format

      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError(null);
      }
    }
  };

  return (
    <div className="unsupported-language">
      <div className="unsupported-language-container">
        <div className="header-container">
          <h3 className="unsupported-language-h3">Oops!</h3>
          <AlembicEmoji />
        </div>
        <h4 className="unsupported-language-h4">
          Oops! We don't have experts in those languages at the moment, although
          your requested has been notified. Additionally, you can share your
          email with us, so that we can let you know when we introduce your
          language pair.
        </h4>
        <div className="unsupported-language-input-field">
          <input
            className="unsupported-language-input"
            onChange={(e) => handleChangeEmail(e)}
            value={emailData}
            type="email"
            placeholder="Email"
          />
          {emailError && (
            <p className="unsupported-language-error-msg">{emailError}</p>
          )}
        </div>
        <div className="word-btns">
          <Link to={"/"}>
            <Button
              type={BUTTON_TYPES.SECONDARY}
              btnText={"Translate More"}
              styles={"okey"}
            />
          </Link>
          <Button
            type={BUTTON_TYPES.PRIMARY}
            btnText={"Inform Me"}
            onButtonClick={handleInformMe}
            styles={"add-more"}
          />
        </div>
      </div>

      {/* <Button
        type={BUTTON_TYPES.PRIMARY}
        btnText={"Hire Experts"}
        iconPos="LEFT"
      /> */}

      <Link to={"/"}>
        <Logo className="logo" />
      </Link>
    </div>
  );
}

export default UnsupportedLanguage;
