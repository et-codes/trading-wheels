import { Alert, Container } from 'react-bootstrap';

const InfoBar = ({ message }) => {
  return (
    <Alert variant={message.variant || 'primary'}>
      <Container>{message.text}</Container>
    </Alert>
  );
}

export default InfoBar;