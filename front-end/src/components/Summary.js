import { currency, percent } from '../utils/format';
import { Table } from 'react-bootstrap';


const Summary = ({ summary }) => {

  const gainColor = summary.gain_pct >= 0 ? 'text-success' : 'text-danger';

  return (
    <Table bordered responsive="sm" className="text-center">
      <thead>
        <tr className="table-primary">
          <th>Stock Value</th>
          <th>Cash Balance</th>
          <th>Total Assets</th>
          <th>Gain/Loss</th>
        </tr>
      </thead>
      <tbody className="h5">
        <tr>
          <td>{currency(summary.stocks)}</td>
          <td>{currency(summary.cash)}</td>
          <td>{currency(summary.total)}</td>
          <td className={`${gainColor}`}>{percent(summary.gain_pct)}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Summary;