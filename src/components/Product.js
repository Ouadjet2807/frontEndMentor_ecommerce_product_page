import React, { useEffect, useState } from 'react'
import ProductGallery from './ProductGallery';
import GalleryModal from './GalleryModal';
import useWindowDimensions from '../hook/useWindowDimensions';

export default function Product({data, cartModal, setCartModal, cartContent, setCartContent, cartButtonPosition, setCartTotal}) {
    

  const { width } = useWindowDimensions()
  const [quantity, setQuantity] = useState(0)

  const [currentImage, setCurrentImage] = useState(data.images[0])
  const [modal, setModal] = useState(false)
 


  const deleteProductFromCart = (id) => {
      setCartContent(() => {
        let filterFromCart = cartContent.filter(item => item.id !== id)

        if(filterFromCart.length > 0) {
            const totalQuantity = filterFromCart.reduce((sum, item) => sum + item.quantity, 0);
            setCartTotal(totalQuantity);
  
        } else {
            setCartTotal(0)
        }
        

        return filterFromCart;
    })
      
      
  }

  const handleQuantity = (e) => {
    
    if(e.target.parentElement.id === "minus" && quantity > 0) {
    
        setQuantity(prev => prev -= 1)
    } else if(e.target.parentElement.id === "plus" && quantity < data.stock) {
      
        setQuantity(prev => prev += 1)
    } 
  }

  const addToCart = () => {

     const newItem = {
    ...data,
    quantity,
    amount: data.reducedPrice * quantity,
  };

  setCartContent(prevCart => {
    const existingItem = prevCart.find(item => item.id === newItem.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = prevCart.map(item =>
        item.id === newItem.id
          ? {
              ...item,
              quantity: item.quantity + newItem.quantity,
              amount: item.amount + newItem.amount,
            }
          : item
      );
    } else {
      updatedCart = [newItem, ...prevCart];
    }


    const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartTotal(totalQuantity);

    return updatedCart;
  });

    setQuantity(0)
    
  } 

  useEffect(() => {
    if(data && (data.images.length > 0)) {
        setCurrentImage(data.images[0])
    }

    if(data.onSale) {
        data.reducedPrice = data.price * data.reductionPercentage / 100 
    }
  }, [data])
  

  return (

      <div className='product'>
        {modal && 
            <GalleryModal
              images={data.images} 
              currentImage={currentImage} 
              setCurrentImage={setCurrentImage} 
              modal={modal} 
              setModal={setModal}/> 
        }
        {cartModal &&
            <div className="cartModal" onMouseEnter={() => setCartModal(true)} onMouseLeave={() => setCartModal(false)} style={{top: `${width > 800 ? `${(cartButtonPosition.top / 1.05)}px` : "6%"}`, left: `${width > 800 ? `${(cartButtonPosition.left / 1.2)}px`: "50%"}`}}>
              <div className="modalBox">
                <div className="entitle">
                 <h4>Cart</h4>
                </div>
                <div className='cartContainer'>
                {cartContent.length > 0 ? 
                      <>
                        {cartContent.map((item, index) => (
                            <div className='cartItem' key={`item_${index}`}>
                                <img src={item.images[0].thumbnail} alt="thumbnail" />
                                <div className="info">
                                    <p className='name'>{item.title}</p>
                                    <p className='price_and_quantity'>${item.reducedPrice.toFixed(2)} x {item.quantity} <span className='total'>${item.amount.toFixed(2)}</span></p>
                                </div>
                                <div className="delete" onClick={() => deleteProductFromCart(item.id)}>
                                    <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/icon-delete.svg" alt="delete-icon" />
                                </div>
                            </div>
                        ))}
                    <button>
                        <a href="/Checkout">Checkout</a>
                    </button>
                </>

                :

                <p>Your cart is empty.</p>
                   
                   
                }
                </div>
              </div>
            </div>
        }
        <ProductGallery 
            images={data.images} 
            currentImage={currentImage} 
            setCurrentImage={setCurrentImage} 
            modal={modal} 
            setModal={setModal}/>
        <div className="info">
            <p className="brand">{data.brand}</p>
            <h1 className="title">{data.title}</h1>
            <div className="description"><p>{data.description}</p></div>
            <div className="price">
                <span className='current_price'>${data.reducedPrice ? data.reducedPrice.toFixed(2) : ""}</span>
                {data.onSale && 
                <>
                  <span className="percentage">{data.reductionPercentage}%</span>
                  <span className="price_before_reduction">${data.price.toFixed(2)}</span>
                </>
                }
            </div>

            <div className="buttons">


            <div className="quantity">
                <div id="minus" className={`minus ${(quantity === 0 ) ? `min` : null}`} onClick={(e) => handleQuantity(e)}>
                    <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/icon-minus.svg" alt="minus-icon"/>
                </div>
                <span>{quantity}</span>
                <div id="plus" className={`plus ${(quantity === data.stock) ? `max` : null}`}  onClick={(e) => handleQuantity(e)}>
                    <img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/icon-plus.svg" alt="plus-icon"/>
                </div>
            </div>
            <button className="add_to_cart" onClick={() => addToCart()}><img src="https://Ouadjet2807.github.io/frontEndMentor_ecommerce_product_page/Assets/images/icon-cart.svg" alt="cart-icon"></img> Add to cart</button>
            </div>
        </div>
    </div>
  )
}
