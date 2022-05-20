import React from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { useState } from "react";
import "../App.css";
import Gameboard from "../components/Gameboard";
import { Button } from "react-bootstrap";

export default function GamePage() {
    const socket = useSocketContext()
    socket.on('connected', (text) => {
      console.log(text)
    })
    const joinGame = () => {
      socket.emit('joinGame')
    }
    socket.on('HiRoom', () => {
      console.log('Server said hi to your room')
    })
    socket.on('userLeft', (message) => {
      console.log(message)
    })
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
      <Button className="w-auto" onClick={joinGame}>Join game</Button>
      <div className="gameUI">
        {/* First gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />

        {/* Second gameboard */}
        <Gameboard rows={row} columns={column} refs={ref} />
      </div>
    </>
  );
}
