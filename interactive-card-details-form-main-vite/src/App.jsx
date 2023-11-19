import React, { useState } from "react";
import bgMobile from "../images/bg-main-mobile.png";
import bgDesktop from "../images/bg-main-desktop.png";
import logo from "../images/card-logo.svg";
import tick from "../images/icon-complete.svg";
// import { format } from "date-fns";

export default function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");

  // const [date, setDate] = useState("01/23");

  const [monthValue, setMonthValue] = useState("");
  const [monthError, setMonthError] = useState("");

  const [yearValue, setYearValue] = useState("");
  const [yearError, setYearError] = useState("");

  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState("");

  const isNameValid = (value) => {
    const namePattern = /^[a-zA-Z ]+$/;
    return namePattern.test(value);
  };

  const isCardNumberValid = (value) => {
    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    return cardNumberPattern.test(value);
  };

  const isMonthValid = (value) => {
    const monthPattern = /^(0[1-9]|1[0-2])$/;
    return monthPattern.test(value);
  };

  const isYearValid = (value) => {
    const yearPattern = /^\d{2}$/;
    return yearPattern.test(value);
  };

  const isCvcValid = (value) => {
    const cvcPattern = /^\d+$/;
    return cvcPattern.test(value);
  };

  const handleNameChange = (value) => {
    setName(value);
    setNameError(
      value.trim() === ""
        ? "Can't be blank"
        : isNameValid(value)
        ? ""
        : "Invalid name format"
    );
  };

  const handleCardNumberChange = (value) => {
    setCardNumber(value);
    setCardNumberError(
      value.trim() === ""
        ? "Can't be blank"
        : isCardNumberValid(value)
        ? ""
        : "Wrong format, numbers only"
    );
  };

  const handleMonthChange = (value) => {
    setMonthValue(value.slice(0, 2));
    setMonthError(
      value.trim() === ""
        ? "Can't be blank"
        : isMonthValid(value)
        ? ""
        : "Invalid month"
    );
  };

  const handleYearChange = (value) => {
    setYearValue(value.slice(0, 2));
    setYearError(
      value.trim() === ""
        ? "Can't be blank"
        : isYearValid(value)
        ? ""
        : "Invalid year"
    );
  };

  const handleCvcChange = (value) => {
    setCvc(value.slice(0, 3));
    setCvcError(
      value.trim() === ""
        ? "Can't be blank"
        : isCvcValid(value)
        ? ""
        : "Invalid CVC format"
    );
  };

  const handleSubmit = () => {
    // Validate all fields before submission
    handleNameChange(name);
    handleCardNumberChange(cardNumber);
    handleMonthChange(monthValue);
    handleYearChange(yearValue);
    handleCvcChange(cvc);

    // Check if there are no errors and all fields are filled
    if (
      !nameError &&
      !cardNumberError &&
      !monthError &&
      !yearError &&
      !cvcError &&
      name &&
      cardNumber &&
      monthValue &&
      yearValue &&
      cvc
    ) {
      // Check if the card number is valid
      if (isCardNumberValid(cardNumber)) {
        // Perform form submission logic
        setConfirmed(true);
        setName("");
        setCardNumber("");
        setMonthValue("");
        setYearValue("");
        setCvc("");
      } else {
        // If card number is invalid, don't setConfirmed(true)
        setConfirmed(false);
      }
    } else {
      // If any field is empty or there are validation errors, don't setConfirmed(true)
      setConfirmed(false);
    }

    // Clear input fields only if confirmed is true
    // if (confirmed) {
    //   setName("");
    //   setCardNumber("");
    //   setMonthValue("");
    //   setYearValue("");
    //   setCvc("");
    // }
  };

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" className="w-full md:w-1/3" />
          </picture>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-10 mx-5 grid grid-cols-1">
            <article className="front-card p-5 flex flex-col justify-between">
              <img src={logo} alt="" className="w-20 lg:w-28" />

              <div>
                <h2 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                  {cardNumber ? cardNumber : "0000 0000 0000 0000"}
                </h2>

                <ul className="flex items-center justify-between">
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {name ? name : "Jane Appleseed"}
                  </li>
                  <li className="text-white text-base lg:text-xl tracking-widest">
                    {monthValue ? monthValue : "00"} /{" "}
                    {yearValue ? yearValue : "00"}
                  </li>
                </ul>
              </div>
            </article>

            <article className="back-card relative lg:ml-20">
              <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
                {cvc ? cvc : "000"}
              </p>
            </article>
          </div>

          <div className="pt-8 px-5 pb-20">
            {!confirmed && (
              <form className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen">
                <div>
                  <label htmlFor="cardholder_name">Cardholder Name</label>
                  <input
                    className="hover:border-violet-500 hover:cursor-pointer"
                    type="text"
                    name="cardholder_name"
                    id="cardholder_name"
                    placeholder="e.g. Jane Appleseed"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {nameError && <p className="text-red-500">{nameError}</p>}
                </div>

                <div>
                  <label htmlFor="card_number">Card Number</label>
                  <input
                    className="hover:border-violet-500 hover:cursor-pointer"
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    required
                    maxLength={19}
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  {cardNumberError && (
                    <p className="text-red-500">{cardNumberError}</p>
                  )}
                </div>

                <article className="flex items-center justify-between gap-8">
                  <div className="flex-1">
                    <label htmlFor="expiry_date">Exp. Date (MM/YY)</label>

                    <div className="flex gap-4">
                      <div>
                        <input
                          className="hover:border-violet-500 hover:cursor-pointer"
                          type="number"
                          name="month"
                          id="month"
                          placeholder="MM"
                          maxLength={2}
                          required
                          value={monthValue}
                          onChange={(e) =>
                            setMonthValue(e.target.value.slice(0, 2))
                          }
                        />
                        {monthError && (
                          <p className="text-red-500">{monthError}</p>
                        )}
                      </div>

                      <div>
                        <input
                          className="hover:border-violet-500 hover:cursor-pointer"
                          type="number"
                          name="year"
                          id="year"
                          placeholder="YY"
                          maxLength={2}
                          required
                          value={yearValue}
                          onChange={(e) =>
                            setYearValue(e.target.value.slice(0, 2))
                          }
                        />
                        {yearError && (
                          <p className="text-red-500">{yearError}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 align-middle ">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      className="hover:border-violet-500 hover:cursor-pointer"
                      type="number"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.slice(0, 3))}
                    />
                    {cvcError && <p className="text-red-500">{cvcError}</p>}
                  </div>
                </article>

                <button onClick={handleSubmit} className="btn mt-4">
                  Confirm
                </button>

                {/* Display error messages */}
              </form>
            )}

            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  );
}

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="thank-you flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto">
        <img src={tick} alt="" className="block mx-auto" />
        <h1 className="text-slate-800 text-3xl my-6 uppercase text-center">
          Thank you!
        </h1>
        <p className="text-slate-400 text-center">
          We've added your card details
        </p>
        <button
          onClick={() => setConfirmed(!setConfirmed)}
          className="btn block mx-auto mt-10 w-full"
        >
          Continue
        </button>
      </div>
    </>
  );
}
