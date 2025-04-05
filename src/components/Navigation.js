import React, { useEffect, useState } from 'react'
import useWindowDimensions from '../hook/useWindowDimensions';

export default function Navigation({setCartModal, cartModal, cartTotal}) {

 const {width} = useWindowDimensions();
 const [currentUser, setCurrentUser] = useState(true)
 const [mobileNav, setMobileNav] = useState(false)
 
 const nav = ["Collections", "Men", "Women", "About", "Contact"]  
 
  return (
    <nav className='navigation'>
      {width < 429 &&
      <div className="mobileNavMenu" onClick={() => setMobileNav(true)}>
        <img src="Assets/images/icon-menu.svg" alt="" />
      </div>
      }
      <div className="logo">
        <img src="Assets/images/logo.svg" alt="" />
      </div>
      {width > 426 ?
      <ul>
        {nav.map((item, index) => {
          return <li key={`item_${index}`}><a href={`/${item}`}>{item}</a></li>
        })}
      </ul>
      :
      <>
      <div className={`mobileNav ${mobileNav ? "open" : "close"}`}>
        <div className="close_button">
          <img src="Assets/images/icon-close.svg" alt="" onClick={() => setMobileNav(false)}/>
        </div>
        <ul>
          {nav.map((item, index) => {
            return <li key={`item_${index}`}><a href={`/${item}`}>{item}</a></li>
          })}
        </ul>
      </div>
      {mobileNav &&
      <div className="calc"></div>
      }
      </>
      }
      <div className="right">
        <div className="cartBox" onMouseEnter={() => setCartModal(true)} onMouseLeave={() => setCartModal(false)}>
          <div className='cart'>
          {cartTotal > 0 &&
          <div className="cartSum">
           <span>{cartTotal}</span>
          </div>
          }
            <a href="/Cart">
              <img src="Assets/images/icon-cart.svg" alt="cart-icon"/>
            </a>
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
    </nav>
  )
}
