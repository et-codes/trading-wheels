import { Button } from "react-bootstrap";


const TradeButton = ({ id, onClick }) => {

  return (
    <Button
      id={id}
      variant="outline-primary"
      size="sm"
      onClick={onClick}
      className="py-0"
    >
      Trade
    </Button>
  );
}

export default TradeButton;