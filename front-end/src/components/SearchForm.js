import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchForm = ({ handleSubmit, search, handleSearch }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
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
  );
}

export default SearchForm;