import { useState } from "react";

const useGeneratefleet = () => {
  const [fleet, setFleet] = useState([
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
  ]);

  const [ships, setShips] = useState([
    { size: 4, coordinates: [], sunk: false },
    { size: 3, coordinates: [], sunk: false },
    { size: 2, coordinates: [], sunk: false },
    { size: 2, coordinates: [], sunk: false },
  ]);

  //Function to get a random number
  function getRandomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function buildShip(size) {
    let test = getRandomInt(0, 1);
    console.log("test", test);
    if (test === 0) {
      let length = getRandomInt(0, 9);
      let row = getRandomInt(0, 10 - size);
      console.log("length:", length, "row: ", row);
      //Making sure it begins on the chosen position
      row = row - 1;
      for (let index = 0; index < size; index++) {
        row++;
        fleet[row][length] = "ship" + size;
        //console.log("start", row);
      }
    } else {
      let length = getRandomInt(0, 10 - size);
      let row = getRandomInt(0, 9);
      console.log("length:", length, "row: ", row);
      //Making sure it begins on the chosen position
      length = length - 1;
      for (let index = 0; index < size; index++) {
        length++;
        //Could put the ship object here
        fleet[row][length] = "ship" + size;
        //console.log("length", length);
      }
    }
  }

  //horizontal(4);
  buildShip(4);
  buildShip(3);

  return [fleet];
};

export default useGeneratefleet;
