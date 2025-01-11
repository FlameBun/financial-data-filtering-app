import axios from "axios";
import { TiArrowUnsorted } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import getBaseURL from "../base-url";

export default function Header({ sortOption, setSortOption, setStatements }) {
  return (
    <thead>
      <tr>
        <HeaderCell>
          <SortableHeader
            sortOption={sortOption}
            setSortOption={setSortOption}
            setStatements={setStatements}
          >
            Date
          </SortableHeader>
        </HeaderCell>
        <HeaderCell>
          <SortableHeader
            sortOption={sortOption}
            setSortOption={setSortOption}
            setStatements={setStatements}
          >
            Revenue
          </SortableHeader>
        </HeaderCell>
        <HeaderCell>
          <SortableHeader
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
  sortOption,
  setSortOption,
  setStatements
}) {
  const currColumn = children; // Header name (name of this column)

  /**
   * Toggle the sort button for the next specified column to sort to descending
   * or ascending after it has been clicked on.
   */
  async function handleColumnSort() {
    let statements;

    if (sortOption.column === currColumn && sortOption.order === "descending") {
      const res = await axios.get(`${getBaseURL()}/statements?` +
                                  `sort=${currColumn.toLowerCase()}&` +
                                  `order=ascending`);
      statements = res.data;
      setSortOption({ column: currColumn, order: "ascending" });
    } else {
      const res = await axios.get(`${getBaseURL()}/statements?` +
                                  `sort=${currColumn.toLowerCase()}&` +
                                  `order=descending`);
      statements = res.data;
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
      <span>{currColumn}</span>
      {icon}
    </div>
  );
}

function UnsortableHeader({ children }) {
  return <div className="p-2">{children}</div>;
}
