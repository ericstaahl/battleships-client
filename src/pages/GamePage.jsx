import React, { useState, useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
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
  const [gameInProgress, setGameInProgress] = useState(false);
  const [opponentShipsLeft, setOpponentShipsLeft] = useState(4);

  // Tell the server that the user wants to join a game
  const joinGame = () => {
    setGameFound(false);
    setWaitingForGame(true);
    setLose(false);
    setWin(false);
    setOpponentShipsLeft(4);
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
      setGameInProgress(true);
      setGameFound(false);
    });

    socket.on("userLeft", (message) => {
      console.log(message);
    });
    return () => {
      socket.off("connected");
      socket.off("HiRoom");
      socket.off("gameFound");
      socket.off("userLeft");
    };
  }, [socket]);

  const row = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const column = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // UseState for whos turn it is and adding alert to it
  const [alert, setAlert] = useState("success");
  const [message, setMessage] = useState("Yay It's your turn!");

  const ref = ["", "A", "B", "C", "D", "F", "G", "H", "I", "J", "K"];

  const [flag, setFlag] = useState();

  // useSate for adding lose and win message at the end of game
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  // adding function for loosnig to send to other component
  const handleSetLose = () => {
    setLose(true);
  };
  // Function that will change the color and text of the alert message
  function changeFlag(boolean, string, message) {
    setFlag(boolean);
    setAlert(string);
    setMessage(message);
  }

  // useEffect for randomizing who takes the first turn in the game
  useEffect(() => {
    console.log("GamePage sockets initializing");
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
      // Listens for the different messages and dose what comes
    socket.on("changeTurn", (msg) => {
      console.log(msg);
      setFlag(false);
      setAlert("success");
      setMessage("Yay It's your turn!");
    });
    socket.on("win", () => {
      console.log("Congratulations, you won!");
      setWin(true);
    });
    socket.on("matchIsOver", () => {
      console.log("The match is over");
      setGameInProgress(false);
    });
    socket.on("shipsLeft", (data) => {
      console.log("resultOfHit in GamePage (opponent gameboard)");
      console.log(data);
      if (data) {
        setOpponentShipsLeft(data.shipsLeft);
      }
    });
    return () => {
      socket.off("playerTurn");
      socket.off("changeTurn");
      socket.off("win");
      socket.off("matchIsOver");
      socket.off("shipsLeft");
    };
  }, [flag, socket]);

  return (
    <>
      <Header />

      <div className="text-center">
        <Button
          className={`w-auto joinGameButton ${
            gameInProgress === true ? "d-none" : ""
          }`}
          size="lg"
          disabled={waitingForGame}
          onClick={joinGame}
        >
          Join game
        </Button>
      </div>

      {waitingForGame && <p>Waiting for a game...</p>}

      {gameFound && <p>A game was found!</p>}

      {win && <WinMessage />}

      {lose && <LoosingMessage />}

      {gameInProgress && (
        <>
          <div>
            <p>Ships left for the opponent: {opponentShipsLeft}</p>
          </div>

          <div className="gameUI">
            {/* First gameboard */}
            <div className="turn">
              <Alert key={alert} variant={alert}>
                {message}
              </Alert>
              <Gameboard
                handleSetLose={handleSetLose}
                rows={row}
                columns={column}
                refs={ref}
                flagga={flag}
              />
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

        </>
      )}

      <Waves />
      
    </>
  );
}
