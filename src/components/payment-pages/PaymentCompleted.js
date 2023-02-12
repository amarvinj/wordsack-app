import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./payment-pages.css";
import Confetti from "../Confetti";
import TitleBar from "../hire-experts/TitleBar";
import TranslationContext from "../../context/Translation";
import HireExpertsContext from "../../context/HireExperts";
import {
  arrowLeft,
  fileIcon,
  pen,
  wallet,
  checks,
  arrowRight,
  downloadFile,
  translateIcon,
} from "../../common/data/icons";
import { BUTTON_TYPES } from "../../common/data/button";
import Button from "../button";
import { star } from "../../common/data/icons";

function PaymentCompleted() {
  const { inputLanguage, outputLanguage, inputTextWords } =
    useContext(TranslationContext);

  const { file, hours, selectedPackage, uploadedWordCount } =
    useContext(HireExpertsContext);

  const [hoverIndex, setHoverIndex] = useState(5);
  const [rating, setRating] = useState(5);
  const [animateConfetti, setAnimateConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateConfetti(true);
    }, 0);
  }, []);

  let words = 0;

  if (file.length > 0) {
    words = uploadedWordCount;
  } else {
    words = inputTextWords;
  }

  const handleNothing = () => {
    //Do notghing && Just to avoid error on click
    //Uncaught TypeError: onClick is not a function
  };

  const handleChange = () => {};
  return (
    <>
      <motion.div
        className="payment-pages"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        exit={{ scale: 1.15, opacity: 0 }}
      >
        <div className="title-bar">
          <TitleBar
            className="previous"
            title={"Select File"}
            icon={fileIcon}
            onClick={handleNothing}
            page={1}
          />
          <TitleBar
            className="previous"
            title={"Details"}
            icon={pen}
            onClick={handleNothing}
            page={2}
          />
          <TitleBar
            className="previous"
            title={"Payment"}
            icon={wallet}
            page={3}
            onClick={handleNothing}
          />
          <TitleBar
            className="selected"
            title={"Completed"}
            icon={checks}
            page={4}
            onClick={handleNothing}
          />

          <div className="title-bar-progress-bar-container">
            <div className="bar-progress complete" />
          </div>
        </div>

        <div className="content">
          <h1 className="heading-title">Awesome</h1>
          <p className="seconday-content">
            We've received your payment and the translation is being processed.
          </p>

          <div className="container-frame">
            <div className="language-container">
              <div className="language">{inputLanguage.label}</div>
              {translateIcon}
              <div className="language">{outputLanguage.label}</div>
            </div>
            <div className="details-container">
              <div className="details">
                <div className="data">Words</div>
                <div className="pack">{words}</div>
              </div>
              <div className="details">
                <div className="data">Time</div>
                <div className="pack">{hours}hrs</div>
              </div>
              <div className="details">
                <div className="data">Plan</div>
                <div className="pack">{selectedPackage}</div>
              </div>
              <div className="details">
                <div className="data">ID</div>
                <div className="pack">6746526722</div>
              </div>
            </div>
          </div>

          <div className="rating-container">
            <p className="rate-experience">Rate your Experience</p>
            <ul className="star-list">
              {[1, 2, 3, 4, 5].map((index) => {
                let purple =
                  index <= hoverIndex ||
                  (hoverIndex >= rating && index <= rating);

                return (
                  // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <li
                    className={purple ? "star-list-items" : ""}
                    key={index}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() =>
                      setHoverIndex(() => {
                        return rating;
                      })
                    }
                  >
                    {" "}
                    {star}{" "}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sucess-btns">
            <Link to={"/"}>
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={"Track Your Order"}
                styles={"translate-more"}
                icon={arrowRight}
                iconPos="RIGHT"
              />
            </Link>
            <Button
              type={BUTTON_TYPES.PRIMARY}
              btnText={"Download Reciept"}
              styles={"download-reciept"}
              icon={downloadFile}
              iconPos="RIGHT"
            />
          </div>
        </div>

        <div className="confetti">{animateConfetti && <Confetti />}</div>

        <Link to={"/"}>
          <Button
            type={BUTTON_TYPES.SECONDARY}
            btnText={"Back to Translator"}
            iconPos="LEFT"
            icon={arrowLeft}
            onButtonClick={handleChange}
          />
        </Link>
      </motion.div>
    </>
  );
}

export default PaymentCompleted;
