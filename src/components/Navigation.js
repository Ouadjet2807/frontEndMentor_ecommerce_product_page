import React, { useState } from 'react'

export default function Navigation({setCartModal, cartModal}) {


 const [currentUser, setCurrentUser] = useState(true)
 console.log(currentUser);
 
 const nav = ["Collections", "Men", "Women", "About", "Contact"]

  return (
    <div>
      <div className="logo">
        <img src="Assets/images/logo.svg" alt="" />
      </div>
      <ul>
        {nav.map((item, index) => {
            return <li key={`item_${index}`}><a href={`/${item}`}>{item}</a></li>
        })}
      </ul>
      <div className="cart">
        <div className='cart' onClick={() => setCartModal(!cartModal)}>
         <img src="Assets/images/icon-cart.svg" alt="cart-icon"/>
        </div>
      </div>
      {currentUser &&
      <div className="account">
        <a href="/Account">
        <img src="Assets/images/image-avatar.png" alt="" />
        </a>
      </div>
      }
    </div>
  )
}
