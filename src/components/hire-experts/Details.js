import React, { useContext } from "react";
import HireExpertsContext from "../../context/HireExperts";
import TranslationContext from "../../context/Translation";
import "./details.css";
import Button from "../button";
import { BUTTON_TYPES } from "../../common/data/button";
import base from "../Apis/base";

const Details = ({ onChange }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    contactNumber,
    setContactNumber,
    countryState,
    setCountryState,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    file,
    uploadedText,
    uploadedWordCount,
    setAirtableRecordId,
  } = useContext(HireExpertsContext);

  const { inputText, inputTextWords } = useContext(TranslationContext);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    validateName(name);
    validateEmail(email);

    if (nameError === null && emailError === null) {
      let words;
      let text;
      if (file.length > 0) {
        words = uploadedWordCount;
        text = uploadedText;
      } else {
        words = inputTextWords;
        text = inputText;
      }

      const createRecord = async () => {
        const createdRecord = await base("Wordsack Database").create(
          {
            Name: name,
            Email: email,
            ContactNumber: contactNumber,
            StateName: countryState,
            Status: "Prospects",
            Text: text,
            WordCount: words,
          },
          function (err, record) {
            if (err) {
              console.error(err);
              return;
            }
            setAirtableRecordId(record.id);
          }
        );
      };

      createRecord();

      onChange();
    }
  };

  const validateName = (name) => {
    // Check that the name is not empty
    if (name.trim().length === 0) {
      setNameError("*Name is required");
    } else {
      // Check that the name contains only letters

      if (!nameRegex.test(name)) {
        setNameError("*Name can only contain letters");
      } else {
        setNameError(null);
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

  const handleChangeName = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);

    const value = e.target.value;

    // Check that the email is not empty
    if (value.trim().length === 0) {
      setEmailError("*Email is required");
    } else {
      setEmailError(false);
      if (emailRegex.test(email)) {
        setEmailError(null);
      }
    }
  };

  return (
    <>
      <div className="details">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              className="input"
              onChange={(e) => handleChangeName(e)}
              value={name}
              type="text"
              placeholder="Name"
            />
            {nameError && <p className="error-msg">{nameError}</p>}
          </div>

          <div className="input-field">
            <input
              className="input"
              onChange={(e) => handleChangeEmail(e)}
              value={email}
              type="email"
              placeholder="Email"
            />
            {emailError && <p className="error-msg">{emailError}</p>}
          </div>

          <div className="input-field">
            <input
              className="input"
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
              type="text"
              placeholder="Contact Number"
            />
          </div>

          <div className="input-field">
            <input
              className="input"
              onChange={(e) => setCountryState(e.target.value)}
              value={countryState}
              type="text"
              placeholder="State"
            />
          </div>

          <div className="details-to-payment-btns">
            <Button
              type={BUTTON_TYPES.PRIMARY}
              btnText={"Proceed to Estimate"}
              styles={"details-to-payment"}
              onButtonClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Details;
