import React from "react";
import { useSocketContext } from "../contexts/SocketContext";
import "../App.css";
import Gameboard from "../components/Gameboard";
import { Button } from "react-bootstrap";
import useRandomPosition from "../hooks/useRandomPosition";
import useGeneratefleet from "../hooks/useGeneratefleet";

export default function GamePage() {
  const fleet = useGeneratefleet();
  console.log("from gamepage, fleet", fleet);
  const socket = useSocketContext();
  socket.on("connected", (text) => {
    console.log(text);
  });
  const joinGame = () => {
    socket.emit("joinGame");
  };
  const row = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const column = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const ref = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <>
      <h1>Battleships</h1>
      <Button className="w-auto" onClick={joinGame}>
        Join game
      </Button>
      <div className="gameUI">
        {/* First gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />

        {/* Second gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />
      </div>
    </>
  );
}
