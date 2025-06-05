import React from 'react'
import logoName from '../assets/logoName.svg'
import PlayStore from '../assets/Google play.png'

function Footer() {
  return (
    <>
    <div className='bg-blue-950 grid grid-cols-2'>

    <div>
        <img src={logoName} alt="" />
  
        <a href="">Home</a>
        <a href="">Contact Us</a>
        <a href="">Privacy policy</a>
        <a href="">Terms and conditions</a>
    </div>
    <div>
        <img src={PlayStore} alt="" />
    </div>
    </div>
    </>
  )
}

export default Footer