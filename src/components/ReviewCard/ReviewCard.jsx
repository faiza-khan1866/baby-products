import React from "react";
import ReactStars from "react-rating-stars-component";
import ReactTimeAgo from "react-time-ago";
import avatar1 from "./../../assets/icons/img_avatar.png";

function ReviewCard(props) {
  return (
    <div className="review-card">
      <div className="avatar">
        <img src={avatar1} alt="avatar" />
      </div>
      <div className="info">
        <p className="name">{props.user?.name}</p>
        <p className="date">
          {new Date(props.created_at).toLocaleDateString()}
        </p>
        <p className="duration">
          <ReactTimeAgo date={props.created_at} locale="en-US" />
        </p>
      </div>
      <div className="description">
        <p className="rating">
          <ReactStars
            count={5}
            value={props.rating}
            onChange={() => {}}
            size={24}
            activeColor="gold"
            edit={false}
            color="#eaeaea"
            isHalf
          />
        </p>
        <p className="title">{props.comments?.split(" ")?.[0]}</p>
        <p className="review">{props.comments}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
