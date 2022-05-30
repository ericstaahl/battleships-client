import { Button, Form } from "react-bootstrap/";
import { Link } from "react-router-dom";
import Waves from "../components/Waves";


const StartPage = () => {
  return (
    <>
      <div className="container">
        <div className="button-box">
          <h1>BattleShips</h1>
            <Button
              className="join-button"
              size="lg"
              id="join-button-id"
              variant="info"
              as={Link}
              to="/gameboard"
              onClick=""
            >
              Go to lobby
            </Button>
        </div>

        <div className="rules">
          <h2>How to play BattleShips!</h2>

          <p>
            When you play Battleships you will see two boards, 
            one that shows where your ships are and one that shows 
            a blank board where you are supposed to guess where your opponets
            ships are! When you have destroyed all your opponents ships the game ends
            or when they have destroyed yours.
          </p>

          <p>
            To do this you have to click on a box that you think the ship is on! 
            If you guess correctly the box will turn green but if you missed and 
            hit water it will turn red. There are four boats, two that are 2 boxes long
            one that is 3 and one that is four.
            You will be able to see how many boats your opponent got left. 
            You will take turns shooting and who starts is random.
          </p>
        </div>
        <Waves />
      </div>
    </>
  );
};

export default StartPage;
