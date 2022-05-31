import React from 'react'
import {Alert, Button} from 'react-bootstrap'

export default function WinMessage() {
  return (
    <Alert variant="success">
      <h2>Congrats! You won this round!</h2>

      <hr />

      <Button
        className="play-again-button"
        id="play-again"
        variant="info"
        onclick="">
        Play Again?
      </Button>

    </Alert>
  )
}
