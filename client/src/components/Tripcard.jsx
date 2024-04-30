// Tripcard.jsx
import React from 'react';
import imagelink from "../images/linkbutton.png";

const Tripcard = ({ trip, handleTagClick }) => {
    const handleCopyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
          alert('copy link ไปที่ clipboard แล้วครับ^^');
        }).catch(err => {
          console.error('การกด copy link มีข้อผิดพลาด', err);
        });
      };

  return (
    <div key={trip.eid} className="trip-card">
      <img src={trip.photos[0]} alt={trip.title} className="trip-main-image" />
      <div className="trip-content">
        <h2 className="trip-title">{trip.title}</h2>
        <p className="trip-description">
          {trip.description.length > 100 ?
            <span>
              {trip.description.substring(0, 100)}
              <span style={{ color: 'lightblue' }}> ...</span>
            </span>
            : trip.description
          }
        </p>
        <a href={trip.url} target="_blank" rel="noopener noreferrer" className="trip-link">อ่านต่อ</a>
        <div className="trip-tags">
          หมวด{' '}
          {trip.tags.map((tag, index, array) => (
            <>
              <span
                key={index}
                className={`tag ${tag !== "และ" ? "underline" : ""}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
              {index === array.length - 2 ? ' และ ' : ' '}
            </>
          ))}
        </div>

        <div className="trip-photos">
          {trip.photos.slice(1).map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} className="trip-small-image" />
          ))}
        </div>
        <img src={imagelink} alt="Copy to Clipboard" onClick={() => handleCopyToClipboard(trip.url)} className="clipboard-image" />
      </div>
    </div>
  );
};

export default Tripcard;
