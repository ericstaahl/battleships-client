import React, { useState, useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import "../App.css";
import Gameboard from "../components/Gameboard";
import { Button } from "react-bootstrap";
import OpponentGameBoard from "../components/OpponentGameboard";
import Alert from "react-bootstrap/Alert";

export default function GamePage() {
  // get socket from the socket context.
  const socket = useSocketContext();
  // States to control wether a button can be pressed and to display messages.
  const [waitingForGame, setWaitingForGame] = useState(false);
  const [gameFound, setGameFound] = useState(false);

  // Tell the server that the user wants to join a game
  const joinGame = () => {
    setGameFound(false);
    setWaitingForGame(true);
    socket.emit("joinGame");
  };

  // Start listening on the following emits
  useEffect(() => {
    socket.on("connected", (text) => {
      console.log(text);
    });

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
  }, []);

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

  const [alert, setAlert] = useState("success");
  const [message, setMessage] = useState("Yay It's your turn!");

  const ref = ["", "A", "B", "C", "D", "F", "G", "H", "I", "J", "K"];

  const [flag, setFlag] = useState();

  function changeFlag(boolean, string, message) {
    setFlag(boolean);
    setAlert(string);
    setMessage(message);
  }

  useEffect(() => {
    socket.on("playerTurn", (id) => {
      if (socket.id === id) {
        setFlag(false);
        console.log("You get to start!!!", flag);
        setMessage("Yay It's your turn!");
        setAlert("success");
      } else {
        setFlag(true);
        console.log("Aw it's the other players turn...", flag);
        setMessage("Aw it's the other players turn...");
        setAlert("danger");
      }
    });
  }, []);

  socket.on("changeTurn", (msg) => {
    console.log(msg);
    setFlag(false);
    setAlert("success");
    setMessage("Yay It's your turn!");
  });

  return (
    <>
      <h1>Battleships</h1>
      <Button className="w-auto" disabled={waitingForGame} onClick={joinGame}>
        Join game
      </Button>
      {waitingForGame && <p>Waiting for a game...</p>}
      {gameFound && <p>A game was found!</p>}
      {gameFound && (
        <div className="gameUI">
          {/* First gameboard */}
          <div className="turn">
            <Alert key={alert} variant={alert}>
              {message}
            </Alert>
            <Gameboard rows={row} columns={column} refs={ref} flagga={flag} />
          </div>

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
    </>
  );
}
