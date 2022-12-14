import { currency, percent, number } from '../utils/format';
import { Table } from 'react-bootstrap';
import { StockInfo, TradeButton } from './';


const Positions = ({ portfolio, setTradeComplete }) => {

  return (
    <>
      <em className='text-muted'>
        Click stock symbol for details, Trade button to buy or sell.
      </em>
      <Table bordered hover responsive="sm" size="sm">
        <thead>
          <tr className="table-primary">
            <th className="text-center">Symbol</th>
            <th>Description</th>
            <th className="text-right">Shares</th>
            <th className="text-right">Cost</th>
            <th className="text-right">Value</th>
            <th className="text-right">Gain/Loss</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.positions.map((position) => {
            const gainColor = position.gain_pct >= 0 ? 'text-success' : 'text-danger';
            return (
              <tr key={position.symbol}>
                <td className="text-center">
                  <StockInfo symbol={position.symbol} />
                </td>
                <td>{position.description}</td>
                <td className="text-right">{number(position.shares)}</td>
                <td className="text-right">{currency(position.cost)}</td>
                <td className="text-right">{currency(position.value)}</td>
                <td className={"text-right " + gainColor}>
                  {percent(position.gain_pct)}
                </td>
                <td className="text-center">
                  {position.symbol !== '$CASH' &&
                    <TradeButton
                      id={position.symbol}
                      portfolio={portfolio}
                      setTradeComplete={setTradeComplete}
                    />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Positions;