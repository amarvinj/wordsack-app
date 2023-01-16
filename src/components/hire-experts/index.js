import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { ReactComponent as Logo } from "../../wordsack.svg";

function HireExperts() {
  const [page, setPage] = useState(3);
  const [previousPage, setPreviousPage] = useState(0);
  const [progressBarClassName, setProgressBarClassName] = useState(
    "title-bar-progress-bar"
  );

  const titleBarClassName = (pageNumber) => {
    if (pageNumber === page) {
      return "selected";
    } else if (pageNumber > page) {
      return "upcoming";
    } else if (pageNumber < page) {
      return "previous";
    }
  };

  console.log(previousPage);

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
      <div className="hire-expert">
        <Link to={"/"}>
          <Logo className="logo" />
        </Link>
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
          />
          <TitleBar
            className={titleBarClassName(4)}
            title={"Completed"}
            icon={checks}
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

            <SelectFile onChange={handleChangeOneToTwo} />
          </div>
        )}
        {page === 2 && (
          <div>
            <Details onChange={handleChangeTwoToThree} />
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
            <Payment />
            <Button
              type={BUTTON_TYPES.SECONDARY}
              btnText={"Back to Details"}
              iconPos="LEFT"
              icon={arrowLeft}
              onButtonClick={handleChangeThreeToTwo}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default HireExperts;
