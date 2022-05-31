import React from 'react'
import {Alert, Button} from 'react-bootstrap'
import { Link } from "react-router-dom"

export default function LoosingMessage() {
  return (
    <Alert variant="warning">
        <h2>Oh, no! All your ships got destroyed you lost this round!</h2>

        <hr />

        <Button
        className="play-again-button"
        id="play-again"
        variant="info"
        as={Link}
        to="/">
            Play Again?
        </Button>

    </Alert>
  )
}
