import { useState } from "react";

export default function FilterSection() {
  return (
    <div className="flex my-4 gap-x-4 items-center">
      <Filter>{"Date (Year)"}</Filter>
      <Filter>Revenue</Filter>
      <Filter>Net Income</Filter>
      <button className="bg-[#edd0ad] rounded-lg px-4 py-1">Filter</button>
    </div>
  );
}

const inputStyle = "font-noto-sans placeholder-gray-500 p-2 rounded-md min-w-0";
function Filter({ children }) {
  const [ inputs, setInputs ] = useState({ from: "", to: "" });

  const column = children; // Name of column to filter by

  function handleStartInputChange(event) {
    let inputStr = event.target.value;

    if (column === "Date (Year)" && inputStr.length > 4)
      return;

    if (column == "Date (Year)")
      inputStr = inputStr.replace(/[^0-9]/, "");
    else
      inputStr = inputStr.replace(/[^0-9-]/, "");

    setInputs({ ...inputs, from: inputStr });
  }

  function handleEndInputChange(event) {
    let inputStr = event.target.value;

    if (column === "Date (Year)" && inputStr.length > 4)
      return;

    if (column == "Date (Year)")
      inputStr = inputStr.replace(/[^0-9]/, "");
    else
      inputStr = inputStr.replace(/[^0-9-]/, "");

    setInputs({ ...inputs, to: inputStr });
  }

  

  let startPlaceholder = "From";
  let endPlaceholder = "To";

  if (column === "Date (Year)") {
    const yearStr = " (YYYY)";
    startPlaceholder += yearStr;
    endPlaceholder += yearStr;
  }

  return (
    <div className="min-w-0">
      <h2 className="font-bold w-fit">{column}</h2>
      <div className="flex gap-x-1">
        <input 
          placeholder={startPlaceholder}
          value={inputs.from}
          onChange={handleStartInputChange}
          className={inputStyle}
        />
        <input
          placeholder={endPlaceholder}
          value={inputs.to}
          onChange={handleEndInputChange}
          className={inputStyle}
        />
      </div>
    </div>
  );
}
