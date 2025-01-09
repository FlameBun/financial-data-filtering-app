import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "../assets/react.svg";
import Header from "./Header.jsx";
import Body from "./Body.jsx";

const endpoint = "https://financialmodelingprep.com/api/v3/income-statement/" +
                 "AAPL?period=annual&apikey=fTgVXQhJUpJsXRASah2oN04eSmjWeEth";

function App() {
  const [ statements, setStatements ] = useState([]);

  /**
   * Retrieve annual income statements for AAPL.
   */
  async function setup() {
    const { data } = await axios.get(endpoint);
    setStatements(data);
  }

  // Run setup() function upon component's initial render
  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      <h1>Financial Data Filtering App</h1>
      <table className="w-full border border-black border-collapse">
        <Header />
        <Body statements={statements} />
      </table>
    </div>
  );
}

export default App;
