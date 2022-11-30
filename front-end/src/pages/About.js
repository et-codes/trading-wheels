import ReactMarkdown from 'react-markdown';
import projectPlan from './images/project-plan.svg';
import { Col, Container, Image, Row } from 'react-bootstrap';


const About = () => {

  const heading = `# About Trading Wheels

Trading Wheels was developed by Eric Thornton in November 2022 
as a means to demonstrate full-stack web application technologies. Below are some notable details, along with my original sketch for the project.

Source code is available on my [GitHub]("https://github.com/et-codes/trading-wheels") page.`;

  const body = `## Server details

* The backend code is written in Python.
* The client bundle and API endpoints are served with the Flask framework.
* The interface with the PostgreSQL database is implemented with \`Flask-SQLAlchemy\`.
* \`Flask-Migrations\` is used for building and updating the database tables based on the declarative models.
* Login persistence is managed with sessions via the \`Flask-Login\` module.

## Client details

* The frontend code is written in JavaScript using the React framework.
* HTTP requests to the API are done using the \`axios\` library.
* \`Bootstrap\` and \`React-Bootstrap\` are used for styling.
* \`react-google-charts\` is used to create the stock charts.
`;

  return (
    <Container>
      <Row>
        <ReactMarkdown children={heading} />
      </Row>
      <Row>
        <Col md={6}>
          <ReactMarkdown children={body} />
        </Col>
        <Col md={6}>
          <Image src={projectPlan} fluid rounded className="shadow" />
        </Col>
      </Row>
    </Container>
  );
}

export default About;