import React, { useRef, useState, useContext, useEffect } from "react";
import HireExpertsContext from "../../context/HireExperts";
import TranslationContext from "../../context/Translation";
import { upload, uploaded, fileIcon } from "../../common/data/icons";
import "./hire-experts.css";
import { BUTTON_TYPES } from "../../common/data/button";
import { Intermediate } from "../../common/data/packages";
import Button from "../button";
import WordCounter from "../WordCounter";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CardIndexEmoji } from "../../common/emojis/Card-index.svg";

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
    setFirstVisit,
    setSelectedPackage,
    setHours,
  } = useContext(HireExpertsContext);

  const { inputTextWords } = useContext(TranslationContext);

  const navigate = useNavigate();

  const [wordsCount, setWordsCount] = useState(100);
  const [printErrorOne, setPrintErrorOne] = useState(null);
  const [printErrorTwo, setPrintErrorTwo] = useState(null);
  const [progressBarClassName, setProgressBarClassName] = useState(
    "progress-bar hidden"
  );

  useEffect(() => {
    const timer =
      printErrorTwo &&
      setTimeout(() => {
        setPrintErrorTwo(
          <span className="print-error inactive">
            *Or Upload A File To Proceed
          </span>
        );
        setPrintErrorOne(
          <span className="print-error inactive">
            *Input Some Text To Proceed
          </span>
        );
      }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [printErrorTwo]);

  const wrapperRef = useRef(null);

  const onDragEnter = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  const onDrop = () => {
    wrapperRef.current.classList.remove("dragover");

    setIsUploading(() => {
      return true;
    });
    setFile([]);
  };

  const onFileDrop = async (event) => {
    setProgressBarClassName("progress-bar show-animation");
    const newFile = await event.target.files[0];

    if (newFile) {
      setTimeout(() => {
        const updatedList = [newFile];
        setFile(updatedList);
        setProgressBarClassName("progress-bar hidden");
        setFirstVisit(true);
        setSelectedPackage(Intermediate);
        setHours(48);
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

  let words;

  if (file.length > 0) {
    words = WordCounter({ text: uploadedText });
  } else if (inputTextWords > 0) {
    words = inputTextWords;
  }

  const handleGetStartedButtonClick = () => {
    if (file.length > 0 || inputTextWords > 0) {
      setUploadedWordCount(words);
      if (words < 100) {
        setWordsCount(words);
      } else {
        onChange();
      }
    } else {
      setPrintErrorTwo(
        <span className="print-error active">*Or Upload A File To Proceed</span>
      );
      setPrintErrorOne(
        <span className="print-error active">*Input Some Text To Proceed</span>
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
    inputTextWords === 0 && file.length === 0
      ? "translation-selected non"
      : file.length > 0
      ? "translation-selected non"
      : "translation-selected";

  let translationText =
    inputTextWords === 0 && file.length === 0
      ? "Input Text For Translation"
      : file.length > 0 && inputTextWords > 0
      ? "Or Select Previous Translation"
      : "Translation Selected";

  const handleReset = () => {
    if (inputTextWords > 0) {
      setIsUploading(false);
      setFile([]);
      setFirstVisit(true);
      setSelectedPackage("Intermediate");
      setHours(48);
    } else if (file.length === 0) {
      navigate("/");
    }
  };

  return wordsCount >= 100 ? (
    <div className="select-file">
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className={translationClass} onClick={handleReset}>
        {fileIcon}
        {printErrorOne}
        <h1 className="select-files-h1">{translationText}</h1>
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
          {printErrorTwo}
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
      <div className="header-container">
        <h1 className="select-files-h3">Hmm!</h1>
        <CardIndexEmoji />
      </div>
      <h4 className="select-files-h4">
        Looks like
        {file.length > 0 || inputTextWords.length === 0
          ? ` your doc has only ${uploadedWordCount}`
          : ` you only have ${inputTextWords} `}
        words. We charge for a minimum of 100 words, would you be comfortable to
        proceed.
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
