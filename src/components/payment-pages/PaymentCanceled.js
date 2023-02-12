import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import { BUTTON_TYPES } from "../../common/data/button";
import Button from "../button";
import HireExpertsContext from "../../context/HireExperts";
import TitleBar from "../hire-experts/TitleBar";
import {
  arrowLeft,
  fileIcon,
  pen,
  wallet,
  checks,
  arrowRight,
  downloadFile,
  refresh,
  card,
  translateIcon,
} from "../../common/data/icons";
import "./payment-pages.css";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

function PaymentCanceled() {
  const { setPage, setPreviousPage, setProgressBarClassName } =
    useContext(HireExpertsContext);

  const navigate = useNavigate();

  const handleChangePayment = () => {
    setPage(3);
    setProgressBarClassName("title-bar-progress-bar progress-bar-3");
    navigate("/hire-experts");
  };

  const handleNothing = () => {
    //Do notghing && Just to avoid error on click
    //Uncaught TypeError: onClick is not a function
  };

  const handleChangeThreeToTwo = () => {
    setPreviousPage(3);
    setPage(2);
    setProgressBarClassName("title-bar-progress-bar backward-animation-3");
    navigate("/hire-experts");
  };

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
            className="selected"
            title={"Payment"}
            icon={wallet}
            page={3}
            onClick={handleNothing}
          />
          <TitleBar
            className="previous"
            title={"Completed"}
            icon={checks}
            page={4}
            onClick={handleNothing}
          />

          <div className="title-bar-progress-bar-conrainer">
            <div className="bar-progress cancel" />
          </div>
        </div>

        <div className="content">
          <h1 className="heading-title">
            Ayyo! Looks like the Payment failed.
          </h1>
          <p className="seconday-content">
            You just hit back & canceled the whole payment process. Please try
            again.
          </p>
        </div>

        <div className="sucess-btns">
          <Button
            type={BUTTON_TYPES.SECONDARY}
            btnText={"Change Payment Method"}
            styles={"translate-more"}
            icon={card}
            iconPos="LEFT"
            onButtonClick={handleChangePayment}
          />

          <Button
            type={BUTTON_TYPES.PRIMARY}
            btnText={"Try Again"}
            styles={"download-reciept"}
            icon={refresh}
            iconPos="RIGHT"
          />
        </div>

        <Button
          type={BUTTON_TYPES.SECONDARY}
          btnText={"Back to Details"}
          iconPos="LEFT"
          icon={arrowLeft}
          onButtonClick={handleChangeThreeToTwo}
        />
      </motion.div>
    </>
  );
}

export default PaymentCanceled;
