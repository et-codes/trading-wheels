import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import httpClient from "../utils/httpClient";
import { SearchForm, SearchResultsTable } from '../components';


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
    getPortfolio();
  }, [getPortfolio]);

  useEffect(() => {
    if (tradeComplete) {
      setTradeComplete(false);
      getPortfolio();
    }
  }, [tradeComplete, getPortfolio]);

  if (!username) {
    setMessage({
      text: 'You must login to use the Trading page.',
      variant: 'warning'
    });
    return <Navigate to="/login" />;
  }

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