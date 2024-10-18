import React, { useEffect, useState } from "react";
import Modal from './Modal'
import './photoGallery.css'

export default function PhotoGallery() {
    const [photos, setPhotos] = useState([])
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    useEffect(() => {
        fetch('http://test-backend.itdelta.agency/api/images')
            .then(resp => resp.json())
            .then(resp => setPhotos(resp))
            .catch(error => console.error("Error fetching images"))
    }, [])

    const openModal = (id) => {
        fetch(`http://test-backend.itdelta.agency/api/image/${id}`)
            .then(resp => resp.json())
            .then(resp => setSelectedPhoto(resp))
            .catch(error => console.error("Error fetching image"))
    }

  return (
    <div className="images">
        {/* {photos.map(photo => (
            <img key={photo.id} onClick={() => openModal(photo.id)} src={photo.image} alt="фото" className="photo" />
        ))}

        {selectedPhoto && (
            <div className="modal-block">
                <Modal photoData={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
            </div>
            
        )} */}

        {
            selectedPhoto ? <div className="modal-block">
            <Modal photoData={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        </div> :
            photos.map(photo => (
                <img key={photo.id} onClick={() => openModal(photo.id)} src={photo.image} alt="фото" className="photo" />
            ))
        }
    </div>
    );
}