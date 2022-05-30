import React from 'react'

export default function WinMessage() {
  return (
    <Alert variant="success">
        Congrats! You won this round!

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
