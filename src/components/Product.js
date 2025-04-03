import React, { useEffect, useState } from 'react'
import ProductGallery from './ProductGallery';

export default function Product({data, cartModal, cartContent, setCartContent}) {

  console.log(data);
    

  const [quantity, setQuantity] = useState(0)

  const [currentImage, setCurrentImage] = useState()
  const [modal, setModal] = useState(false)
 


  const deleteProductFormCart = (id) => {
      let filterFromCart = cartContent.filter(item => item.id !== id)
      setCartContent(filterFromCart)
  }

  const handleQuantity = (e) => {

    console.log(e);
    
    if(e.target.parentElement.id === "minus" && quantity > 0) {
    
        setQuantity(prev => prev -= 1)
    } else if(e.target.parentElement.id === "plus" && quantity < data.stock) {
      
        setQuantity(prev => prev += 1)
    } 
  }

  const addToCart = () => {
    data.quantity = quantity

    setCartContent(prev => [data, ...prev])
  } 

  useEffect(() => {
    if(data && (data.images.length > 0)) {
        setCurrentImage(data.images[0].fullSize)
    }

    if(data.onSale) {
        data.reducedPrice = data.price * data.reductionPercentage / 100 
    }
  }, [data])

  console.log(data.reducedPrice * quantity);
  

  return (

      <div className='product'>
        {modal && 
            <div className="modal">
                <div className="modalBox">
                <ProductGallery 
                    images={data.images} 
                    currentImage={currentImage} 
                    setCurrentImage={setCurrentImage} 
                    modal={modal} 
                    setModal={setModal}/> 
                </div>
                <div className="overlay" onClick={() => setModal(false)}></div>
            </div>
        }
        {cartModal &&
            <div className="cartModal">
                <div className="entitle">
                 <h4>Cart</h4>
                </div>
                {cartContent.length > 0 ? 
                    <>
                        {cartContent.map(item => (
                            <div className="cartItem">
                                <img src={data.images[0].thumbnail} alt="" />
                                <div className="info">
                                    <p>{data.title}</p>
                                    <p>${data.reducedPrice} x {quantity} <span className='total'>${data.reducedPrice * quantity}</span></p>
                                </div>
                                <div className={`delete ${quantity === 0 ? `notAllowed` : null} `} onClick={() => deleteProductFormCart(item.id)}>
                                    <img src="Assets/images/icon-delete.svg" alt="" />
                                </div>
                            </div>
                        ))}
                    <button>
                        <a href="/Checkout">Checkout</a>
                    </button>
                    </>

                    :

                    <p>Your cart is empty</p>
                    
                }
            </div>
        }
        <ProductGallery 
            images={data.images} 
            currentImage={currentImage} 
            setCurrentImage={setCurrentImage} 
            modal={modal} 
            setModal={setModal}/>
        <div className="info">
            <h3 className="brand">{data.brand}</h3>
            <h1 className="title">{data.title}</h1>
            <div className="description">{data.description}</div>
            <div className="price">
                <span className='current_price'>${data.reducedPrice}</span>
                {data.onSale && 
                <>
                  <span className="percentage">{data.reductionPercentage}%</span>
                  <span className="price_before_reduction">${data.price}</span>
                </>
                }
            </div>

            <div className="quantity">
                <div id="minus" className={`minus ${(quantity === 0 ) ? `min` : null}`} onClick={(e) => handleQuantity(e)}>
                    <img src="Assets/images/icon-minus.svg" alt=""/>
                </div>
                <span>{quantity}</span>
                <div id="plus" className={`plus ${(quantity === data.stock) ? `max` : null}`}  onClick={(e) => handleQuantity(e)}>
                    <img src="Assets/images/icon-plus.svg" alt=""/>
                </div>
            </div>
            <button className="add_to_cart" onClick={() => addToCart()}><img src="Assets/images/icon-cart.svg"></img> Add to cart</button>
        </div>
    </div>
  )
}
