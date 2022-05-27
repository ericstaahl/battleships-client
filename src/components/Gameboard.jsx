import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGeneratefleet from "../hooks/useGeneratefleet";
import { useState } from "react";

const Gameboard = (props) => {
  //import the fleet and map it out
  const [fleet, setFleet] = useState(useGeneratefleet());
  console.log(fleet);
  return (
    <Container className="gameboard">
      {/* Reference row*/}
      <Row className="rad">
        {props.refs.map((letter, index) => (
          <Col className="square" key={index}>
            {index}
          </Col>
        ))}
      </Row>
      {fleet[0].map((array, fleetIndex) => (
        <Row className="rad" key={fleetIndex}>
          <Col className="square" key={fleetIndex}>
            {props.columns[fleetIndex]}
          </Col>
          {fleet[0][fleetIndex].map((shipObject, index) => (
            <Col
              className="square"
              data-coords={[index + 1, fleetIndex + 1]}
              key={index}
            >
              <button
                disabled={shipObject.hit}
                className={`${shipObject.ship !== null ? "active" : ""}`}
                value={shipObject}
                onClick={(e) =>
                  console.log(
                    shipObject,
                    e.target.parentElement.getAttribute("data-coords")
                  )
                }
              >
                {index + 1 + props.columns[fleetIndex]}
              </button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Gameboard;
