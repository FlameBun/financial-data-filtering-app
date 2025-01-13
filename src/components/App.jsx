import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Body from "./Body.jsx";
import TableCaption from "./TableCaption.jsx";
import FilterSection from "./FilterSection.jsx";
import getBaseURL from "../base-url.jsx";

function App() {
  const [ statements, setStatements ] = useState([]);

  // Indicates which filters are currently set on the table
  const [ filter, setFilter ] = useState({
    year: [],
    revenue: [],
    netIncome: []
  });

  // Indicates which column is currently sorted and in which order it's sorted
  const [ sortOption, setSortOption ] = useState({
    column: "date",
    order: "descending"
  });

  console.log(statements);

  /**
   * Retrieve annual income statements for AAPL.
   */
  async function setup() {
    const { data } = 
      await axios.get(`${getBaseURL()}/statements?sort=date&order=descending`);
    setStatements(data);
  }

  // Run setup() function upon component's initial render
  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="font-noto-sans w-11/12 my-4 mx-auto">
      <h1 className="font-bold text-2xl my-4">Financial Data Filtering App</h1>
      <div className="scrollbar overflow-x-auto">
        <table className="w-full border border-black border-collapse shadow-md">
          <Header
            setStatements={setStatements}
            filter={filter}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <Body statements={statements} />
        </table>
      </div>
      <TableCaption filter={filter} />
      <FilterSection
        setStatements={setStatements}
        setFilter={setFilter}
        sortOption={sortOption}
      />
    </div>
  );
}

export default App;
