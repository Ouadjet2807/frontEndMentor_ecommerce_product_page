import React from 'react'
import useWindowDimensions from '../hook/useWindowDimensions'

export default function ProductGallery({currentImage, setCurrentImage, images, modal, setModal}) {


  const {width} = useWindowDimensions()

  const handlePreviousNext = (e) => {
    let newId
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
    
  }

  return (
    <div className="gallery">
        {width < 426 &&
          <div className="controls">
            <div className="previous" onClick={(e) => handlePreviousNext(e)}>
              <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg" id="previous"><path d="M11 1 3 9l8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
            </div>
            <div className="next" onClick={(e) => handlePreviousNext(e)}>
              <svg width="13" id="next" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" /></svg>
            </div>
          </div>
        }
        <div className='currentImage' onClick={() => width > 375 && modal ? "" : setModal(true)} alt="" style={{backgroundImage: `url(${currentImage.fullSize})`}} >
        </div>
        <div className="thumbnails">
        {images.map(item => (
          <div className={`thumbnail ${item.id === currentImage.id ? "active" : ""}`}>
            <img src={item.thumbnail} onClick={() => setCurrentImage(item)}></img>
          </div>
        ))}
        </div>
    </div>
  )
}
