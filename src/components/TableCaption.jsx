import { LuDot } from "react-icons/lu";

/**
 * Display the filters currently active as a caption of the table. Each filter
 * will be separated by a separator.
 */
export default function TableCaption({ filter }) {
  const filterArr = [];

  if (filter.year.length !== 0) {
    filterArr.push(
      <span key="date">
        {`(Date: ${filter.year[0]} - ${filter.year[1]})`}
      </span>
    );
    filterArr.push(
      <LuDot
        key="separator1"
        className="inline-block scale-150"
      />
    );
  }

  if (filter.revenue.length !== 0) {
    filterArr.push(
      <span key="revenue">
        {`(Revenue: ${filter.revenue[0]} - ${filter.revenue[1]})`}
      </span>
    );
    filterArr.push(
      <LuDot
        key="separator2"
        className="inline-block scale-150"
      />
    );
  }

  if (filter.netIncome.length !== 0) {
    filterArr.push(
      <span key="net income">
        {`(Net Income: ${filter.netIncome[0]} - ${filter.netIncome[1]})`}
      </span>
    );
    filterArr.push(
      <LuDot
        key="separator3"
        className="inline-block scale-150"
      />
    );
  }

  // Display the filter caption if there are any filters applied
  if (filterArr.length !== 0) {
    // Remove LuDot separator at last index of filterArr
    filterArr.pop();

    return (
      <div className="text-sm italic text-center mt-1">
        <span className="font-semibold">Filters: </span>
        {filterArr}
      </div>
    );
  } else {
    return null;
  }
}