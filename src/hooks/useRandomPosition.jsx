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
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
  ];

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
    let first = coordinates[align][interval];
    let array = [];

    //Getting as many coordinates as ship length
    for (let index = 0; index < size; index++) {
      const secondCo = coordinates[opposite][interval++];
      let firstCo = first;
      let co;

      //Making sure the letter always comes first
      if (typeof firstCo === "string") {
        co = firstCo + secondCo;
      } else {
        co = secondCo + firstCo;
      }

      if (boatCoordinates.includes(co)) {
        return;
      }

      //Save the coordinates for one boat to an array
      array.push(co.toString());
      //console.log(array);

      //Save the coordinates for one boat to an array
      //boats[size].coordinate.push(co);
    }
    return array;
  }

  useEffect(() => {
    //console.log("This is the coordinates " + getCoordinates(4));

    let generatedCo = getCoordinates(4);
    console.log("genererat ", generatedCo);

    //Check if the coordinates are already taken
    for (let index = 0; index < generatedCo.length; index++) {
      const element = generatedCo[index];

      //If it is abort mission
      if (boatCoordinates.includes(element)) {
        return;
      }

      boats[0].coordinate.push(generatedCo[index]);
      console.log("Yaaay This is the coordinates", boats[0].coordinate);
    }
  }, []);

  return [boats];
};

export default useRandomPosition;
