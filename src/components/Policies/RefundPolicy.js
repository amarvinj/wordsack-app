import React, { useContext } from "react";
import HireExpertsContext from "../../context/HireExperts";
import "./policies.css";
import Button from "../button";
import { arrowLeft } from "../../common/data/icons";
import { BUTTON_TYPES } from "../../common/data/button";
import { Link } from "react-router-dom";

function RefundPolicy() {
  const { setPreviousPage, setPage, setProgressBarClassName } =
    useContext(HireExpertsContext);

  const handleClick = () => {
    setPreviousPage(3);
    setPage(3);
    setProgressBarClassName("progress-bar-3");
  };

  return (
    <>
      <div>
        <Link to="/hire-experts">
          <Button
            type={BUTTON_TYPES.SECONDARY}
            btnText={"Back"}
            iconPos="LEFT"
            icon={arrowLeft}
            onButtonClick={handleClick}
          />
        </Link>
      </div>
      <div className="policy">
        <h1 className="policy-heading">Refund Policy</h1>
        <div className="policy-content">
          Before you head into our legal auto-generated privacy policy, we’d
          like to tell you something from the bottom of our hearts.
          <br />
          <br />
          We respect your privacy. <br />
          <br />
          Our customers and translators are the backbone of our business.
          Ensuring utmost privacy is nothing but our promise. As a part of our
          privacy policies, our operations team do not read your content,
          whereas the translation team will not know who the customer is and
          other contact informations.
          <br />
          <br /> We don’t keep a copy of your content on our cloud for more 7
          days, while also maintaining a clean cookie policy which is used to
          help you continue where you left off.
          <br /> We don’t sell your data or documents.We may use collective data
          (not individual data) to understand our customer experience and user
          journey in order to improve our customer experience.
          <br />
          <br /> Now, towards the legal privacy policy which no one ever reads.
        </div>
        <div className="policy-btn-container">
          <Link to={"/terms-&-conditions"}>
            <Button
              type={BUTTON_TYPES.TERTIARY}
              btnText={"Terms & Conditions"}
              styles={"policy-btn unselected"}
            />
          </Link>

          <Link to={"/privacy-policy"}>
            <Button
              type={BUTTON_TYPES.TERTIARY}
              btnText={"Privacy Policy"}
              styles={"policy-btn unselected"}
            />
          </Link>

          <Link to={"/refund-policy"}>
            <Button
              type={BUTTON_TYPES.TERTIARY}
              btnText={"Refund Policy"}
              styles={"policy-btn"}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default RefundPolicy;
