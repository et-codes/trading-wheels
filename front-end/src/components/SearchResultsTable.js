import { Table } from 'react-bootstrap';
import { StockInfo, TradeButton } from './';


const SearchResultsTable = ({ results }) => {

  const handleClick = (event) => {
    console.log(event.target.id);
  }

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
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((stock) => {
            return (
              <tr key={stock.id}>
                <td className="text-center">
                  <StockInfo symbol={stock.symbol} />
                </td>
                <td>{stock.description}</td>
                <td className="text-center">
                  <TradeButton id={stock.symbol} onClick={handleClick} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default SearchResultsTable;