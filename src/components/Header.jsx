import React from 'react'
// Header component with logo in it

export default function headerComponent() {

  const logo = require('../assets/img/g1133.png')

  return (
    <div className="header-img-box">

        <img className='responsive' src={logo} alt="Battleships" />
        
    </div>
  )
}
