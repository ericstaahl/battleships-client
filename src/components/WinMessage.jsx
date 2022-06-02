import React from 'react'
import {Alert, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Showing win alert when you win the game

export default function WinMessage() {
  return (
    <Alert variant="success">
      <h2>Congrats! You won this round!</h2>

      <hr />

      <Button
        className="play-again-button"
        id="play-again"
        variant="info"
        as={Link}
        to="/">
        Start Page
      </Button>

    </Alert>
  )
}
