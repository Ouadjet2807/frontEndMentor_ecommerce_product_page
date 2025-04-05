import React, { useEffect, useState } from 'react'
import ProductGallery from './ProductGallery'

export default function GalleryModal({images, modal, setModal, currentImage, setCurrentImage}) {

    const [scrollPosition, setScrollPosition] = useState()

    const handlePreviousNext = (e) => {
        let newId
      
        if(e.target.className === "previous") {
            if((currentImage.id - 1) > 0) {
                newId = currentImage.id - 2
        
            } else {
                newId = images.length - 1
            }
            
            setCurrentImage(images[currentImage.id - 1])
        } else {
            if((currentImage.id) < images.length) {
                newId = currentImage.id
            } else {
                newId = 0
            }
        }
        setCurrentImage(images[newId])
        
      }

      useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [])          

  return (
    <div className='modal' style={{top: scrollPosition}}>

        <div className="modalBox">
            <div className="close" onClick={() => setModal(false)}>
            <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="currentColor" fill-rule="nonzero"/></svg>
            </div>
            <div className="controls">
                <div className="previous" onClick={(e) => handlePreviousNext(e)}>
                  <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg" id="previous"><path d="M11 1 3 9l8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                </div>
                <div className="next" onClick={(e) => handlePreviousNext(e)}>
                  <svg width="12" id="next" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" /></svg>
                </div>
            </div>
            <ProductGallery  
                images={images} 
                currentImage={currentImage} 
                setCurrentImage={setCurrentImage}
                modal={true}
                 />
                
          
        </div>
        <div className="overlay" onClick={() => setModal(false)}></div>
    </div>
  )
}
