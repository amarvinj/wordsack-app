import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HireExpertsContext from "../../context/HireExperts";
import Button from "../button";
import { BUTTON_TYPES } from "../../common/data/button";
import {
  arrowLeft,
  fileIcon,
  pen,
  wallet,
  checks,
} from "../../common/data/icons";
import "./hire-experts.css";
// import Link from "../Link";
import SelectFile from "./SelectFile";
import Details from "./Details";
import Payment from "./Payment";
import TitleBar from "./TitleBar";

function HireExperts() {
  const {
    page,
    setPage,
    previousPage,
    setPreviousPage,
    progressBarClassName,
    setProgressBarClassName,
  } = useContext(HireExpertsContext);

  const titleBarClassName = (pageNumber) => {
    if (pageNumber === page) {
      return "selected";
    } else if (pageNumber > page) {
      return "upcoming";
    } else if (pageNumber < page) {
      return "previous";
    }
  };

  const handleChangeOneToTwo = () => {
    setPreviousPage(page);
    setPage(2);
    setProgressBarClassName("title-bar-progress-bar forward-animation-2");
  };

  const handleChangeTwoToOne = () => {
    setPreviousPage(page);
    setPage(1);
    setProgressBarClassName("title-bar-progress-bar backward-animation-2");
  };

  const handleChangeTwoToThree = () => {
    setPreviousPage(page);
    setPage(3);
    setProgressBarClassName("title-bar-progress-bar forward-animation-3");
  };

  const handleChangeThreeToTwo = () => {
    setPreviousPage(page);
    setPage(2);
    setProgressBarClassName("title-bar-progress-bar backward-animation-3");
  };

  const handleChangeThreeToOne = () => {
    setPreviousPage(page);
    setPage(1);
    setProgressBarClassName("title-bar-progress-bar backward-animation-3-to-1");
  };

  const handleTitleBarClickToOne = (goTo) => {
    if (goTo < page) {
      if (page === 2) {
        handleChangeTwoToOne();
      } else if (page === 3) {
        handleChangeThreeToOne();
      }
    }
  };

  const handleTitleBarClickToTwo = (goTo) => {
    if (goTo < page) {
      setPage(goTo);
      handleChangeThreeToTwo();
    }
  };

  return (
    <>
      <motion.div
        className="hire-expert"
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
            className={titleBarClassName(1)}
            title={"Select File"}
            icon={fileIcon}
            onClick={handleTitleBarClickToOne}
            page={1}
          />
          <TitleBar
            className={titleBarClassName(2)}
            title={"Details"}
            icon={pen}
            onClick={handleTitleBarClickToTwo}
            page={2}
          />
          <TitleBar
            className={titleBarClassName(3)}
            title={"Payment"}
            icon={wallet}
            page={3}
          />
          <TitleBar
            className={titleBarClassName(4)}
            title={"Completed"}
            icon={checks}
            page={4}
          />

          <div className="title-bar-progress-bar-conrainer">
            <div className={progressBarClassName} />
          </div>
        </div>

        {page === 1 && (
          <div>
            <Link to="/">
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={"Back to Translator"}
                iconPos="LEFT"
                icon={arrowLeft}
              />
            </Link>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", duration: 5 }}
                exit={{ opacity: 0 }}
              >
                <SelectFile onChange={handleChangeOneToTwo} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {page === 2 && (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", duration: 5 }}
                exit={{ opacity: 0 }}
              >
                <Details onChange={handleChangeTwoToThree} />
              </motion.div>
            </AnimatePresence>
            <Button
              type={BUTTON_TYPES.SECONDARY}
              btnText={"Back to Files"}
              iconPos="LEFT"
              icon={arrowLeft}
              onButtonClick={handleChangeTwoToOne}
            />
          </div>
        )}

        {page === 3 && (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", duration: 5 }}
                exit={{ opacity: 0 }}
              >
                <Payment />
              </motion.div>
            </AnimatePresence>
            <Button
              type={BUTTON_TYPES.SECONDARY}
              btnText={"Back to Details"}
              iconPos="LEFT"
              icon={arrowLeft}
              onButtonClick={handleChangeThreeToTwo}
            />
          </div>
        )}
      </motion.div>
    </>
  );
}

export default HireExperts;
