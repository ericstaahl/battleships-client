import React from "react";
import { useSocketContext } from "../contexts/SocketContext";
import "../App.css";
import Gameboard from "../components/Gameboard";
import { Button } from "react-bootstrap";
import useRandomPosition from "../hooks/useRandomPosition";
import useGeneratefleet from "../hooks/useGeneratefleet";
import { useState } from "react";

export default function GamePage() {
  const fleet = useGeneratefleet();
  console.log("from gamepage, fleet", fleet);
  const socket = useSocketContext();
  const [waitingForGame, setWaitingForGame] = useState(false);
  const [gameFound, setGameFound] = useState(false);
  socket.on("connected", (text) => {
    console.log(text);
  });
  const joinGame = () => {
    setGameFound(false);
    setWaitingForGame(true);
    socket.emit("joinGame");
  };
  socket.on("HiRoom", () => {
    console.log("Server said hi to your room");
  });
  socket.on("gameFound", () => {
    setWaitingForGame(false);
    setGameFound(true);
  });
  socket.on("userLeft", (message) => {
    console.log(message);
  });
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

  const ref = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <>
      <h1>Battleships</h1>
      <Button className="w-auto" disabled={waitingForGame} onClick={joinGame}>
        Join game
      </Button>
      {waitingForGame && <p>Waiting for a game...</p>}
      {gameFound && <p>A game was found!</p>}
      <div className="gameUI">
        {/* First gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />

        {/* Second gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />
      </div>
    </>
  );
}
