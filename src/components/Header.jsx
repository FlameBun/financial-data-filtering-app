import { useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

export default function Header() {
  const [ sortOption, setSortOption ] = useState({
    column: "Date",
    order: "descending"
  });

  return (
    <thead>
      <tr>
        <HeaderCell>
          <SortableHeader sortOption={sortOption} setSortOption={setSortOption}>
            Date
          </SortableHeader>
        </HeaderCell>
        <HeaderCell>
          <SortableHeader sortOption={sortOption} setSortOption={setSortOption}>
            Revenue
          </SortableHeader>
        </HeaderCell>
        <HeaderCell>
          <SortableHeader sortOption={sortOption} setSortOption={setSortOption}>
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
function SortableHeader({ children, sortOption, setSortOption }) {
  const { column, order } = sortOption;

  /**
   * Toggle the sort button for the next specified column to sort to descending
   * or ascending after it has been clicked on.
   */
  function handleColumnSort(nextColumn) {
    return (function() {
      if (column === nextColumn && order === "descending")
        setSortOption({ column: nextColumn, order: "ascending" });
      else
        setSortOption({ column: nextColumn, order: "descending" });
    });
  }

  // Determine which column is sorted and which sort icon to display
  let icon;
  if (
    (children === "Date" && column === "Date") ||
    (children === "Revenue" && column === "Revenue") ||
    (children === "Net Income" && column === "Net Income")
  ) {
    if (order === "descending")
      icon = <TiArrowSortedDown className={iconStyle} />;
    else
      icon = <TiArrowSortedUp className={iconStyle} />;
  } else {
    icon = <TiArrowUnsorted className={iconStyle} />;
  }

  return (
    <div 
      className="flex items-center p-2 cursor-pointer"
      onClick={handleColumnSort(children)}
    >
      <span>{children}</span>
      {icon}
    </div>
  );
}

function UnsortableHeader({ children }) {
  return <div className="p-2">{children}</div>;
}
