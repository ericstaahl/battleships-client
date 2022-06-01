import React, { useState, useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import "../App.css";
import Gameboard from "../components/Gameboard";
import Waves from "../components/Waves";
import Header from "../components/Header";
import WinMessage from "../components/WinMessage";
import { Button } from "react-bootstrap";
import OpponentGameBoard from "../components/OpponentGameboard";
import Alert from "react-bootstrap/Alert";
import LoosingMessage from "../components/LoosingMessage";


export default function GamePage() {
  // get socket from the socket context.
  const socket = useSocketContext();
  // States to control wether a button can be pressed and to display messages.
  const [waitingForGame, setWaitingForGame] = useState(false);
  const [gameFound, setGameFound] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false)

  // Tell the server that the user wants to join a game
  const joinGame = () => {
    
    setGameFound(false);
    setWaitingForGame(true);
    setLose(false)
    setWin(false)
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
      setGameInProgress(true)
      setGameFound(false);
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

  const [flag, setFlag] = useState()

  const [win, setWin] = useState(false)

  const [lose, setLose] = useState(false)

  const handleSetLose= () => {
    setLose(true)
    
  }

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
    socket.on("changeTurn", (msg) => {
      console.log(msg);
      setFlag(false);
      setAlert("success");
      setMessage("Yay It's your turn!");
    });
    socket.on('win', () => {
      console.log("Congratulations, you won!")
      setWin(true)
    })
    socket.on('matchIsOver', () => {
      console.log("The match is over")
      setGameInProgress(false)
    })
  }, []);

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
      {win && <WinMessage />}
      {lose && <LoosingMessage />}
      {gameInProgress && (
        <div className="gameUI">
          {/* First gameboard */}
          <div className="turn">
            <Alert key={alert} variant={alert}>
              {message}
            </Alert>
            <Gameboard handleSetLose={handleSetLose} rows={row} columns={column} refs={ref} flagga={flag} />
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
      <Waves />
    </>
  );
}
