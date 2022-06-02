import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// The alert that will be sent when you lose the game
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
        to="/"
      >
        Back to start
      </Button>
    </Alert>
  );
}
