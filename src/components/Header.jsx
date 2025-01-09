export default function Header() {
  return (
    <thead>
      <tr>
        <HeaderCell>Date</HeaderCell>
        <HeaderCell>Revenue</HeaderCell>
        <HeaderCell>Net Income</HeaderCell>
        <HeaderCell>Gross Profit</HeaderCell>
        <HeaderCell>{"EPS (Earnings Per Share)"}</HeaderCell>
        <HeaderCell>Operating Income</HeaderCell>
      </tr>
    </thead>
  );
}

function HeaderCell({ children }) {
  return (
    <th className="border border-black text-left p-2">{children}</th>
  );
}
