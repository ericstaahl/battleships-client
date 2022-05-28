import { useState, useEffect } from "react";

const useGeneratefleet = (ships, handleShipsState) => {
  const fleet = [
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
  ];
  // for (let index = 0; index < 100; index++) {
  //   const box = {hit: false, ship: {hit: false, ship: null}}
  //   fleet.push(box)
  // }


  //Function to get a random number
  function getRandomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function buildShip(shipObject, shipsObjectIndex) {
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
        let row = getRandomInt(0, 10 - shipObject.size);
        //Making sure it begins on the chosen position
        row = row - 1;

        //Check every position/coordinate if it's busy
        for (let index = 0; index < shipObject.size; index++) {
          row++;
          if (fleet[row][length].ship !== null) {
            console.log("OH NO... Busy");
            busy = true;
          }
        }

        //If all the spaces are empty, add our ship object to the board
        if (busy === false) {
          console.log("PASSED CHECK", shipObject.size);
          row = row - shipObject.size;
          for (let index = 0; index < shipObject.size; index++) {
            row++;
            //const found = ships.find((ship) => ship.shipObject === shipObject);
            fleet[row][length].ship = shipObject;
            // Hopefully create a two way data binding between the current "box" and the ships object
            const newShips = [...ships]
            console.log("Index in the ships object:", shipsObjectIndex)
            newShips[shipsObjectIndex].boxes[index] = fleet[row][length]
            handleShipsState(newShips)
          }
          generate = false;
        }
      } else {
        //Vertical placement
        busy = false;
        let length = getRandomInt(0, 10 - shipObject.size);
        let row = getRandomInt(0, 9);
        console.log("length:", length, "row: ", row);
        length = length - 1;
        for (let index = 0; index < shipObject.size; index++) {
          length++;
          if (fleet[row][length].ship !== null) {
            console.log("OH NO... Busy");
            busy = true;
          }
        }
        console.log("BUSY", busy);
        if (busy === false) {
          console.log("PASSED CHECK", shipObject.size);
          length = length - shipObject.size;
          for (let index = 0; index < shipObject.size; index++) {
            length++;
            fleet[row][length].ship = shipObject;
            console.log("FROM IF STATEMENT");

            // // Hopefully create a two way data binding between the current "box" and the ships object
            // const newShips = [...ships]
            // console.log("Index in the ships object:", shipsObjectIndex)
            // newShips[shipsObjectIndex].boxes[index] = fleet[row][length]
            // handleShipsState(newShips)
          }
          generate = false;
        }
      }

      console.log(busy);
    }
  }

  buildShip(ships[0], 0);
  buildShip(ships[1], 1);
  buildShip(ships[2], 2);
  buildShip(ships[3], 3);

  return [fleet];
};

export default useGeneratefleet;
