import React from 'react'

export default function LoosingMessage() {
  return (
    <Alert variant="warning">
        Oh, no! All your ships got destroyed you lost this round!

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
