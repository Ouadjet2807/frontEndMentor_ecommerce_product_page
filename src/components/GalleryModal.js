import React from 'react'
import ProductGallery from './ProductGallery'

export default function GalleryModal({images, modal, setModal, currentImage, setCurrentImage}) {



    const handlePreviousNext = (e) => {
        let newId
        console.log(e.target.className);
        if(e.target.className === "previous") {
            if((currentImage.id - 1) > 0) {
                newId = currentImage.id - 2
                console.log(newId);
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
        console.log(newId);
        
        
      }

    console.log(images[currentImage.id]);
    console.log(images);
          

  return (
    <div className='modal'>

        <div className="modalBox">
            <div className="close" onClick={() => setModal(false)}>
                <img src="Assets/images/icon-close.svg" alt="" />
            </div>
            <div className="previous" onClick={(e) => handlePreviousNext(e)}>
                <img src="Assets/images/icon-previous.svg" alt="previous-icon" className="previous" title='previous'/>
            </div>
            <ProductGallery  
                images={images} 
                currentImage={currentImage} 
                setCurrentImage={setCurrentImage} />
            <div className="next" onClick={(e) => handlePreviousNext(e)}>
                <img src="Assets/images/icon-next.svg" alt="next-icon" className="next" title="next"/>
            </div>
        </div>
        <div className="overlay" onClick={() => setModal(false)}></div>
    </div>
  )
}
