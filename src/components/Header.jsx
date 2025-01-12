import axios from "axios";
import { TiArrowUnsorted } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import getBaseURL from "../base-url.jsx";

export default function Header({
  filter,
  sortOption,
  setSortOption,
  setStatements
}) {
  return (
    <thead>
      <tr>
        <HeaderCell>
          <SortableHeader
            filter={filter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            setStatements={setStatements}
          >
            Date
          </SortableHeader>
        </HeaderCell>
        <HeaderCell>
          <SortableHeader
            filter={filter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            setStatements={setStatements}
          >
            Revenue
          </SortableHeader>
        </HeaderCell>
        <HeaderCell>
          <SortableHeader
            filter={filter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            setStatements={setStatements}
          >
            Net Income
          </SortableHeader>
        </HeaderCell>
        <HeaderCell>
          <UnsortableHeader>
            Gross Profit
          </UnsortableHeader>
        </HeaderCell>
        <HeaderCell>
          <UnsortableHeader>
            {"EPS (Earnings Per Share)"}
          </UnsortableHeader>
        </HeaderCell>
        <HeaderCell>
          <UnsortableHeader>
            Operating Income
          </UnsortableHeader>
        </HeaderCell>
      </tr>
    </thead>
  );
}

function HeaderCell({ children }) {
  return (
    <th className="border border-black text-left w-1/6">
      {children}
    </th>
  );
}

const iconStyle = "inline-block ml-1 cursor-pointer";
function SortableHeader({
  children,
  filter,
  sortOption,
  setSortOption,
  setStatements
}) {
  // Header name (name of this column) in lowercase
  const currColumn = children.toLowerCase();

  /**
   * Toggle the sort button for the next specified column to sort to descending
   * or ascending after it has been clicked on.
   */
  async function handleColumnSort() {
    let statements;

    // Replace spaces, if there are any, with '-'
    const sortQueryParamVal = currColumn.replace(/\s/g, "-");

    // Construct URL
    let url = `${getBaseURL()}/statements?sort=${sortQueryParamVal}`;

    // Append query parameters for year, revenue, and net income to URL if
    // applicable
    if (filter.year.length !== 0)
      url += `&year=${filter.year[0]},${filter.year[1]}`;
    if (filter.revenue.length !== 0)
      url += `&revenue=${filter.revenue[0]},${filter.revenue[1]}`;
    if (filter.netIncome.length !== 0)
      url += `&net-income=${filter.netIncome[0]},${filter.netIncome[1]}`;

    // Set the sort option for this current column
    if (sortOption.column === currColumn && sortOption.order === "descending") {
      url += `&order=ascending`;
      const { data } = await axios.get(url);
      statements = data;

      setSortOption({ column: currColumn, order: "ascending" });
    } else {
      url += `&order=descending`;
      const { data } = await axios.get(url);
      statements = data;

      setSortOption({ column: currColumn, order: "descending" });
    }

    setStatements(statements);
  }

  // Determine which column is sorted and which sort icon to display
  let icon;
  if (currColumn === sortOption.column) {
    if (sortOption.order === "descending")
      icon = <TiArrowSortedDown className={iconStyle} />;
    else
      icon = <TiArrowSortedUp className={iconStyle} />;
  } else {
    icon = <TiArrowUnsorted className={iconStyle} />;
  }

  return (
    <div 
      className="flex items-center p-2 cursor-pointer"
      onClick={handleColumnSort}
    >
      <span>{children}</span>
      {icon}
    </div>
  );
}

function UnsortableHeader({ children }) {
  return <div className="p-2">{children}</div>;
}
