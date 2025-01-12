import { useState } from "react";

const fromPlaceholder = "From";
const toPlaceholder = "To";
export default function FilterSection() {
  const [ inputs, setInputs ] = useState({
    dateFrom: "",
    dateTo: "",
    revenueFrom: "",
    revenueTo: "",
    netIncomeFrom: "",
    netIncomeTo: ""
  });
  const { dateFrom, dateTo, revenueFrom, revenueTo, netIncomeFrom, netIncomeTo }
    = inputs;

  /**
   * Update the inputs state whenever the user types into the "From" or "To"
   * fields for the "Date (Year)" filter.
   */
  function handleDateInputChange(event, inputType) {
    let inputStr = event.target.value;

    // Allow the user to input up to only 4 characters
    if (inputStr.length > 4)
      return;

    // Allow the user to input only digits
    inputStr = inputStr.replace(/[^0-9]/, "");

    // Update the "From" or "To" fields for "Date (Year)" filter
    if (inputType === "from")
      setInputs({ ...inputs, dateFrom: inputStr });
    else
      setInputs({ ...inputs, dateTo: inputStr });
  }

  /**
   * Update the inputs state whenever the user types into the "From" or "To"
   * fields for the "Revenue" filter.
   */
  function handleRevenueInputChange(event, inputType) {
    let inputStr = event.target.value;

    // Allow the user to input only digits or, in the case the user may want
    // to consider negative values, dashes
    inputStr = inputStr.replace(/[^0-9-]/, "");

    // Update the "From" or "To" fields for "Revenue" filter
    if (inputType === "from")
      setInputs({ ...inputs, revenueFrom: inputStr });
    else
      setInputs({ ...inputs, revenueTo: inputStr });
  }

  /**
   * Update the inputs state whenever the user types into the "From" or "To"
   * fields for the "Net Income" filter.
   */
  function handleNetIncomeInputChange(event, inputType) {
    let inputStr = event.target.value;

    // Allow the user to input only digits or, in the case the user may want
    // to consider negative values, dashes
    inputStr = inputStr.replace(/[^0-9-]/, "");

    // Update the "From" or "To" fields for "Net Income" filter
    if (inputType === "from")
      setInputs({ ...inputs, netIncomeFrom: inputStr });
    else
      setInputs({ ...inputs, netIncomeTo: inputStr });
  }

  return (
    <div className="flex my-4 gap-x-4 items-center">
      <Filter
        inputs={[dateFrom, dateTo]}
        setInputs={handleDateInputChange}
        fromPlaceholder={`${fromPlaceholder} (YYYY)`}
        toPlaceholder={`${toPlaceholder} (YYYY)`}
      >
        {"Date (Year)"}
      </Filter>
      <Filter
        inputs={[revenueFrom, revenueTo]}
        setInputs={handleRevenueInputChange}
        fromPlaceholder={fromPlaceholder}
        toPlaceholder={toPlaceholder}
      >
        Revenue
      </Filter>
      <Filter
        inputs={[netIncomeFrom, netIncomeTo]}
        setInputs={handleNetIncomeInputChange}
        fromPlaceholder={fromPlaceholder}
        toPlaceholder={toPlaceholder}
      >
        Net Income
      </Filter>
      <button className="bg-[#edd0ad] rounded-lg px-4 py-1">Filter</button>
    </div>
  );
}

const inputStyle = "font-noto-sans placeholder-gray-500 p-2 rounded-md min-w-0";
function Filter({
  children,
  inputs,
  setInputs,
  fromPlaceholder,
  toPlaceholder
}) {
  const column = children; // Name of column to filter by

  return (
    <div className="min-w-0">
      <h2 className="font-bold w-fit">{column}</h2>
      <div className="flex gap-x-1">
        <input 
          placeholder={fromPlaceholder}
          value={inputs[0]}
          onChange={(event) => setInputs(event, "from")}
          className={inputStyle}
        />
        <input
          placeholder={toPlaceholder}
          value={inputs[1]}
          onChange={(event) => setInputs(event, "to")}
          className={inputStyle}
        />
      </div>
    </div>
  );
}
