import { Alert, Container } from 'react-bootstrap';

const InfoBar = ({ alert }) => {
  if (alert.text) {
    return (
      <Alert variant={alert.variant || 'primary'}>
        <Container>{alert.text}</Container>
      </Alert>
    );
  }
}

export default InfoBar;