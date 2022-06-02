
import { useSocketContext } from "../contexts/SocketContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useCallback, useEffect, useState } from "react";

// Used for saving the clicked coordinates while waiting for a response if you hit or not
let lastHitPosition = null

const Gameboard = (props) => {
  // A funtion to generate the initial battleboard instead of having 100 indiviual objects listed in the file
  const generateBoard = useCallback(() => {
    let initialBattleBoard = [];
    console.log("Generate function is running")
    // Create the rows
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      initialBattleBoard.push([])
      // add 10 individual objects to the row
      for (let index = 0; index < 10; index++) {
        initialBattleBoard[rowIndex].push({ hitShip: false, hitWater: false, coords: [index + 1, rowIndex + 1] })
      }
    }
    return initialBattleBoard
  }, [])

  const socket = useSocketContext()
  // Initial state is equal to initialBattleBoard (which is returned by generateBoard).
  const [fleet, setFleet] = useState([generateBoard()])

  useEffect(() => {
    // Listens for the result of the users move and edits the "box" (or square)
    // to display whether it hit a ship or not.
    socket.on("resultOfHit", (data) => {
      const newFleet = [...fleet]
      console.log(data)
      console.log(lastHitPosition)
      if (data.wasHit) {
        newFleet[0][lastHitPosition[1] - 1][lastHitPosition[0] - 1].hitShip = true
      }
      if (!data.wasHit) {
        newFleet[0][lastHitPosition[1] - 1][lastHitPosition[0] - 1].hitWater = true
      }
      setFleet(newFleet)
    });
    //Cleanup function to remove listener
    return () => {
      console.log("OpponentGameboard is unmounting")
      socket.off("resultOfHit")
    }
  }, [fleet, socket])

  return (
    <Container className="gameboard opponent">
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
              //Disable the button when any of these properties are truthy.
                disabled={
                  props.flagga || shipObject.hitShip || shipObject.hitWater
                }
                className={`${shipObject.hitShip === true ? "active" : ""} ${shipObject.hitWater === true ? "miss" : ""
                  }`}
                value={shipObject}
                onClick={(e) => {
                  console.log(
                    shipObject,
                    e.target.parentElement.getAttribute("data-coords"),
                    )
                    // Save the coordinates of the clicked "box" so that it can be used for changing 
                    // the color of it when the result has come back.
                    lastHitPosition = shipObject.coords
                    
                    socket.emit(
                      // Get the coordinates from the parent element's data attribute property
                      "coordinates",
                    e.target.parentElement.getAttribute("data-coords")
                  )
                  // Let the opponent know that it's their turn
                  socket.emit("madeMyMove", "It's your turn")

                  props.changeflagga(
                    true,
                    "danger",
                    "Aw it's the other players turn..."
                  )
                }}
              >
                {index + 1 + props.columns[fleetIndex]}
              </button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default Gameboard;
