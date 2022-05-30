import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import generateFleet from "../helpers/generateFleet";
import { useEffect, useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";

const Gameboard = (props) => {
  const socket = useSocketContext();

  const [ships, setShips] = useState([
    { size: 4, sunk: false, boxes: [] },
    { size: 3, sunk: false, boxes: [] },
    { size: 2, sunk: false, boxes: [] },
    { size: 2, sunk: false, boxes: [] },
  ]);

  const [fleet, setFleet] = useState(null);

  // Import the fleet and map it out
  // generateFleet runs only once since it is in an useEffect without a dependency array.
  useEffect(() => {
    const { newFleet, newShips } = generateFleet(ships)
    setShips(newShips)
    setFleet(newFleet)

    socket.on("coordinatesFromServer", (coordinates) => {
      console.log(typeof coordinates);
      console.log("Coords from server:", coordinates);
      const newShips = [...ships]
      
      newShips.forEach(ship => {
        ship.boxes.forEach(box => {
          if (box.coords.toString() === coordinates) {
            console.log("If is running")
            console.log(box)
            box.hit = true
            setShips(newShips)
          }
        })
      });
    });
    // Cleanup function that runs when the component is unmounted.
    // Stops listening for "coordinatesFromServer".
    return () => {
      socket.off("coordinatesFromServer")
    }
  }, [])


  if (fleet === null) {
    return <p>Loading...</p>
  }

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
                className={`${shipObject.ship !== null ? "active" : ""} ${shipObject.hit === true ? "hit" : ""}`}
                value={shipObject}
                onClick={(e) =>
                  console.log(
                    shipObject,
                    e.target.parentElement.getAttribute("data-coords"),
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
