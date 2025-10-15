import React, { useEffect, useState, useRef } from 'react'
import useWindowDimensions from '../hook/useWindowDimensions';

export default function Navigation({setCartModal, cartModal, cartTotal, setCartButtonPosition}) {

 const {width} = useWindowDimensions();
 const [currentUser,   ] = useState(true)
 const [mobileNav, setMobileNav] = useState(false)

 const cartButtonRef = useRef()
 
 const nav = ["Collections", "Men", "Women", "About", "Contact"]  

 useEffect(() => {
  if(cartButtonRef.current) {
    setCartButtonPosition({
      top: cartButtonRef.current.getBoundingClientRect().top,
      left: cartButtonRef.current.getBoundingClientRect().left,
    })
  }
 }, [width])
 
  return (
    <nav className='navigation'>
      {width < 800 &&
      <div className="mobileNavMenu" onClick={() => setMobileNav(true)}>
        <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/icon-menu.svg" alt="menu-icon" />
      </div>
      }
      <div className="logo">
        <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/logo.svg" alt="logo" />
      </div>
      {width > 800 ?
      <ul>
        {nav.map((item, index) => {
          return <li key={`item_${index}`}><a href={`/${item}`}>{item}</a></li>
        })}
      </ul>
      :
      <>
      <div className={`mobileNav ${mobileNav ? "open" : "close"}`}>
        <div className="close_button">
          <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/icon-close.svg" alt="close-icon" onClick={() => setMobileNav(false)}/>
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
        <div className="cartBox" ref={cartButtonRef} onMouseEnter={() => setCartModal(true)} onMouseLeave={() => setCartModal(false)}>
          <div className='cart'>
          {cartTotal > 0 &&
          <div className="cartSum">
           <span>{cartTotal}</span>
          </div>
          }
            <a href="/Cart">
              <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/icon-cart.svg" alt="cart-icon"/>
            </a>
          </div>
        </div>
        {currentUser &&
        <div className="account">
          <a href="/Account">
          <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/image-avatar.png" alt="profile-avatar" />
          </a>
        </div>
        }
        </div>
    </nav>
  )
}
