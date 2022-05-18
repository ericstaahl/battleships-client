import React from "react";
import { useState } from "react";
import "../App.css";
import Gameboard from "../components/Gameboard";

export default function GamePage() {
  const [row, setRows] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const [column, setColumns] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  const [ref, setRef] = useState([
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  return (
    <>
      <h1>Battleships</h1>
      <div className="gameUI">
        {/* First gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />

        {/* Second gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />
      </div>
    </>
  );
}
