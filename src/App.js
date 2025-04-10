
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Product from "./components/Product";


function App() {

  const [cartModal, setCartModal] = useState(true)
  const [cartContent, setCartContent] = useState([])
  const [cartTotal, setCartTotal] = useState(null)

  const calculateCartTotal = () => {
    let total = 0
    cartContent.forEach(item => {
      total += item.quantity
    })

    setCartTotal(total)
  }
  

  const productList = [
    {
      id: 1,
      title: "fall limited edition sneakers",
      brand: "sneaker company",
      description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer",
      onSale: true,
      reductionPercentage: 50,
      price: 250.00,
      stock: 25,
      images: [
        {
          id: 1,
          fullSize: "Assets/images/image-product-1.jpg",
          thumbnail: "Assets/images/image-product-1-thumbnail.jpg"
        },
        {
          id: 2,
          fullSize: "Assets/images/image-product-2.jpg",
          thumbnail: "Assets/images/image-product-2-thumbnail.jpg"
        },
        {
          id: 3,
          fullSize: "Assets/images/image-product-3.jpg",
          thumbnail: "Assets/images/image-product-3-thumbnail.jpg"
        },
        {
          id: 4,
          fullSize: "Assets/images/image-product-4.jpg",
          thumbnail: "Assets/images/image-product-4-thumbnail.jpg"
        },
      ]
    } 
  ]

  useEffect(() => {
    calculateCartTotal()
  }, [cartContent])
  

  return (
    <div className="App">
      <Navigation setCartModal={setCartModal} cartModal={cartModal} cartContent={cartContent} cartTotal={cartTotal}/>
      <Product data={productList[0]} cartModal={cartModal} setCartModal={setCartModal} cartContent={cartContent} setCartContent={setCartContent}/>
    </div>

    
  );
}

export default App;
