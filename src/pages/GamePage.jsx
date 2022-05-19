import React, { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";


export default function GamePage() {
  const socket = useSocketContext()
  socket.on('connected', (text) => {
    console.log(text)
  })
  const joinGame = () => {
    socket.emit('joinGame')
  }
  return (
    <>
      <h1>Game page!</h1>
      <button onClick={joinGame}>Join game</button>
    </>
  );
}
