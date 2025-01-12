import { useState } from "react";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";
import getBaseURL from "../base-url.jsx";

export default function FilterSection({
  setStatements,
  setFilter,
  sortOption
}) {
  const [ inputs, setInputs ] = useState({
    dateFrom: "",
    dateTo: "",
    revenueFrom: "",
    revenueTo: "",
    netIncomeFrom: "",
    netIncomeTo: ""
  });
  
  const [ errors, setErrors ] = useState({
    date: "",
    revenue: "",
    netIncome: ""
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

  /**
   * Filter the table according to the inputs set after clicking on the filter
   * button. The table should still be sorted according to the current sort
   * option.
   */
  async function handleFilterClick() {
    // Error variables
    let dateError = "";
    let revenueError = "";
    let netIncomeError = "";

    // Query parameters
    let yearQueryParam = "";
    let revenueQueryParam = "";
    let netIncomeQueryParam = "";

    // If date fields are valid, set yearQueryParam; else, set error
    if (dateFrom !== "" && dateTo !== "") {
      // Invalid inputs are not valid numbers or if "From" field is greater than
      // "To" field
      if (Number(dateFrom) > Number(dateTo))
        dateError = "Invalid range. Write the smaller value before the " +
                    "larger value.";
      else
        yearQueryParam = `year=${dateFrom},${dateTo}`;
    } else if (dateFrom !== "" || dateTo !== "") {
      dateError = "Fill in both fields or leave both empty.";
    }

    // If revenue fields are valid, set revenueQueryParam; else, set error
    if (revenueFrom !== "" && revenueTo !== "") {
      // Invalid inputs are not valid numbers or if "From" field is greater than
      // "To" field
      if (
        Number.isNaN(Number(revenueFrom)) ||
        Number.isNaN(Number(revenueTo))
      )
        revenueError = "Enter valid number values.";
      else if (Number(revenueFrom) > Number(revenueTo))
        revenueError = "Invalid range. Write the smaller value before the " +
                       "larger value.";
      else
        revenueQueryParam = `revenue=${revenueFrom},${revenueTo}`;
    } else if (revenueFrom !== "" || revenueTo !== "") {
      revenueError = "Fill in both fields or leave both empty.";
    }

    // If net income fields are valid, set netIncomeQueryParam; else, set error
    if (netIncomeFrom !== "" && netIncomeTo !== "") {
      // Invalid inputs are not valid numbers or if "From" field is greater than
      // "To" field
      if (
        Number.isNaN(Number(netIncomeFrom)) ||
        Number.isNaN(Number(netIncomeTo))
      )
        netIncomeError = "Enter valid number values.";
      else if (Number(netIncomeFrom) > Number(netIncomeTo))
        netIncomeError = "Invalid range. Write the smaller value before the " +
                         "larger value.";
      else
        netIncomeQueryParam = `net-income=${netIncomeFrom},${netIncomeTo}`;
    } else if (netIncomeFrom !== "" || netIncomeTo !== "") {
      netIncomeError = "Fill in both fields or leave both empty.";
    }

    // If there are errors, set them and return. Otherwise, clear errors if
    // there are any.
    setErrors({
      date: dateError,
      revenue: revenueError,
      netIncome: netIncomeError
    });
    if (dateError !== "" || revenueError !== "" || netIncomeError !== "")
      return;

    // Replace spaces, if there are any, with '-' in sortOption.column
    const sortQueryParamVal = sortOption.column.replace(/\s/g, "-");

    // Construct URL
    let url = `${getBaseURL()}/statements?sort=${sortQueryParamVal}&` +
                `order=${sortOption.order}`;

    // Append query parameters for year to URL and set filter if applicable
    if (yearQueryParam !== "") {
      url += `&${yearQueryParam}`;

      setFilter((filter) => ({
        ...filter,
        year: [Number(dateFrom), Number(dateTo)]
      }));
    } else {
      setFilter((filter) => ({
        ...filter,
        year: []
      }));
    }

    // Append query parameters for revenue to URL and set filter if applicable
    if (revenueQueryParam !== "") {
      url += `&${revenueQueryParam}`;

      setFilter((filter) => ({
        ...filter,
        revenue: [Number(revenueFrom), Number(revenueTo)]
      }));
    } else {
      setFilter((filter) => ({
        ...filter,
        revenue: []
      }));
    }

    // Append query params for net income to URL and set filter if applicable
    if (netIncomeQueryParam !== "") {
      url += `&${netIncomeQueryParam}`;

      setFilter((filter) => ({
        ...filter,
        netIncome: [Number(netIncomeFrom), Number(netIncomeTo)]
      }));
    } else {
      setFilter((filter) => ({
        ...filter,
        netIncome: []
      }));
    }

    // Generate GET request and set statements on table
    const { data } = await axios.get(url);
    setStatements(data);
  }

  return (
    <div className="flex my-4 gap-x-4 items-start">
      <Filter
        inputs={[dateFrom, dateTo]}
        setInputs={handleDateInputChange}
        error={errors.date}
      >
        {"Date (Year)"}
      </Filter>
      <Filter
        inputs={[revenueFrom, revenueTo]}
        setInputs={handleRevenueInputChange}
        error={errors.revenue}
      >
        Revenue
      </Filter>
      <Filter
        inputs={[netIncomeFrom, netIncomeTo]}
        setInputs={handleNetIncomeInputChange}
        error={errors.netIncome}
      >
        Net Income
      </Filter>
      <button
        onClick={handleFilterClick}
        className="bg-[#dbd0c3] rounded-lg px-4 py-1 my-7"
      >
        Filter
      </button>
    </div>
  );
}

const inputStyle = "font-noto-sans placeholder-gray-500 p-2 rounded-md min-w-0";
function Filter({ children, inputs, setInputs, error }) {
  const column = children; // Name of column to filter by

  return (
    <div className="min-w-0">
      <h2 className="font-bold w-fit">{column}</h2>
      <div className="flex gap-x-1 my-1">
        <input 
          placeholder="From"
          value={inputs[0]}
          onChange={(event) => setInputs(event, "from")}
          className={inputStyle}
        />
        <input
          placeholder="To"
          value={inputs[1]}
          onChange={(event) => setInputs(event, "to")}
          className={inputStyle}
        />
      </div>
      {error !== "" && 
        <div className="flex gap-x-[0.125rem] text-red-400 text-sm">
          <div>
            <MdErrorOutline className="mt-[0.1875rem]" />
          </div>
          <div>{error}</div>
        </div>
      }
    </div>
  );
}
