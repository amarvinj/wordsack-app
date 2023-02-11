import React, { useState, useRef, useContext } from "react";
import TranslationContext from "../../context/Translation";
import { download, document } from "../../common/data/icons";
import DropdownItem from "./DropdownItem";
import PdfDownload from "../fileDownload/PdfDownload";

const DownloadDropdown = () => {
  const { inputLanguage, outputLanguage, translated } =
    useContext(TranslationContext);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  //className for document download dropdown
  const docDropdownMenu = `dropdown-menu ${isOpen ? "active" : "inactive"}`;

  //className for document download button
  const docDropdownMenuBtn = `download-button ${
    isOpen ? "active" : "inactive"
  }`;

  const handlePdfDownload = () => {
    // setIsOpen(false);
    // PdfDownload();
    console.log(isOpen, "PDF Download was Clicked");
  };

  const handleDocxDownload = () => {
    // setIsOpen(false);
    console.log(isOpen, "DOCX Download was Clicked");
  };

  return (
    <div className="menu-container">
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        ref={ref}
        className={docDropdownMenuBtn}
        onClick={() => setIsOpen(!isOpen)}
      >
        {download}
      </div>

      <div className={docDropdownMenu}>
        <ul>
          <DropdownItem
            icon={document}
            btnName={"PDF"}
            setIsOpen={setIsOpen}
            handleClick={handlePdfDownload}
            myref={ref}
          />
          <DropdownItem
            icon={document}
            btnName={"Docx"}
            setIsOpen={setIsOpen}
            handleClick={handleDocxDownload}
            myref={ref}
          />
        </ul>
      </div>
    </div>
  );
};

export default DownloadDropdown;
