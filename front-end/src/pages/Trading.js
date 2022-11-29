import { useState, useEffect, useCallback } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import httpClient from "../utils/httpClient";
import { LoginButton, SearchForm, SearchResultsTable } from '../components';


const Trading = ({ username, setMessage }) => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [portfolio, setPortfolio] = useState({});
  const [tradeComplete, setTradeComplete] = useState(false);

  const getPortfolio = useCallback(async () => {
    try {
      const response = await httpClient.get(`/api/portfolio`);
      setPortfolio(response.data);
    } catch (error) {
      setMessage({ text: error, variant: 'warning' });
    }
  }, [setMessage]);

  useEffect(() => {
    if (username) getPortfolio();
  }, [username, getPortfolio]);

  useEffect(() => {
    if (!username) setMessage({
      text: 'You must log in to use the Portfolio page.',
      variant: 'warning'
    });
  }, [username, setMessage]);

  useEffect(() => {
    if (tradeComplete) {
      setTradeComplete(false);
      getPortfolio();
    }
  }, [tradeComplete, getPortfolio]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResults([]);
    setLoading(true);
    try {
      const response = await httpClient.get(`/api/stock/search/${search}`);
      setResults(response.data);
      if (response.data.length === 0) {
        setMessage({
          text: `No results found for "${search}".`,
          variant: 'info'
        });
      }
    } catch (error) {
      setMessage({ text: error.message, variant: 'danger' });
    } finally {
      setLoading(false);
    }
  }

  if (!username) return <LoginButton />

  return (
    <div>
      <h2>Trading</h2>
      <SearchForm
        handleSubmit={handleSubmit}
        search={search}
        handleSearch={(event) => setSearch(event.target.value)}
      />
      <div>
        {loading
          ? (<div className="d-flex mt-5 justify-content-center">
            <BarLoader color={'#325D88'} />
          </div>)
          : null}
      </div>
      <div>
        {results.length > 0
          ? <SearchResultsTable
            results={results}
            portfolio={portfolio}
            setTradeComplete={setTradeComplete}
          />
          : null}
      </div>
    </div>
  );
}

export default Trading;