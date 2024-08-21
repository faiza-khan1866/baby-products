import React from "react";
import { Row } from "react-bootstrap";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { constants } from "../../../utils/constants";
import MainTitle from "./../../../components/MainTitle";

function ProductsGrid(props) {
  return (
    <div className="products-grid">
      {!props.hideTitle && (
        <MainTitle
          text={
            constants?.site_content?.our_products_heading[
              props.language
            ]
          }
        />
      )}
      <div
        className={
          props.hideTitle ? "container category-grid" : null
        }
      >
        <Row noGutters>
          {props.categories
            ?.sort(function (a, b) {
              return a.order - b.order;
            })
            ?.map((category, index) => {
              return (
                <ProductItem
                  key={index}
                  id={category._id}
                  route={category.route}
                  name={
                    props.isArabic
                      ? category?.arabic?.name
                      : category.name
                  }
                  image={category.featured_img}
                  xs={6}
                  sm={4}
                  hideTitle={props.hideTitle}
                />
              );
            })}
        </Row>
      </div>
    </div>
  );
}

export default ProductsGrid;
