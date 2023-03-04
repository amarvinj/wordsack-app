import React, { useContext, useState, useEffect, useRef } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State } from "country-state-city";

import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";

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
    country,
    setCountry,
    countryState,
    setCountryState,
    isValidNumber,
    setIsValidNumber,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    phoneError,
    setPhoneError,
    stateError,
    setStateError,
    file,
    uploadedText,
    uploadedWordCount,
    setAirtableRecordId,
  } = useContext(HireExpertsContext);

  const { inputText, inputTextWords } = useContext(TranslationContext);

  const [selected, setSelected] = useState(false);
  const [stateData, setStateData] = useState();
  const [showList, setShowList] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const ref = useRef();

  useEffect(() => {
    const possibleNumber =
      contactNumber &&
      isPossiblePhoneNumber(contactNumber, country.toUpperCase());

    const validNumber =
      contactNumber && isValidPhoneNumber(contactNumber, country.toUpperCase());

    setIsValidNumber(possibleNumber && validNumber);

    contactNumber.length >= 3 &&
      phoneError &&
      (validNumber ? setPhoneError(null) : validatePhone(contactNumber));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, contactNumber, setIsValidNumber, phoneError, setPhoneError]);

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country.toUpperCase()));
  }, [country]);

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setShowList(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  //this is to handle a bug, ie: dropdown close not woking properly
  useEffect(() => {
    showList && setShowList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryState]);

  useEffect(() => {
    if (showList) {
      setSearchWord("");
    } else {
      countryState && setSearchWord(countryState.name);
    }
  }, [countryState, showList]);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    validateName(name);
    validateEmail(email);
    validatePhone(contactNumber);
    validateState(countryState);

    if (
      nameError === null &&
      emailError === null &&
      phoneError === null &&
      stateError === null
    ) {
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
            ContactNumber: `+${contactNumber}`,
            StateName: countryState.name,
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
        setEmailError("*Invalid email address");
      } else {
        setEmailError(null);
      }
    }
  };

  const validatePhone = (phone) => {
    // Check that the phone number is not empty
    if (phone.trim().length === 0) {
      setPhoneError("*Contact Number is required");
    } else {
      // check that the email is vaild format

      if (!isValidNumber) {
        setPhoneError("*Invalid Contact Number");
      } else {
        setPhoneError(null);
      }
    }
  };

  const validateState = (stateName) => {
    stateName && console.log(stateName.name);
    if (!stateName) {
      setStateError("*State is required");
      console.log("hi there is error");
    } else {
      setStateError(null);
      console.log("No error");
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

  const handleNumberChange = (value, { countryCode }) => {
    setContactNumber(value);
    setCountry(countryCode);
  };

  const handleChangeSearchWord = (e) => {
    setSearchWord(e.target.value);
  };

  const handleStateSelection = (option) => {
    setShowList(false);
    setSearchWord(option.name);
    setCountryState(option);
    validateState(option);
  };

  return (
    <>
      <div className="details">
        <form className="details" onSubmit={handleSubmit}>
          <div className="details-to-payment-btns">
            <Button
              type={BUTTON_TYPES.PRIMARY}
              btnText={"Proceed to Estimate"}
              styles={"details-to-payment"}
              onButtonClick={handleSubmit}
            />
          </div>

          <div className="input-container">
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
              <ReactPhoneInput
                containerStyle={{ marginTop: "6.4%" }}
                searchStyle={{ width: "95%" }}
                inputStyle={{
                  border: `2px solid ${
                    selected ? "#731BE3" : "rgba(218, 218, 218, 0.4)"
                  }`,
                  fontFamily: "Avenir Next",
                  fontStyle: "normal",
                  fontSize: "20px",

                  width: "560px",
                  height: "68px",
                }}
                buttonStyle={{
                  border: `2px solid ${
                    selected ? "#731BE3" : "rgba(218, 218, 218, 0.4)"
                  }`,
                  // width: "80px",
                }}
                // dropdownStyle={{ color: "#731BE3" }}
                placeholder="Contact Number"
                // containerClass="number-container"
                enableSearch
                disableSearchIcon
                searchClass="search-class"
                value={contactNumber}
                country={country}
                onChange={handleNumberChange}
                onClick={() => setSelected(true)}
                onBlur={() => setSelected(false)}
              />
              {phoneError && <p className="error-msg">{phoneError}</p>}
            </div>

            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className="input-field"
              ref={ref}
              onClick={() => setShowList(true)}
            >
              <input
                className="input"
                onChange={(e) => handleChangeSearchWord(e)}
                value={searchWord}
                type="text"
                placeholder="State"
              />
              {showList && (
                <div className="state-list">
                  {stateData.length > 0 && searchWord === ""
                    ? stateData.map((data) => {
                        return (
                          // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                          <div
                            key={data.isoCode}
                            className="state-list-option"
                            onClick={() => handleStateSelection(data)}
                          >
                            {data.name}
                          </div>
                        );
                      })
                    : stateData
                        .filter((data) => {
                          const searchTerm = searchWord.toLocaleLowerCase();
                          const searchList = data.name.toLocaleLowerCase();

                          return searchList.startsWith(searchTerm);
                        })
                        .map((data) => {
                          return (
                            // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                            <div
                              key={data.isoCode}
                              className="state-list-option"
                              onClick={() => handleStateSelection(data)}
                            >
                              {data.name}
                            </div>
                          );
                        })}
                </div>
              )}
              {stateError && !showList && (
                <p className="error-msg">{stateError}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Details;
