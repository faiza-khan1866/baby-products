import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ProductItem(props) {
  return (
    <Col
      xs={props.xs}
      sm={props.sm}
      className={props.hideTitle ? "category-grid-tile" : null}
    >
      <div
        className="product-item"
        style={{
          backgroundImage: `url(${
            process.env.REACT_APP_IMAGE_BASE_URL + props.image
          })`,
        }}
      >
        <Link
          to={
            props.name?.toLowerCase()?.includes("latest")
              ? `/${props.global.activeLanguage}/products`
              : `/${props.global.activeLanguage}/products/${props.route}`
          }
          className="menu-item esg"
        >
          <div className="item-wrap">
            <p className="item-text">{props.name}</p>
          </div>
        </Link>
      </div>
    </Col>
  );
}

// export default ProductItem;

const mapStateToProps = (state) => {
  return {
    global: state?.globalReducer,
  };
};

export default connect(mapStateToProps)(ProductItem);
