import { createContext, useState } from "react";

const HireExpertsContext = createContext();

function HireExpertsProvider({ children }) {
  const [file, setFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedText, setUploadedText] = useState("");
  const [uploadedWordCount, setUploadedWordCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryState, setCountryState] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [airtableRecordId, setAirtableRecordId] = useState("");

  return (
    <HireExpertsContext.Provider
      value={{
        file,
        setFile,
        isUploading,
        setIsUploading,
        uploadedText,
        setUploadedText,
        uploadedWordCount,
        setUploadedWordCount,
        name,
        setName,
        email,
        setEmail,
        contactNumber,
        setContactNumber,
        countryState,
        setCountryState,
        nameError,
        setNameError,
        emailError,
        setEmailError,
        airtableRecordId,
        setAirtableRecordId,
      }}
    >
      {children}
    </HireExpertsContext.Provider>
  );
}

export { HireExpertsProvider };
export default HireExpertsContext;
