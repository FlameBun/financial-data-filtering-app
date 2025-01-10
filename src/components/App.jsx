import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "../assets/react.svg";
import Header from "./Header.jsx";
import Body from "./Body.jsx";
import getBaseURL from "../base-url.jsx";

function App() {
  const [ statements, setStatements ] = useState([]);
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
    <div className="w-11/12 mx-auto">
      <h1 className="font-bold text-2xl my-4">Financial Data Filtering App</h1>
      <table className="w-full border border-black border-collapse shadow-md">
        <Header setStatements={setStatements} />
        <Body statements={statements} />
      </table>
    </div>
  );
}

export default App;
