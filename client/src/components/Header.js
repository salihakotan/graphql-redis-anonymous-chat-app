import React from 'react'
import cuteGif from "../img/3.gif"
import manGif from "../img/4.gif"

function Header() {
  return (
    <div className='header'>
            <img className='headerGifs cuteGif' src={cuteGif} alt='gif'/>

        <h1>Anonymous Chat App</h1>
        <img className='headerGifs manGif' src={manGif} alt='gif'/>
    </div>
  )
}

export default Header