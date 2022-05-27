import { useSocketContext } from "../contexts/SocketContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGeneratefleet from "../hooks/useGeneratefleet";
import { useState } from "react";

const Gameboard = (props) => {
  const socket = useSocketContext();
  const [fleet, setFleet] = useState([[
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]]);

  socket.on("coordinatesFromServer", (coordinates) => {
    console.log(typeof coordinates)
    console.log("Coords from server:", coordinates);
  });
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
            <Col className="square" data-coords={[index + 1, fleetIndex + 1]} key={index}>
              <button
                disabled={shipObject}
                className={`${shipObject !== null ? "active" : ""}`}
                value={shipObject}
                onClick={(e) => {
                  console.log(shipObject, e.target.parentElement.getAttribute('data-coords'))
                  socket.emit("coordinates", e.target.parentElement.getAttribute('data-coords'));
                }}
              >
                {(index + 1) + props.columns[fleetIndex]}
              </button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Gameboard;
