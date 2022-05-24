import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GamePage from "./pages/GamePage";
import StartPage from "./pages/StartPage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import SocketContext from "./contexts/SocketContext";

function App() {
  return (
    <div id="App">
      <SocketContext>
        <Routes>
          <Route path="/gameboard" element={<GamePage />} />
          <Route path="/" element={<StartPage />} />
        </Routes>
      </SocketContext>
    </div>
  );
}

export default App;
