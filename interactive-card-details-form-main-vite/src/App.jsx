import React, { useState } from "react";
import bgMobile from "../images/bg-main-mobile.png";
import bgDesktop from "../images/bg-main-desktop.png";
import logo from "../images/card-logo.svg";
import tick from "../images/icon-complete.svg";

export default function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    cardNumber: "",
    monthValue: "",
    yearValue: "",
    cvc: "",
  });

  const [formError, setFormError] = useState({
    nameError: "",
    cardNumberError: "",
    monthError: "",
    yearError: "",
    cvcError: "",
  });

  const isNameValid = (value) => {
    const namePattern = /^[a-zA-Z ]+$/;
    return namePattern.test(value);
  };

  const isCardNumberValid = (value) => {
    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    {
      console.log(value);
    }
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
    const cvcPattern = /^\d{3}$/;
    return cvcPattern.test(value);
  };

  const handleInputs = {
    handleNameChange: (value) => {
      setFormValue({ ...formValue, name: value });
    },

    handleCardNumberChange: (value) => {
      setFormValue({ ...formValue, cardNumber: value });
    },

    handleMonthChange: (value) => {
      setFormValue({ ...formValue, monthValue: value.slice(0, 2) });
    },

    handleYearChange: (value) => {
      setFormValue({ ...formValue, yearValue: value.slice(0, 2) });
    },

    handleCvcChange: (value) => {
      setFormValue({ ...formValue, cvc: value.slice(0, 3) });
    },
  };

  function ErrorCheck(formValue) {
    setFormError({
      ...formError,
      nameError:
        formValue.name.trim() === ""
          ? "Can't be blank"
          : isNameValid(formValue.name)
          ? ""
          : "Invalid name format",

      cardNumberError:
        formValue.cardNumber.trim() === ""
          ? "Can't be blank"
          : isCardNumberValid(formValue.cardNumber)
          ? ""
          : "Wrong format, numbers only",

      monthError:
        formValue.monthValue.trim() === ""
          ? "Can't be blank"
          : isMonthValid(formValue.monthValue)
          ? ""
          : "Invalid month",

      yearError:
        formValue.yearValue.trim() === ""
          ? "Can't be blank"
          : isYearValid(formValue.yearValue)
          ? ""
          : "Invalid year",

      cvcError:
        formValue.cvc.trim() === ""
          ? "Can't be blank CVC Number"
          : isCvcValid(formValue.cvc)
          ? ""
          : "Exactly 3 digits required",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields before submission
    handleInputs.handleNameChange(formValue.name);
    handleInputs.handleCardNumberChange(formValue.cardNumber);
    handleInputs.handleMonthChange(formValue.monthValue);
    handleInputs.handleYearChange(formValue.yearValue);
    handleInputs.handleCvcChange(formValue.cvc);

    ErrorCheck(formValue);

    // Check if there are no errors and all fields are filled
    if (
      !formError.nameError &&
      !formError.cardNumberError &&
      !formError.monthError &&
      !formError.yearError &&
      !formError.cvcError &&
      formValue.name &&
      formValue.cardNumber &&
      formValue.monthValue &&
      formValue.yearValue &&
      formValue.cvc
    ) {
      // Check if the card number is valid
      if (isCardNumberValid(formValue.cardNumber)) {
        // Perform form submission logic
        console.log("Form submitted successfully");
        setConfirmed(true);
        setFormValue({
          name: "",
          cardNumber: "",
          monthValue: "",
          yearValue: "",
          cvc: "",
        });
      } else {
        // If card number is invalid, don't setConfirmed(true)
        setConfirmed(false);
        console.log("Card number is invalid");
      }
    } else {
      // If any field is empty or there are validation errors, don't setConfirmed(true)
      setConfirmed(false);
      console.log("Validation errors or empty fields");
    }
  };

  return (
    <section>
      <div className="absolute -z-10 w-full">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={bgDesktop}
            className="h-full"
          />
          <img src={bgMobile} alt="" className="w-full md:w-1/3" />
        </picture>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
        <div className="mt-10 mx-5 grid grid-cols-1">
          <article className="front-card p-5 flex flex-col justify-between">
            <img src={logo} alt="" className="w-20 lg:w-28" />

            <div>
              <h2 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                {formValue.cardNumber
                  ? formValue.cardNumber
                  : "0000 0000 0000 0000"}
              </h2>

              <ul className="flex items-center justify-between">
                <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                  {formValue.name ? formValue.name : "Jane Appleseed"}
                </li>
                <li className="text-white text-base lg:text-xl tracking-widest">
                  {formValue.monthValue ? formValue.monthValue : "00"} /{" "}
                  {formValue.yearValue ? formValue.yearValue : "00"}
                </li>
              </ul>
            </div>
          </article>

          <article className="back-card relative lg:ml-20">
            <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
              {formValue.cvc ? formValue.cvc : "000"}
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
                  value={formValue.name}
                  onChange={(e) =>
                    setFormValue({ ...formValue, name: e.target.value })
                  }
                />
                {formError.nameError && (
                  <p className="text-red-500">{formError.nameError}</p>
                )}
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
                  value={formValue.cardNumber
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()}
                  onChange={(e) =>
                    setFormValue({ ...formValue, cardNumber: e.target.value })
                  }
                />
                {formError.cardNumberError && (
                  <p className="text-red-500">{formError.cardNumberError}</p>
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
                        value={formValue.monthValue}
                        onChange={(e) =>
                          setFormValue({
                            ...formValue,
                            monthValue: e.target.value.slice(0, 2),
                          })
                        }
                      />
                      {formError.monthError && (
                        <p className="text-red-500">{formError.monthError}</p>
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
                        value={formValue.yearValue}
                        onChange={(e) =>
                          setFormValue({
                            ...formValue,
                            yearValue: e.target.value.slice(0, 2),
                          })
                        }
                      />
                      {formError.yearError && (
                        <p className="text-red-500">{formError.yearError}</p>
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
                    value={formValue.cvc}
                    onChange={(e) =>
                      setFormValue({
                        ...formValue,
                        cvc: e.target.value.slice(0, 3),
                      })
                    }
                  />
                  {formError.cvcError && (
                    <p className="text-red-500">{formError.cvcError}</p>
                  )}
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
