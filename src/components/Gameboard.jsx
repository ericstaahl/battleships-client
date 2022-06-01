import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import generateFleet from "../helpers/generateFleet"
import { useCallback, useEffect, useState } from "react"
import { useSocketContext } from "../contexts/SocketContext"


const Gameboard = (props) => {
  const socket = useSocketContext()

  const [ships, setShips] = useState([
    { size: 4, sunk: false, boxes: [] },
    { size: 3, sunk: false, boxes: [] },
    { size: 2, sunk: false, boxes: [] },
    { size: 2, sunk: false, boxes: [] },
  ])


  const [fleet, setFleet] = useState(null)
  let nyFleet = null
  const callFleet = useCallback(
    (fleet) => {
      console.log("THIS IS THE FLEET OMG", fleet)
      nyFleet = [...fleet]
    }, [fleet])


  // Import the fleet and map it out
  // generateFleet runs only once since it is in an useEffect without a dependency array.
  useEffect(() => {
    if (fleet === null) {
      const { newFleet, newShips } = generateFleet(ships)
      setShips(newShips)
      setFleet(newFleet, callFleet(newFleet))
    }

    // Cleanup function that runs when the component is unmounted.
    // Stops listening for "coordinatesFromServer".
  }, [callFleet, ships, fleet])

  useEffect(() => {
    socket.on("coordinatesFromServer", (coordinates) => {

      console.log(typeof coordinates)
      console.log("Coords from server:", coordinates)
      const newShips = [...ships]
      //const newFleet = [...fleet];
      let wasHit = false
      //let coordsHit = null

      const newCo = coordinates.split(",")
      const co1 = parseInt(newCo[0])
      const co2 = parseInt(newCo[1])

      console.log(co1, co2);

      console.log("FLEEEEEEEEEEEEEEET", nyFleet)


      newShips.forEach((ship) => {
        ship.boxes.forEach((box) => {
          if (box.coords.toString() === coordinates) {

            console.log("If is running")
            console.log(box)
            box.hit = true

            wasHit = true
            //coordsHit = box.coords

          }
        });
        // Check if ship has sunk
        const shipPartsHit = ship.boxes.filter((box) => box.hit === true)
        console.log("Ship parts hit")
        console.log(shipPartsHit)
        if (shipPartsHit.length === ship.boxes.length) {
          ship.sunk = true
        }
      });

      const sunkShips = newShips.filter((ship) => ship.sunk === true)
      if (sunkShips.length === 4) {

        socket.emit("gameOver")
        props.handleSetLose()
      }
      console.log("Running result of hit on line below")
      socket.emit("resultOfHit", { wasHit, shipsLeft: (ships.length - sunkShips.length) });
      if (wasHit) {
        nyFleet[0][co1 - 1][co2 - 1].hitShip = true
      }
      if (!wasHit) {
        nyFleet[0][co2 - 1][co1 - 1].hit = "splash"
        console.log("POSITION!!!!!!!!!!!", nyFleet[0][co1 - 1][co2 - 1])
      }
      setShips(newShips)

    });

    // Cleanup function that runs when the component is unmounted.
    // Stops listening for "coordinatesFromServer".
    return () => {
      socket.off("coordinatesFromServer")
    }
  }, [])

  if (fleet === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
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
                  className={`${shipObject.ship !== null ? "active" : ""} ${shipObject.hit === "splash" ? "water" : ""
                    } ${shipObject.hit === true ? "hit" : ""}`}
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
    </div>
  )
}

export default Gameboard;
