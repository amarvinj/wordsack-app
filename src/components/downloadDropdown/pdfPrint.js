import React, { useRef } from "react";
import Pdf from "react-to-pdf";

const PdfPrint = (inputLanguage, outputLanguage, translated) => {
  const componentRef = useRef();

  return (
    <>
      <Pdf targetRef={componentRef} filename="code-example.pdf" />
      <div ref={componentRef}>
        <h1>
          {inputLanguage}-to-{outputLanguage}
        </h1>
        <h2>{translated}</h2>
      </div>
    </>
  );
};

export default PdfPrint;
