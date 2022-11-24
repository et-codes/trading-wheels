import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import BarLoader from 'react-spinners/BarLoader';
import httpClient from "../utils/httpClient";
import SearchForm from '../components/SearchForm';


const Trading = ({ username, setMessage }) => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  if (!username) {
    setMessage({
      text: 'You must login to use the Trading page.',
      variant: 'warning'
    });
    return <Navigate to="/login" />;
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResults([]);
    setLoading(true);
    try {
      const response = await httpClient.get(`/stock/search/${search}`);
      setResults(response.data);
    } catch (error) {
      setMessage({ text: error.message, variant: 'danger' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Trading</h2>
      <em className='text-muted'>
        Search for stocks by ticker symbol or company name.
      </em>
      <SearchForm
        handleSubmit={handleSubmit}
        search={search}
        handleSearch={handleSearch}
      />
      <div>
        {loading && (
          <div className="d-flex mt-5 justify-content-center">
            <BarLoader color={'#325D88'} />
          </div>
        )}
      </div>
      <div>
        {results.map((stock) => {
          return (
            <div key={stock.id}>
              {stock.symbol} - {stock.description}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Trading;