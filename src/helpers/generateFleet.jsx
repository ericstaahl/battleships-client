
const useGeneratefleet = (ships) => {
  console.log("generateFleet is running")
  let initialBattleBoard = []
  // A funtion to generate the initial battleboard instead of having 100 indiviual objects listed in the file
  const generateBoard = () => {
    // Create the rows
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      initialBattleBoard.push([])
      // add 10 individual objects to the row
      for (let index = 0; index < 10; index++) {
        initialBattleBoard[rowIndex].push({ hit: false, ship: null, coords: [index + 1, rowIndex + 1] })
      }
    }
  }
  // run the function
  generateBoard()

  const newShips = [...ships]

  const fleet =
    initialBattleBoard
    ;
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
            fleet[row][length].ship = shipObject;
            // Create a circular reference between the current "box" and the ships object
            console.log("Index in the ships object:", shipsObjectIndex)
            fleet[row][length].ship.boxes.push(fleet[row][length])
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

            // Create a circular reference between the current "box" and the ships object
            fleet[row][length].ship.boxes[index] = fleet[row][length]

          }
          generate = false;
        }
      }

      console.log(busy);
    }
  }

  // Use the copy of the ships object instead
  buildShip(newShips[0], 0);
  buildShip(newShips[1], 1);
  buildShip(newShips[2], 2);
  buildShip(newShips[3], 3);

  // Return both the new fleet and the new ships object
  return { newFleet: [fleet], newShips: newShips };
};

export default useGeneratefleet;
