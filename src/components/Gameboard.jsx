import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Gameboard = (props) => {
  return (
    <Container className="gameboard">
      {/* Reference row*/}
      <Row className="rad">
        {props.refs.map((letter, index) => (
          <Col className="square" key={index}>
            {letter}
          </Col>
        ))}
      </Row>
      {props.rows.map((object, index) => (
        <Row className="rad" key={index}>
          <Col className="square" key={index}>
            {props.rows[index]}
          </Col>
          {props.columns.map((something, index) => (
            <Col className="square" key={index}>
              <button
                onClick={(e) =>
                  console.log(props.rows[object - 1] + props.columns[index])
                }
              >
                {props.rows[object - 1]}
                {props.columns[index]}
              </button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Gameboard;
