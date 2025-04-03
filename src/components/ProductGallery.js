import React from 'react'

export default function ProductGallery({currentImage, setCurrentImage, images, modal, setModal}) {
  return (
    <div className="gallery">
        {modal &&
            <div className="previous">
              <img src="Assets/images/icon-previous.svg" alt="previous-icon" className="previous" title='previous'/>
            </div>
        }
        <img src={currentImage} onClick={() => modal ? "" : setModal(true)} alt="" />
        {modal &&
            <div className="next">
              <img src="Assets/images/icon-next.svg" alt="next-icon" className="previous" title="next"/>
            </div>
        }
        <div className="thumbnails">
        {images.map(item => {
        return <img className="thumbnail" src={item.thumbnail} onClick={() => setCurrentImage(item.fullSize)}></img>
        })}
        </div>
    </div>
  )
}
