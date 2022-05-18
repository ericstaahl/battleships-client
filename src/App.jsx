import "./App.css";
import GamePage from "./pages/GamePage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import SocketContext from "./contexts/SocketContext";

function App() {
  return (
    <div id="App">
      <SocketContext>
        <Container className="py-3">
          <Routes>
            <Route path="/gameboard" element={<GamePage />} />
          </Routes>
        </Container>
      </SocketContext>
    </div>
  );
}

export default App;
