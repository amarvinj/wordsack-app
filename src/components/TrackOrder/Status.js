import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "../button";
import { BUTTON_TYPES } from "../../common/data/button";
import HireExpertsContext from "../../context/HireExperts";
import { arrowLeft } from "../../common/data/icons";
import { ReactComponent as CheckMarkEmoji } from "../../common/emojis/Check-mark-button.svg";
import "./track-your-order.css";

function Status() {
  const { status, setStatus } = useContext(HireExpertsContext);

  const [statusAnim, setStatusAnim] = useState(0);

  return (
    <>
      <motion.div
        className="status-page"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        exit={{ scale: 1.15, opacity: 0 }}
      >
        <div className="headerContainerTwo">
          <h1 className="heading-title">Your translation request</h1>
          <div className="Containertwo">
            <h1 className="heading-title">is being processed.</h1>
            <CheckMarkEmoji className="header-emoji" />
          </div>

          <div className="status-content">
            <AnimatePresence mode="wait">
              {status >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", duration: 5 }}
                  className="status-item"
                >
                  <div className="item-index">1</div>
                  <p>We're assigning a translator for your job.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {status >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{ type: "spring", duration: 5, delay: 1 }}
                  className="status-item"
                >
                  <div className="item-index">2</div>
                  <p>
                    Your job has been assigned to a translator, they're working
                    on it.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {status >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", duration: 5, delay: 2 }}
                  className="status-item"
                >
                  <div className="item-index">3</div>
                  <p>
                    Your job has been completed and has been sent to quality
                    control for verification.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {status >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", duration: 5, delay: 3 }}
                  className="status-item"
                >
                  <div className="item-index">4</div>
                  <p>Yay! We've sent the translated document over email.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-satus-btns">
            <Link to={"/"}>
              <Button
                type={BUTTON_TYPES.PRIMARY}
                btnText={"Okay"}
                styles={"order-satus"}
              />
            </Link>
          </div>
        </div>

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

export default Status;
