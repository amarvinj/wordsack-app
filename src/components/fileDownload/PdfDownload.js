import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TranslationContext from "../../context/Translation";

const PdfDownload = () => {
  const { inputLanguage, outputLanguage, translated } =
    useContext(TranslationContext);

  const componentRef = useRef();

  const handlePdfPrint = useReactToPrint({
    content: () => (
      <div style={{ width: "100%", height: window.innerHeight }}>
        <h1>
          <strong>{inputLanguage}</strong> to <strong>{outputLanguage}</strong>{" "}
          Translation
        </h1>
      </div>
    ),
    documentTitle: `${inputLanguage}-to-${outputLanguage}`,
    onAfterPrint: () => alert("Download Successful"),
  });

  console.log("download pdf page");

  //   return (
  //     <>
  //       <div
  //         ref={componentRef}
  //         style={{ width: "100%", height: window.innerHeight }}
  //       >
  //         <h1>
  //           <strong>{inputLanguage}</strong> to <strong>{outputLanguage}</strong>{" "}
  //           Translation
  //         </h1>
  //       </div>
  //     </>
  //   );
};

export default PdfDownload;
