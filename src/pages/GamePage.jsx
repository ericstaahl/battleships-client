import React from "react";
import { useSocketContext } from "../contexts/SocketContext";
import "../App.css";
import Gameboard from "../components/Gameboard";
import { Button, Form } from "react-bootstrap";
import useGeneratefleet from "../hooks/useGeneratefleet";
import { useState, useEffect } from "react";
import OpponentGameBoard from "../components/OpponentGameboard";
import Waves from "../components/Waves";
import Header from "../components/Header";

export default function GamePage() {
  // const fleet = useGeneratefleet();
  // console.log("from gamepage, fleet", fleet);
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

  const ref = ["", "A", "B", "C", "D", "F", "G", "H", "I", "J", "K"];

  const [flag, setFlag] = useState();

  function changeFlag(boolean) {
    setFlag(boolean);
  }
  useEffect(() => {
    socket.on("playerTurn", (id) => {
      if (socket.id === id) {
        setFlag(false);
        console.log("You get to start!!!", flag);
      } else {
        setFlag(true);
        console.log("Aw it's the other players turn...", flag);
      }
    });
  }, []);

  socket.on("changeTurn", (msg) => {
    console.log(msg);
    setFlag(false);
  });

  return (
    <>
      <Header />
      <div className="text-center">
      <Button className="w-auto" size="lg" disabled={waitingForGame} onClick={joinGame}>
        Join game
      </Button>
      </div>
      {waitingForGame && <p>Waiting for a game...</p>}
      {gameFound && <p>A game was found!</p>}
      {gameFound && (
        <div className="gameUI">
          {/* First gameboard */}
          <Gameboard rows={row} columns={column} refs={ref} flagga={flag} />

          {/* Second gameboard */}
          <OpponentGameBoard
            rows={row}
            columns={column}
            refs={ref}
            flagga={flag}
            changeflagga={changeFlag}
          />
        </div>
      )}
      <Waves />
    </>
  );
}
