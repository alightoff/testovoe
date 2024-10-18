import React, { useEffect, useState } from "react";
import "./profile.css";
import ModalWindow from "../ModalWindow/ModalWindow";

// Импортируй изображения
import BannerImage from "../../img/BannerImage.png";
import AvatarImage from "../../img/avatar.png";

const Profile = () => {
  const [images, setImages] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoData, setSelectedPhotoData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://test-backend.itdelta.agency/api/images")
      .then((resp) => resp.json())
      .then((resp) => setImages(resp))
      .catch((error) => console.error("Error fetching images"));
  }, []);

  const openModal = (id) => {
    fetch(`http://test-backend.itdelta.agency/api/image/${id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setSelectedPhotoData(resp);
        setSelectedPhoto(resp.image);
        setComments(resp.comments || []);
      })
      .catch((error) => console.error("Error fetching image"));
  };

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <div className="container">
        {selectedPhoto && (
          <ModalWindow
            image={selectedPhoto}
            imageId={selectedPhotoData.id}
            onAddComment={addComment}
            comments={comments}
            onClose={() => setSelectedPhoto(null)}
          />
        )}

        <header className="header">
          {/* Используй импортированные изображения */}
          <img
            src={BannerImage}
            alt="banner"
            className="header__img"
          />
          <div className="profile">
            <div className="profile__info">
              <img
                src={AvatarImage}
                alt="profile avatar"
                className="profile__info-avatar"
              />
              <h2 className="profile__info-name">Ricardo Cooper</h2>
            </div>
            <div className="profile__interaction">
              <button className="profile__interaction-btn message-btn">
                Message
              </button>
              <button className="profile__interaction-btn call-btn">
                Call
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="images">
            {images.map((image) => (
              <div key={image.id} className="images__item">
                <img
                  src={image.image}
                  alt="image"
                  onClick={() => openModal(image.id)}
                  className="images__item-img"
                />
                <p className="images__item-text">id: {image.id}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
