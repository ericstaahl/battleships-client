import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import "../App.css";

export default function GamePage() {
  const [row, setRows] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const [column, setColumns] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  const [index, setIndex] = useState([
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  return (
    <>
      <h1>Battleships</h1>
      <div className="gameUI">
        {/* First gameboard */}
        <Container className="gameboard">
          {/* Reference row*/}
          <Row className="rad">
            {index.map((letter, index) => (
              <Col className="square" key={index}>
                {letter}
              </Col>
            ))}
          </Row>
          {row.map((object, index) => (
            <Row className="rad" key={index}>
              <Col className="square" key={index}>
                {row[index]}
              </Col>
              {column.map((something, index) => (
                <Col className="square" key={index}>
                  <button
                    onClick={(e) =>
                      console.log(row[object - 1] + column[index])
                    }
                  >
                    {row[object - 1]}
                    {column[index]}
                  </button>
                </Col>
              ))}
            </Row>
          ))}
        </Container>

        {/* Second gameboard */}
        <Container className="gameboard">
          {/* Reference row*/}
          <Row className="rad">
            {index.map((letter, index) => (
              <Col className="square" key={index}>
                {letter}
              </Col>
            ))}
          </Row>
          {row.map((object, index) => (
            <Row className="rad" key={index}>
              <Col className="square" key={index}>
                {row[index]}
              </Col>
              {column.map((something, index) => (
                <Col className="square" key={index}>
                  <button
                    onClick={(e) =>
                      console.log(row[object - 1] + column[index])
                    }
                  >
                    {row[object - 1]}
                    {column[index]}
                  </button>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </div>
    </>
  );
}
