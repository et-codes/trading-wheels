import { Link } from 'react-router-dom';

const BoldLink = (props) => {
  return (
    <Link to={props.to}>
      <span className="text-primary font-weight-bold">{props.children}</span>
    </Link>
  );
}

export default BoldLink;