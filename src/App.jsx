import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import GamePage from "./pages/GamePage";
import StartPage from "./pages/StartPage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import './assets/scss/App.scss'

function App() {
  return (
    <div id="App">
      <Container className="py-3">
        <Routes>
          <Route path="/gameboard" element={<GamePage />} />
          <Route path="/startpage" element={<StartPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
