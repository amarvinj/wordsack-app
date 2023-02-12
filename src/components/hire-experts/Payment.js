import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import "./payment.css";
import HireExpertsContext from "../../context/HireExperts";
import TranslationContext from "../../context/Translation";
import Button from "../button";
import { BUTTON_TYPES } from "../../common/data/button";
import { plus, minus } from "../../common/data/icons";
import AddCommas from "../AddCommas";
import { Link } from "react-router-dom";
import {
  Intermediate,
  Professional,
  Creative,
} from "../../common/data/packages";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const Payment = () => {
  const {
    uploadedWordCount,
    name,
    email,
    file,
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
  } = useContext(HireExpertsContext);
  const { inputLanguage, outputLanguage, inputTextWords } =
    useContext(TranslationContext);

  let words = 0;

  if (file.length > 0) {
    words = uploadedWordCount;
  } else {
    words = inputTextWords;
  }

  useEffect(() => {
    if (firstVisit) {
      if (words < 100) {
        setPrice(600);
      } else {
        setPrice(6 * words);
      }
      setFirstVisit(false);
    }
  }, [setPrice, words, firstVisit, setFirstVisit]);

  // const [price, setPrice] = useState(6 * words);
  const [animate1, setAnimate1] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [animate3, setAnimate3] = useState(false);
  const [limitAnimation, setLimitAnimation] = useState(false);

  const [stripeIsLoading, setStripeIsLoading] = useState(false);

  const span = <span className="payment-span">{AddCommas(words)} words</span>;

  useEffect(() => {
    setTimeout(() => {
      if (limitAnimation) {
        setLimitAnimation(false);
      }
    }, 500);

    return () => {
      clearTimeout();
    };
  }, [limitAnimation]);

  const navigate = useNavigate();

  let priceQuantity = Math.round(price / 6);
  // const priceQuantity = 1;

  const item = {
    price: "price_1MaJ7rSI9szKvgIP7ypfOL8b",
    quantity: priceQuantity,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
    customerEmail: email,
  };

  const redirectToCheckout = async () => {
    setStripeIsLoading(true);
    console.log("Redirect to checkout page");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    console.log("Stripe Checkout error", error);
    if (error) setStripeError(error.message);
    setStripeIsLoading(false);
  };

  if (stripeError) {
    navigate("failed");
  }

  const handlePackage = (selected) => {
    setSelectedPackage(selected);

    if (animate1 === true) {
      setAnimate1(false);
    } else if (animate2 === true) {
      setAnimate2(false);
    } else if (animate3 === true) {
      setAnimate3(false);
    }

    let amount = price;

    if (selected === selectedPackage) {
      /*if previous selected package and new 
      selected package are the same , do nothing! */
      return;
    } else {
      /*else if previous select package and new 
      selected package are not the same , execute this! */
      if (selected === Intermediate) {
        /* if the new selected package is "Intermediate",
         execute this! */
        if (selectedPackage === Professional) {
          /* if the previous selected package is "Professional",
            execute this! 
            y - "Professional pacakage price"
            x - "Intermediate pacakage price"
            y = x + 30% of x, 
            then we can express y as:
            y = x + (x * 30) / 100
            To find x, we can rearrange the equation to get:
            x = y / 1.3
            So in this case, we can find x by dividing y by 1.3 */
          amount = amount / 1.3;
          setPrice(amount);
        } else if (selectedPackage === Creative) {
          /* if the previous selected package is "Creative",
            execute this! 
            y - "Creative pacakage price"
            x - "Intermediate pacakage price"
            y = x + 70% of x, 
            then we can express y as:
            y = x + (x * 70) / 100
            To find x, we can rearrange the equation to get:
            x = y / 1.7
            So in this case, we can find x by dividing y by 1.7
            x = x + (x * 0.7) is equvalent to x = x * 1.7 */
          amount = amount / 1.7;
          setPrice(amount);
        }
      } else if (selected === Professional) {
        /* if the new selected package is "Professional",
         execute this! */
        if (selectedPackage === Intermediate) {
          /* if the previous selected package is "Intermediate",
         execute this! find 30% of orginal/current price and add it 
         with orginal/current 
         x = x + (x * 0.3) is equvalent to x = x * 1.3 */
          amount = amount * 1.3;
          setPrice(amount);
        } else if (selectedPackage === Creative) {
          /* if the previous selected package is "Creative",
          execute this! we use Creative-Intermediate method
          and find the 30% of it and add with it */
          amount = (amount / 1.7) * 1.3;
          setPrice(amount);
        }
      } else if (selected === Creative) {
        /* if the new selected package is "Creative",
         execute this! */
        if (selectedPackage === Intermediate) {
          /* if the previous selected package is "Intermediate",
         execute this! find 70% of orginal/current price and add it 
         with orginal/current */
          amount = amount * 1.7;
          setPrice(amount);
        } else if (selectedPackage === Professional) {
          /* if the previous selected package is "Creative",
          execute this! we use Professional-Intermediate method from above
          and find the 70% of it and add with it */
          amount = (amount / 1.3) * 1.7;
          setPrice(amount);
        }
      }
    }

    // if (selected === selectedPackage) {
    //   return;
    // } else {
    //   if (selected === "Intermediate") {
    //     if (selectedPackage === "Professional") {
    //       amount = amount / 1.3;
    //       setPrice(Math.round(amount));
    //     } else if (selectedPackage === "Creative") {
    //       amount = amount / 1.7;
    //       setPrice(Math.round(amount));
    //     }
    //   } else if (selected === "Professional") {
    //     amount += amount * 0.3;
    //     setPrice(Math.round(amount));
    //   } else if (selected === "Creative") {
    //     amount += amount * 0.7;
    //     setPrice(Math.round(amount));
    //   }
    // }
  };

  const handleAddHours = () => {
    let amount = price;
    if (hours >= 48) {
      setLimitAnimation(true);
    } else {
      setHours(hours + 12);
      amount = Math.round(amount / 1.3);
      setPrice(amount);
      setLimitAnimation(false);
    }
  };

  const handleMinusHours = () => {
    let amount = price;
    if (hours <= 12) {
      setLimitAnimation(true);
    } else {
      amount = price * 1.3;
      setPrice(amount);
      setHours(hours - 12);
    }
  };

  const tncBtn = (
    <Link to={"/terms-&-conditions"}>
      <div className="tncBtn"> terms and conditions. </div>{" "}
    </Link>
  );

  return (
    <>
      <div className="payment">
        <h1 className="payment-h1">Hello {name}</h1>

        <h2 className="payment-h2">
          Our writers are excited to translate your {span} of{" "}
          {inputLanguage.label} to {outputLanguage.label}. Choose your style and
          timeline right away.
        </h2>

        <div className={`days ${limitAnimation && "limit-animation"}`}>
          <Button
            type={BUTTON_TYPES.SECONDARY}
            icon={minus}
            iconPos="LEFT"
            styles={"daysBtn"}
            onButtonClick={handleMinusHours}
          />
          <h1 className="delivery-in">Delivery in {hours}Hrs</h1>

          <Button
            type={BUTTON_TYPES.SECONDARY}
            icon={plus}
            iconPos="LEFT"
            styles={"daysBtn"}
            onButtonClick={handleAddHours}
          />
        </div>

        <div className="proceed-to-payment">
          <Button
            type={BUTTON_TYPES.PRIMARY}
            btnText={stripeIsLoading ? "Loading..." : "Proceed to Payment"}
            styles={"proceed-to-payment"}
            onButtonClick={redirectToCheckout}
            disabled={stripeIsLoading}
          />
        </div>

        <div className="box">
          <div className="package-buttons-container">
            <div
              className="button-container"
              onMouseEnter={() => setAnimate1(true)}
              onMouseLeave={() => setAnimate1(false)}
            >
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={Intermediate}
                iconPos="LEFT"
                onButtonClick={() => handlePackage(Intermediate)}
                styles={
                  selectedPackage === Intermediate
                    ? "packageBtn selected-package"
                    : "packageBtn"
                }
              />
              <div
                className={`payment-details ${
                  animate1 ? "active" : "inactive"
                }`}
              >
                Automatic translation offers nearly 70% accuracy, whereas in our
                Intermediate plan, we use human translators to convert it right,
                increasing the accuracy upto 99%.
              </div>
            </div>

            <div
              className="button-container"
              onMouseEnter={() => setAnimate2(true)}
              onMouseLeave={() => setAnimate2(false)}
            >
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={Professional}
                iconPos="LEFT"
                onButtonClick={() => handlePackage(Professional)}
                styles={
                  selectedPackage === Professional
                    ? "packageBtn selected-package"
                    : "packageBtn"
                }
              />
              <div
                className={`payment-details professional ${
                  animate2 ? "active" : "inactive"
                }`}
              >
                Best suitable for corporate websites, business documents and
                anything business except legal.
              </div>
            </div>

            <div
              className="button-container"
              onMouseEnter={() => setAnimate3(true)}
              onMouseLeave={() => setAnimate3(false)}
            >
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText={Creative}
                iconPos="LEFT"
                onButtonClick={() => handlePackage(Creative)}
                styles={
                  selectedPackage === Creative
                    ? "packageBtn selected-package"
                    : "packageBtn"
                }
              />
              <div
                className={`payment-details creative ${
                  animate3 ? "active" : "inactive"
                }`}
              >
                Best suitable for creative modern websites and brochures meant
                to attract young customers.
              </div>
            </div>
          </div>
          <h1 className="price">₹{AddCommas(Math.round(price))}</h1>
        </div>
        <h1 className="tag-text">
          By clicking the button, you agree to our
          {tncBtn} Kindly contact the support if you've any concerns should be
          the content.
        </h1>
      </div>
    </>
  );
};

export default Payment;
