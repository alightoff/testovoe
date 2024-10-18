import React, { useState } from "react";
import Modal from "react-modal"
import './modal.css'
import CommentForm from "./CommentForm";

Modal.setAppElement('#root')

const PhotoModal = ({photoData, onClose}) => {
    const [comments, setComments] = useState(photoData.comments)

    const addComment = (newComment) => {
        setComments([...comments, newComment])
    }    

    return (
        <Modal isOpen={!!photoData} onRequestClose={onClose} className="modal">
            <img src={photoData.image} alt="изображение" className="modal-image" />
            <div className="comments-block">
                <CommentForm onClose={onClose} imageId={photoData.id} onAddComment={addComment} />
                <h3>Комментарии</h3>
                <ul className="comment-list">
                    {comments.map((comment, index) => (
                        <li key={index}>{comment.author}: {comment.text}</li>
                    )) }
                </ul>
            </div>
        </Modal>
    )
}

export default PhotoModal