import axios from "axios";
import React, { useState } from "react";
import './commentForm.css'

export default function CommentForm({imageId, onAddComment, onClose}) {
    const [comment, setComment] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(comment);
        

        if(comment.trim()) {
            axios.post(`http://test-backend.itdelta.agency/api/image/${imageId}/comments`, {comment})
                .then(() => {
                    onAddComment(comment);
                    setComment('')
                })
                .catch(error => console.error("Error posting comment", error))
        }
    }
    

  return (
    <>
        <form onSubmit={handleSubmit} className="comment-form">
            <h2 className="comment-label">Comment</h2>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Введите комментарий"></textarea>
            <button onClick={onClose} type="submit">Сохранить</button>
        </form>
    </>
  );
}
