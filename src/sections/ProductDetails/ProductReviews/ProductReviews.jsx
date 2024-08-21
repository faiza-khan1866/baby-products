import React from "react";
import { Container } from "react-bootstrap";
import ReviewCard from "../../../components/ReviewCard";
import avatar1 from "./../../../assets/icons/img_avatar.png";
import avatar2 from "./../../../assets/icons/img_avatar2.png";

function ProductReviews(props) {
  return (
    <div className="product-reviews">
      <div className="section-title-underlined">
        <h3>
          {props.language === "en"
            ? "Ratings Reviews"
            : "التقييمات و التعليقات"}
        </h3>
      </div>
      <Container>
        {props.reviews?.map((x) => (
          <ReviewCard {...x} />
        ))}
      </Container>
    </div>
  );
}

export default ProductReviews;
