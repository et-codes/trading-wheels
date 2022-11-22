import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


const StockInfo = ({ symbol }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        key={symbol}
        variant="link"
        size="sm"
        onClick={handleShow}
        className="py-0"
        disabled={symbol === '$CASH'}
      >
        {symbol}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Here is some info about {symbol}.
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StockInfo;