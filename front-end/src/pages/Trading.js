import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import httpClient from "../utils/httpClient";


const Trading = ({ username, setMessage }) => {

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('Symbol');

  if (!username) {
    setMessage({
      text: 'You must login to use the Trading page.',
      variant: 'warning'
    });
    return <Navigate to="/login" />;
  }

  const handleSelect = (event) => {
    setSearchType(event.target.value);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit.');
  }

  return (
    <div>
      <h2>Trading</h2>
      <em className='text-muted'>
        Search for stocks by ticker symbol or company name.
      </em>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs lg="3">
            <Form.Select onChange={handleSelect} defaultValue="Symbol">
              <option>Symbol</option>
              <option>Company name</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search for..."
              data-testid="search-input"
              value={search}
              onChange={handleSearch}
            />
          </Col>
          <Col md="auto">
            <Button variant="primary" type="submit" data-testid="search-button">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

    </div>
  );
}

export default Trading;