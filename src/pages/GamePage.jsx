import React, { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";

export default function GamePage() {
  const socket = useSocketContext()
  useEffect(() => {
    socket.emit('joinGame')
  }, [])
  socket.emit('message')
  socket.on('connected', (text) => {
    console.log(text)
  })
  return (
    <>
      <h1>Game page!</h1>
    </>
  );
}
