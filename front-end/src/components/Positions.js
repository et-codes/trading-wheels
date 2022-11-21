import { currency, percent } from '../utils/format';
import { Table } from 'react-bootstrap';


const Positions = ({ positions }) => {

  return (
    <Table bordered responsive="sm" size="sm">
      <thead>
        <tr className="table-primary">
          <th>Symbol</th>
          <th>Description</th>
          <th>Shares</th>
          <th>Cost</th>
          <th>Value</th>
          <th>Gain/Loss</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => {
          const gainColor = position.gain_pct >= 0 ? 'text-success' : 'text-danger';
          return (
            <tr key={position.symbol}>
              <td>{position.symbol}</td>
              <td>{position.description}</td>
              <td>{position.shares}</td>
              <td>{currency(position.cost)}</td>
              <td>{currency(position.value)}</td>
              <td className={gainColor}>{percent(position.gain_pct)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Positions;