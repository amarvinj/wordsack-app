import React, { useContext, useState, useEffect } from "react";
import "./payment.css";
import HireExpertsContext from "../../context/HireExperts";
import TranslationContext from "../../context/Translation";
import Button from "../button";
import { BUTTON_TYPES } from "../../common/data/button";
import { plus, minus } from "../../common/data/icons";
import airtableBase from "../Apis/base";
import AddCommas from "../AddCommas";

const Payment = () => {
  const { uploadedWordCount, name } = useContext(HireExpertsContext);
  const { inputLanguage, outputLanguage } = useContext(TranslationContext);
  const [animate1, setAnimate1] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [animate3, setAnimate3] = useState(false);
  const [hours, setHours] = useState(48);
  const [limitAnimation, setLimitAnimation] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Professional");

  const span = (
    <span className="payment-span">{AddCommas(uploadedWordCount)} words</span>
  );

  useEffect(() => {
    setTimeout(() => {
      if (limitAnimation) {
        setLimitAnimation(false);
      }
    }, 500);

    return () => {
      clearTimeout();
    };
  }, [limitAnimation]);

  const handlePackage = (selected) => {
    setSelectedPackage(selected);
    if (animate1 === true) {
      setAnimate1(false);
    } else if (animate2 === true) {
      setAnimate2(false);
    } else if (animate3 === true) {
      setAnimate3(false);
    }
  };

  const handleAddHours = () => {
    if (hours === 96) {
      console.log("cant add any more");
      setLimitAnimation(true);
    } else {
      setHours(hours + 24);
      setLimitAnimation(false);
    }
  };

  const handleMinusHours = () => {
    if (hours <= 24) {
      setLimitAnimation(true);
    } else {
      setHours(hours - 24);
    }
  };

  return (
    <>
      <div className="payment">
        <h1 className="payment-h1">Hello {name}</h1>

        <h2 className="payment-h2">
          Our writers are excited to translate your {span} of{" "}
          {inputLanguage.label} to {outputLanguage.label}. Choose your style and
          timeline right away.
        </h2>

        <div className={`days ${limitAnimation && "limit-animation"}`}>
          <Button
            type={BUTTON_TYPES.SECONDARY}
            icon={minus}
            iconPos="LEFT"
            styles={"daysBtn"}
            onButtonClick={handleMinusHours}
          />
          <h1 className="delivery-in">Delivery in {hours}Hrs</h1>

          <Button
            type={BUTTON_TYPES.SECONDARY}
            icon={plus}
            iconPos="LEFT"
            styles={"daysBtn"}
            onButtonClick={handleAddHours}
          />
        </div>

        <div className="proceed-to-payment">
          <Button
            type={BUTTON_TYPES.PRIMARY}
            btnText={"Proceed to Payment"}
            styles={"proceed-to-payment"}
          />
        </div>

        <div className="box">
          <div className="package-buttons-container">
            <div
              className="button-container"
              onMouseEnter={() => setAnimate1(true)}
              onMouseLeave={() => setAnimate1(false)}
            >
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={"Intermediate"}
                iconPos="LEFT"
                onButtonClick={() => handlePackage("Intermediate")}
                styles={
                  selectedPackage === "Intermediate"
                    ? "packageBtn selected-package"
                    : "packageBtn"
                }
              />
              <div
                className={`payment-details ${
                  animate1 ? "active" : "inactive"
                }`}
              >
                Automatic translation offers nearly 70% accuracy, whereas in our
                Intermediate plan, we use human translators to convert it right,
                increasing the accuracy upto 99%.
              </div>
            </div>

            <div
              className="button-container"
              onMouseEnter={() => setAnimate2(true)}
              onMouseLeave={() => setAnimate2(false)}
            >
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={"Professional"}
                iconPos="LEFT"
                onButtonClick={() => handlePackage("Professional")}
                styles={
                  selectedPackage === "Professional"
                    ? "packageBtn selected-package"
                    : "packageBtn"
                }
              />
              <div
                className={`payment-details professional ${
                  animate2 ? "active" : "inactive"
                }`}
              >
                Best suitable for corporate websites, business documents and
                anything business except legal.
              </div>
            </div>

            <div
              className="button-container"
              onMouseEnter={() => setAnimate3(true)}
              onMouseLeave={() => setAnimate3(false)}
            >
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={"Creative"}
                iconPos="LEFT"
                onButtonClick={() => handlePackage("Creative")}
                styles={
                  selectedPackage === "Creative"
                    ? "packageBtn selected-package"
                    : "packageBtn"
                }
              />
              <div
                className={`payment-details creative ${
                  animate3 ? "active" : "inactive"
                }`}
              >
                Best suitable for creative modern websites and brochures meant
                to attract young customers.
              </div>
            </div>
          </div>
          <h1 className="price">₹{"17,250"}</h1>
        </div>
      </div>
    </>
  );
};

export default Payment;
