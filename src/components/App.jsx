import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Body from "./Body.jsx";
import TableCaption from "./TableCaption.jsx";
import FilterSection from "./FilterSection.jsx";
import getBaseURL from "../base-url.jsx";
import { StatementContext } from "../StatementContext.jsx";

export default function App() {
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
    <Main>
      <StatementContext.Provider value={{statements, setStatements, filter, setFilter, sortOption, setSortOption}}>
        <h1 className="font-bold text-2xl my-4">
          Financial Data Filtering App
        </h1>
        <TableContainer>
          <table className="w-full border border-black border-collapse">
            <Header />
            <Body />
          </table>
        </TableContainer>
        <TableCaption />
        <FilterSection/>
      </StatementContext.Provider>
    </Main>
  );
}

function Main({ children }) {
  return (
    <div className="font-noto-sans w-11/12 my-4 mx-auto">
      {children}
    </div>
  );
}

function TableContainer({ children }) {
  return (
    <div className="scrollbar overflow-x-auto shadow-md">
      {children}
    </div>
  );
}
