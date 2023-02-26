import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import Button from "../button";
import { BUTTON_TYPES } from "../../common/data/button";
import HireExpertsContext from "../../context/HireExperts";
import { arrowLeft } from "../../common/data/icons";
import { ReactComponent as HourglassEmoji } from "../../common/emojis/Hourglass-not-done.svg";
import "./track-your-order.css";

function TrackYourOrder() {
  const navigate = useNavigate();

  const { email, setEmail, setEmailError, trackingID, setTrackingID } =
    useContext(HireExpertsContext);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

  const handleChangeTrackingID = (e) => {
    setTrackingID(e.target.value);

    //add logic to validate tracking id
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/status");
    console.log("submited");
  };

  return (
    <>
      <motion.div
        className="track-order-page"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        exit={{ scale: 1.15, opacity: 0 }}
      >
        <div className="headerContainer">
          <h1 className="heading-title">Track Your Order</h1>
          <HourglassEmoji className="header-emoji" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              className="input"
              onChange={(e) => handleChangeTrackingID(e)}
              value={trackingID}
              type="text"
              placeholder="Tracking ID"
            />
            {/* {emailError && <p className="error-msg">{emailError}</p>} */}
          </div>
          <div className="input-field">
            <input
              className="input"
              onChange={(e) => handleChangeEmail(e)}
              value={email}
              type="email"
              placeholder="Email"
            />
            {/* {emailError && <p className="error-msg">{emailError}</p>} */}
          </div>

          <div className="order-satus-btns">
            <Button
              type={BUTTON_TYPES.PRIMARY}
              btnText={"Check Order Status"}
              styles={"order-satus"}
              onButtonClick={handleSubmit}
            />
          </div>
        </form>

        <Link to={"/"}>
          <Button
            type={BUTTON_TYPES.SECONDARY}
            btnText={"Back to Translator"}
            iconPos="LEFT"
            icon={arrowLeft}
          />
        </Link>
      </motion.div>
    </>
  );
}

export default TrackYourOrder;
