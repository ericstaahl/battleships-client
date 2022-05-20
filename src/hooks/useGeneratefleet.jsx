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

  let x = 4;
  let y = 2;

  console.log(fleet[y][x]);
  for (let index = 0; index < x; index++) {
    //const element = array[index];
    setFleet((fleet[y][x + index] = "ship1"));
  }
  console.log(fleet[y][x]);
  const ship1 = { size: 3, sunk: false };

  return [fleet];
};

export default useGeneratefleet;
