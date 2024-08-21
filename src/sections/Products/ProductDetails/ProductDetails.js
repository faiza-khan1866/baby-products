import React, { useState } from "react";
import { Col, Collapse, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import {
  categories,
  defaultContentProducts,
  articleDetailsList,
} from "../../../utils/data.js";

const ProductDetails = ({
  image,
  text,
  productImage,
  detailText,
  message,
  heading,
  activeLanguage,
  productUrl,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`product-details-wrap ${
        !text || text === null || text === "" || text === "<p>null</p>"
          ? "d-none"
          : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <Col sm={{ span: 12, offset: 0 }}>
            <div className="section-title-underlined">
              {productUrl == window.location.pathname ? (
                activeLanguage == "en" ? (
                  <h3>{defaultContentProducts.name}</h3>
                ) : (
                  <h3>{defaultContentProducts.arabic.name}</h3>
                )
              ) : (
                <h3>{heading}</h3>
              )}
            </div>
          </Col>
          <div className="col-md-3">
            <div className="image-col">
              <div className="image-wrap">
                {image && <img src={image} alt="baby" className="image" />}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="text-wrap">
              <div className="products-text">
                {productUrl == window.location.pathname ? (
                  activeLanguage == "en" ? (
                    <p>{defaultContentProducts.short_description}</p>
                  ) : (
                    <p>{defaultContentProducts.arabic?.short_description}</p>
                  )
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: text }}></p>
                )}
              </div>
              {!open ? (
                <>
                  <span
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    {activeLanguage == "en" ? "See More" : "رؤية الأقل"}
                    <MdExpandMore fontSize="large" />
                  </span>
                </>
              ) : (
                <>&nbsp;</>
              )}
            </div>
          </div>
        </div>
      </div>
      <Collapse in={open}>
        <Container fluid>
          <div className="px-4 mt-5 see-more-wrap">
            <div className="lg-image-wrap">
              <img src={productImage} alt="Pigeon" />
            </div>
            <div className="detail-text-wrap">
              {/* {detailText?.split("<br>")?.length > 0 ? (
                detailText
                  ?.split("<br>")
                  ?.map((x) => <p>{x}</p>)
              ) : (
                <p>{detailText}</p>
              )} */}
              <div>
                {productUrl == window.location.pathname ? (
                  activeLanguage == "en" ? (
                    <p>{defaultContentProducts.long_description}</p>
                  ) : (
                    <p>{defaultContentProducts.arabic?.long_description}</p>
                  )
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: detailText }}></p>
                )}
              </div>
              {/* <p>{message}</p> */}
              <div id="example-collapse-text"></div>
              <span onClick={() => setOpen(!open)}>
                {activeLanguage == "en" ? "See Less" : "رؤية المزيد"}{" "}
                <MdExpandLess fontSize="large" />
              </span>
            </div>
          </div>
        </Container>
      </Collapse>
    </div>
  );
};

export default ProductDetails;
