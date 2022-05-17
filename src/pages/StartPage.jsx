import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const StartPage = () => {
    

    return (

        <>

        <div class="container">

            <h1>BattleShips</h1>

            <form>

                <input type="text" placeholder="Name, please." />

            </form>

            <Button variant="info" as={Link} to="/GamePage" onclick="">Start Game</Button>

        </div>

        <div>

            <h2>How to play BattleShips!</h2>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt praesentium accusamus excepturi esse, iste architecto aspernatur alias ullam numquam temporibus asperiores cumque ab voluptatum illo, veniam magni porro ex. Minus.</p>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ex culpa soluta labore aut aperiam eos ipsum repellendus delectus neque. Aspernatur consequatur exercitationem iste unde a debitis blanditiis maiores suscipit?</p>

        </div>

        </>

    )
}

export default StartPage
