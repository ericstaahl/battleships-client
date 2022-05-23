import { useEffect, useState } from "react";

const useRandomPosition = () => {
  const coordinates = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  ];
  const [boats, setBoats] = useState([
    { size: 4, coordinate: [] },
    { size: 3, coordinate: [] },
    { size: 2, coordinate: [] },
    { size: 2, coordinate: [] },
  ]);

  //const [existence, setExistence] = useState("");

  const boatCoordinates = [
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "B1",
    "B2",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
  ];

  //Function to get a random number
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //Function that will return an array of coordinates for a ship
  function getCoordinates(size) {
    //Vertical or horizontal? (alignment on the board)
    let align = getRandomInt(2);
    let opposite;

    //Calculate the opposite aligment so we know
    //where the length of the ship can go
    if (align === 0) {
      opposite = 1;
    } else {
      opposite = 0;
    }

    //Making sure it cannot be placed outside the board
    let interval = getRandomInt(10 - size);
    let start = coordinates[align][interval];
    let array = [];

    //Getting as many coordinates as ship length
    for (let index = 0; index < size; index++) {
      const lengthCo = coordinates[opposite][interval++];
      let startCo = start;
      let co;

      //Making sure the letter always comes first
      if (typeof startCo === "string") {
        co = startCo + lengthCo;
      } else {
        co = lengthCo + startCo;
      }

      //make sure coordinates are a string and not mixed
      co = co.toString();

      //Save the coordinates for one boat to an array
      array.push(co);

      //Save the coordinates for one boat to an array
      //boats[size].coordinate.push(co);
    }
    return array;
  }

  //   useEffect(() => {
  //     setBoats(
  //       (boats[0].coordinate = [...getCoordinates(4)]),
  //       (boats[1].coordinate = [...getCoordinates(3)]),
  //       (boats[2].coordinate = [...getCoordinates(2)]),
  //       (boats[3].coordinate = [...getCoordinates(2)])
  //     );
  //   }, []);

  useEffect(() => {
    function checkBoat(boat) {
      //Check if the coordinates are already taken
      for (let index = 0; index < boat.length; index++) {
        const element = boat[index];

        //If it is change boat
        if (boatCoordinates.includes(element)) {
          console.log("already exists", boat.length, boat);
          boat = getCoordinates(boat.length);
          console.log("New boat ", boat);
        }
      }
      return boat;
    }

    let boat4 = checkBoat(getCoordinates(4));
    //console.log("boat4 ", boat4);
    for (let index = 0; index < boat4.length; index++) {
      const element = boat4[index];
      boatCoordinates.push(element);
    }
    let boat3 = checkBoat(getCoordinates(3));
    //console.log("boat3 ", boat3);
    for (let index = 0; index < boat3.length; index++) {
      const element = boat3[index];
      boatCoordinates.push(element);
    }
    let boat2_1 = checkBoat(getCoordinates(2));
    //console.log("boat2.1 ", boat2_1);
    for (let index = 0; index < boat2_1.length; index++) {
      const element = boat2_1[index];
      boatCoordinates.push(element);
    }
    let boat2_2 = checkBoat(getCoordinates(2));
    //console.log("boat2.2 ", boat2_2);
    for (let index = 0; index < boat2_2.length; index++) {
      const element = boat2_2[index];
      boatCoordinates.push(element);
    }

    //Save the coordinates to the boats
    setBoats(
      (boats[0].coordinate = [...boat4]),
      (boats[1].coordinate = [...boat3]),
      (boats[2].coordinate = [...boat2_1]),
      (boats[3].coordinate = [...boat2_2])
    );

    console.log(boatCoordinates);
    console.log("The fleet", boats);
  }, []);

  return [boats];
};

export default useRandomPosition;
