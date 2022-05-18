import {Button, Form} from 'react-bootstrap/'
import { Link } from 'react-router-dom'

const StartPage = () => {
    

    return (

        <>
        
        <div className="ontainer">

            <div className='form-box'>

            <h1>BattleShips</h1>

            <Form className='text-center'>

                <Form.Group className="group-form">

                    <Form.Control className='form-input' id="form-input-name" type="text" placeholder="Name, please." />

                    <Form.Text>

                        Please, enter your name here.

                    </Form.Text>

                
                </Form.Group>

                <Button className="join-button" id="join-button-id" variant="info" as={Link} to="/GamePage" onclick="">Start Game</Button>

            </Form>

            

            </div>

        <div className="rules">

            <h2>How to play BattleShips!</h2>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt praesentium accusamus excepturi esse, iste architecto aspernatur alias ullam numquam temporibus asperiores cumque ab voluptatum illo, veniam magni porro ex. Minus.</p>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ex culpa soluta labore aut aperiam eos ipsum repellendus delectus neque. Aspernatur consequatur exercitationem iste unde a debitis blanditiis maiores suscipit?</p>

        </div>
        </div>

        </>

    )
}

export default StartPage
