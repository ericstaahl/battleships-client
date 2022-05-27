import { useState, useEffect } from "react";

const useGeneratefleet = () => {
  const fleet = [
    [{hit: true, ship: null}, {hit: true, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
    [{hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}, {hit: false, ship: null}],
  ];
  // for (let index = 0; index < 100; index++) {
  //   const box = {hit: false, ship: {hit: false, ship: null}}
  //   fleet.push(box)
  // }

  const [ships, setShips] = useState([
    { size: 4, sunk: false },
    { size: 3, sunk: false },
    { size: 2, sunk: false },
    { size: 2, sunk: false },
  ]);

  //Function to get a random number
  function getRandomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function buildShip(size) {
    //Randomize a position
    let position = getRandomInt(0, 1);
    console.log("What is the position", position);
    let generate = true;
    let busy = false;

    //As long as generate is true it will continue to create a new ship
    while (generate === true) {
      //Horizontal placement
      if (position === 0) {
        busy = false;
        let length = getRandomInt(0, 9);
        //Make sure the ship won't be placed outside the board
        let row = getRandomInt(0, 10 - size);
        //Making sure it begins on the chosen position
        row = row - 1;

        //Check every position/coordinate if it's busy
        for (let index = 0; index < size; index++) {
          row++;
          if (fleet[row][length].ship !== null) {
            console.log("OH NO... Busy");
            busy = true;
          }
        }

        //If all the spaces are empty, add our ship object to the board
        if (busy === false) {
          console.log("PASSED CHECK", size);
          row = row - size;
          for (let index = 0; index < size; index++) {
            row++;
            const found = ships.find((ship) => ship.size === size);
            console.log("Found:", found)
            fleet[row][length] = found;
          }
          generate = false;
        }
      } else {
        //Vertical placement
        busy = false;
        let length = getRandomInt(0, 10 - size);
        let row = getRandomInt(0, 9);
        console.log("length:", length, "row: ", row);
        length = length - 1;
        for (let index = 0; index < size; index++) {
          length++;
          if (fleet[row][length].ship !== null) {
            console.log("OH NO... Busy");
            busy = true;
          }
        }
        console.log("BUSY", busy);
        if (busy === false) {
          console.log("PASSED CHECK", size);
          length = length - size;
          for (let index = 0; index < size; index++) {
            length++;
            const found = ships.find((ship) => ship.size === size);
            fleet[row][length] = found;
            console.log("FROM IF STATEMENT");
          }
          generate = false;
        }
      }

      console.log(busy);
    }
  }

  buildShip(4);
  buildShip(3);
  buildShip(2);
  buildShip(2);

  return [fleet]
};

export default useGeneratefleet;
