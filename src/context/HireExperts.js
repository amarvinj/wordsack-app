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
  const [country, setCountry] = useState("in");
  const [countryState, setCountryState] = useState("");

  const [isValidNumber, setIsValidNumber] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [stateError, setStateError] = useState(false);

  const [airtableRecordId, setAirtableRecordId] = useState("");
  const [page, setPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [progressBarClassName, setProgressBarClassName] = useState(
    "title-bar-progress-bar"
  );
  const [price, setPrice] = useState(0);
  const [hours, setHours] = useState(48);
  const [selectedPackage, setSelectedPackage] = useState("Intermediate");
  const [firstVisit, setFirstVisit] = useState(true);
  const [stripeError, setStripeError] = useState(null);
  const [status, setStatus] = useState(4);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [trackingID, setTrackingID] = useState("");

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
        country,
        setCountry,
        contactNumber,
        setContactNumber,
        countryState,
        setCountryState,
        isValidNumber,
        setIsValidNumber,
        nameError,
        setNameError,
        emailError,
        setEmailError,
        phoneError,
        setPhoneError,
        stateError,
        setStateError,
        airtableRecordId,
        setAirtableRecordId,
        page,
        setPage,
        previousPage,
        setPreviousPage,
        progressBarClassName,
        setProgressBarClassName,
        price,
        setPrice,
        hours,
        setHours,
        selectedPackage,
        setSelectedPackage,
        firstVisit,
        setFirstVisit,
        stripeError,
        setStripeError,
        status,
        setStatus,
        trackingID,
        setTrackingID,
      }}
    >
      {children}
    </HireExpertsContext.Provider>
  );
}

export { HireExpertsProvider };
export default HireExpertsContext;
