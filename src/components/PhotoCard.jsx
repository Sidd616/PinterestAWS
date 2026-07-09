import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaEllipsisH } from "react-icons/fa";
import "./PhotoCard.css";

function PhotoCard({ photo, user }) {
  const userId = user?.profile?.sub;
  const [liked, setLiked] = useState(Boolean(userId && photo.likes?.includes(userId)));
  const [likesCount, setLikesCount] = useState(photo.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsCount, setCommentsCount] = useState(photo.comments?.length || 0);

  const handleLike = () => {
    if (!user) return;

    if (liked) {
      setLikesCount(likesCount - 1);
      photo.likes = photo.likes.filter((id) => id !== userId);
    } else {
      setLikesCount(likesCount + 1);
      photo.likes = [...(photo.likes || []), userId];
    }
    setLiked(!liked);

    // Here you would call your API to update likes
    // updateLike(photo.id, user.id, !liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    // Here you would call your API to add the comment
    // addComment(photo.id, user.id, comment);

    // For now, let's just update the local state
    photo.comments.push({
      id: Date.now().toString(),
      userId: userId || "anonymous",
      username: user?.profile?.["cognito:username"] || "anonymous",
      text: comment,
      createdAt: new Date().toISOString(),
    });

    setCommentsCount(commentsCount + 1);
    setComment("");
  };

  return (
    <div className="photo-card">
      <div className="photo-image-container">
        <img src={photo.imageUrl} alt={photo.title} className="photo-image" />
        <div className="photo-overlay">
          <div className="overlay-actions">
            <button className="save-button">Save</button>
            <button className="more-options">
              <FaEllipsisH />
            </button>
          </div>
        </div>
      </div>

      <div className="photo-info">
        <h3 className="photo-title">{photo.title}</h3>
        <p className="photo-description">{photo.description}</p>

        <div className="photo-meta">
          <div className="photo-author">
    
          </div>

          <div className="photo-actions">
            <button
              className={`action-button like-button ${liked ? "liked" : ""}`}
              onClick={handleLike}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span>{likesCount}</span>
            </button>

            <button
              className="action-button comment-button"
              onClick={() => setShowComments(!showComments)}
            >
              <FaComment />
              <span>{commentsCount}</span>
            </button>
          </div>
        </div>

        {showComments && (
          <div className="comments-section">
            <h4 className="comments-title">Comments</h4>

            <div className="comments-list">
              {photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <div className="comment-avatar">{comment.username.charAt(0).toUpperCase()}</div>
                    <div className="comment-content">
                      <strong className="comment-username">{comment.username}</strong>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet</p>
              )}
            </div>

            {user && (
              <form onSubmit={handleComment} className="comment-form">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
                <button type="submit" className="comment-submit">Post</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoCard;