import React from 'react'

export default function LoosingMessage() {
  return (
    <Alert variant="warning">
        <h2>Oh, no! All your ships got destroyed you lost this round!</h2>

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
