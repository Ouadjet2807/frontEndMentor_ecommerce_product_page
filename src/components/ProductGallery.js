import React from 'react'

export default function ProductGallery({currentImage, setCurrentImage, images, modal, setModal}) {




  return (
    <div className="gallery">
        <img src={currentImage.fullSize} className='currentImage' onClick={() => modal ? "" : setModal(true)} alt="" />
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
