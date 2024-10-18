import React, { useState } from "react";
import "./modalWindow.css";
import axios from "axios";

const ModalWindow = ({ image, comments, imageId, onAddComment, onClose }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim()) {
      axios
        .post(
          `http://test-backend.itdelta.agency/api/image/${imageId}/comments`,
          { comment }
        )
        .then(() => {
          onAddComment(comment);
          setComment("");
        })
        .catch((error) => console.error("Error posting comment", error));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Selected" className="modal-img" />

        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment-area" className="comment-label">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="comment-area"
            className="comment-textarea"
          ></textarea>
          <p className="comment-form-subtitle">
            Write a few sentences about the photo.
          </p>
          <button className="comment-btn">Save</button>
        </form>

        <div className="comments-block">
          <label className="comments-label" htmlFor="comments-list">
            Comments
          </label>
          <ul id="comments-list">
            {comments.map((comment, index) => (
              <li key={index}>
                {comment.author}: {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
