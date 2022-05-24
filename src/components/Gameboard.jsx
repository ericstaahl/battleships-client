import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGeneratefleet from "../hooks/useGeneratefleet";

const Gameboard = (props) => {
  //import the fleet and map it out
  const fleet = useGeneratefleet();
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
      {fleet[0].map((array, index) => (
        <Row className="rad" key={index}>
          <Col className="square" key={index}>
            {props.rows[index]}
          </Col>
          {fleet[0][index].map((shipObject, index) => (
            <Col className="square" key={index}>
              <button
                className={`${shipObject !== null ? "active" : ""}`}
                value={shipObject}
                onClick={(e) => console.log(shipObject)}
              >
                {index}
              </button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Gameboard;
