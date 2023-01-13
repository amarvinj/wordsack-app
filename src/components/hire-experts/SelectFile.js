import React, { useRef, useState, useContext, useEffect } from "react";
import HireExpertsContext from "../../context/HireExperts";
import { upload, uploaded, fileIcon } from "../../common/data/icons";
import "./hire-experts.css";
import { BUTTON_TYPES } from "../../common/data/button";
import Button from "../button";
import WordCounter from "../WordCounter";

function SelectFile({ onChange }) {
  const {
    file,
    setFile,
    isUploading,
    setIsUploading,
    uploadedText,
    setUploadedText,
    uploadedWordCount,
    setUploadedWordCount,
  } = useContext(HireExpertsContext);

  const [wordsCount, setWordsCount] = useState(100);
  const [printError, setPrintError] = useState(null);
  const [progressBarClassName, setProgressBarClassName] =
    useState("progress-bar");

  useEffect(() => {
    const timer =
      printError &&
      setTimeout(() => {
        setPrintError(
          <span className="print-error inactive">
            *Upload A File To Proceed
          </span>
        );
      }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [printError]);

  const wrapperRef = useRef(null);

  const onDragEnter = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  const onDrop = () => {
    wrapperRef.current.classList.remove("dragover");

    setIsUploading(true);
    setFile([]);
  };

  const onFileDrop = async (event) => {
    setProgressBarClassName("progress-bar show-animation");
    const newFile = await event.target.files[0];

    if (newFile) {
      setTimeout(() => {
        const updatedList = [...file, newFile];
        console.log(updatedList);
        setFile(updatedList);
        setProgressBarClassName("progress-bar hidden");
      }, 1000);
    }
  };

  let fileName;

  if (file.length > 0) {
    fileName = file[file.length - 1].name;
    const finalData = async () => {
      const final = await file[file.length - 1].text();
      setUploadedText(final);
    };
    finalData();
  }

  const words = WordCounter({ text: uploadedText });

  const handleGetStartedButtonClick = () => {
    if (file.length > 0) {
      setUploadedWordCount(words);
      if (words < 100) {
        setWordsCount(words);
      } else {
        onChange();
        console.log("Go go next page");
      }
    } else {
      console.log("Show the eroor");
      setPrintError(
        <span className="print-error active">*Upload A File To Proceed</span>
      );
    }
  };

  // printError &&
  //   setTimeout(() => {
  //     setPrintError(
  //       <span className="print-error inactive">*Upload A File To Proceed</span>
  //     );
  //   }, 2000);

  const handleAddMore = () => {
    setWordsCount(100);
  };

  const handleOkey = () => {
    onChange();
    console.log("Go go next page");
  };

  const uploadAreaSubText =
    file.length === 0 ? (
      !isUploading ? (
        <h2 className="select-files-h2">Drag & Drop your file</h2>
      ) : (
        <h2 className="select-files-h2">
          Analysing the words, give us a moment.
        </h2>
      )
    ) : (
      <h2 className="select-files-h2">{words} Words Scanned</h2>
    );

  const uploadAreaMainText =
    file.length === 0 ? (
      !isUploading ? (
        <h1 className="select-files-h1">Or Upload Your File</h1>
      ) : (
        <h1 className="select-files-h1">Scanning Your File..</h1>
      )
    ) : (
      <h1 className="select-files-h1">Your File {fileName} selected</h1>
    );

  const uploadAreaClassName =
    file.length === 0 ? "file-upload" : "file-uploaded";

  const translationClass =
    file.length > 0 ? "translation-selected non" : "translation-selected";

  return wordsCount >= 100 ? (
    <div className="select-file">
      <div className={translationClass}>
        {fileIcon}
        <h1 className="select-files-h1">Translation Selected</h1>
      </div>

      <div className="upload-area">
        <div
          ref={wrapperRef}
          className={uploadAreaClassName}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="file-upload-label">
            {!isUploading ? upload : uploaded}

            {uploadAreaMainText}

            {uploadAreaSubText}
          </div>
          <input type="file" value="" onChange={onFileDrop} />
          {printError}
          <div className="progress-bar-container">
            <div className="container">
              <div className={progressBarClassName} />
            </div>
          </div>
        </div>
      </div>

      <Button
        type={BUTTON_TYPES.PRIMARY}
        btnText={"Get Started"}
        styles={"GetStarted"}
        onButtonClick={handleGetStartedButtonClick}
      />
      <Button
        type={BUTTON_TYPES.TERTIARY}
        btnText={"Got bulks words to translate? Contact our support chat."}
        styles={"contact"}
      />
    </div>
  ) : (
    <div className="less-count">
      <h3 className="select-files-h3">Hmm!</h3>
      <h4 className="select-files-h4">
        Looks like your doc has only {uploadedWordCount} words. We charge for a
        minimum of 100 words, would you be comfortable to proceed.
      </h4>
      <div className="word-btns">
        <Button
          type={BUTTON_TYPES.SECONDARY}
          btnText={"Yes, I'm okay"}
          onButtonClick={handleOkey}
          styles={"okey"}
        />
        <Button
          type={BUTTON_TYPES.PRIMARY}
          btnText={"No, I'll add more"}
          onButtonClick={handleAddMore}
          styles={"add-more"}
        />
      </div>
    </div>
  );
}

export default SelectFile;
