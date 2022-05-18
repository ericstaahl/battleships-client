import React from "react";
import { useSocketContext } from "../contexts/SocketContext";

export default function GamePage() {
  const socket = useSocketContext()
  console.log(socket)
  return (
    <>
      <h1>Game page!</h1>
    </>
  );
}
