export default function Body({ statements }) {
  const rows = statements.map((statement) => {
    const { date, revenue, netIncome, grossProfit, eps, operatingIncome }
      = statement;

    return (
      <tr key={date} className="even:bg-[#dbd0c3]">
        <Cell>{date}</Cell>
        <Cell>{revenue}</Cell>
        <Cell>{netIncome}</Cell>
        <Cell>{grossProfit}</Cell>
        <Cell>{eps}</Cell>
        <Cell>{operatingIncome}</Cell>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

function Cell({ children }) {
  return (
    <td className="border border-black p-2">{children}</td>
  );
}
