import React from "react";
import { GrDirections } from "react-icons/gr";
import ReactStars from "react-rating-stars-component";

function LocationCard(props) {
  return (
    <div className="location-card">
      <div className="d-flex">
        <div className="details">
          <h6>{props.mapData?.map_title}</h6>
          <p
            dangerouslySetInnerHTML={{
              __html: props.mapData?.map_description,
            }}
          ></p>
          <div className="rating">
            <span className="count">5.0</span>
            <ReactStars
              count={5}
              value={5}
              onChange={() => {}}
              size={18}
              activeColor="orange"
              edit={false}
              color="#eaeaea"
              isHalf
            />
            <small className="total-reviewers">
              12 Reviews
            </small>
          </div>
        </div>
        <div
          className="directions-icon"
          onClick={() => {
            window.open(
              `${props.mapData?.map_link}`,
              "_blank"
            );
          }}
        >
          <GrDirections className="icon" />
          <br />
          <small>Direction</small>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
