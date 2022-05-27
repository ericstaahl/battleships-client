import { useSocketContext } from "../contexts/SocketContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGeneratefleet from "../hooks/useGeneratefleet";
import { useState } from "react";

let initialBattleBoard = [];
// A funtion to generate the initial battleboard instead of having 100 indiviual objects listed in the file
const generateBoard = () => {
  // Create the rows
  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    initialBattleBoard.push([]);
    // add 10 individual objects to the row
    for (let index = 0; index < 10; index++) {
      initialBattleBoard[rowIndex].push({ hitShip: false, hitWater: false });
    }
  }
};
// run the function
generateBoard();

const Gameboard = (props) => {
  const socket = useSocketContext();
  // Initial state is equal to initialBattleBoard.
  const [fleet, setFleet] = useState([initialBattleBoard]);

  //Testing if it disables the one that got hit even though the rest are disabled
  fleet[0][0][0].hitShip = true;

  socket.on("coordinatesFromServer", (coordinates) => {
    console.log(typeof coordinates);
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
            <Col
              className="square"
              data-coords={[index + 1, fleetIndex + 1]}
              key={index}
            >
              <button
                // disabled={shipObject}
                disabled={props.flagga || shipObject.hitShip}
                className={`${shipObject.hitShip === true ? "active" : ""}`}
                value={shipObject}
                onClick={(e) => {
                  console.log(
                    shipObject,
                    e.target.parentElement.getAttribute("data-coords")
                  );
                  socket.emit(
                    "coordinates",
                    e.target.parentElement.getAttribute("data-coords")
                  );
                }}
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
