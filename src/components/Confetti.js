import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

import "./payment-pages/payment-pages.css";

function Confetti() {
  return (
    <div className="confetti">
      <ConfettiExplosion
        force={1}
        duration={5000}
        particleCount={500}
        width={window.innerWidth}
        colors={["#731BE3", "#eabfff", "#800080", "#d580ff", "#ffffff"]}
      />
    </div>
  );
}

export default Confetti;
