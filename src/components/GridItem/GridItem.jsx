import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import ButtonTheme from "../ButtonTheme";
import { API } from "../../http/API";

function GridItem(props) {
  const history = useHistory();

  const [prices, setPrices] = useState({
    variations: 0,
    price: 0,
    maxPrice: 0,
    old_price: 0,
    stock: 0,
    discount: 0,
  });
  // const [data, setData] = useState({colors:[],patterns:[]});

  useEffect(() => {
    let variations = 0;
    let price = 0;
    let maxPrice = 0;
    let old_price = 0;
    let stock = 0;
    let discount = 0;

    if (props?.variations.length > 0) {
      variations = props.variations.length;
      let colors = [];
      let decorations = [];
      props.variations.forEach((element, index) => {
        // if(!colors.includes(element.color)){
        //   colors.push(element.color)
        // }

        // if(!decorations.includes(element.decoration)){
        //   decorations.push(element.decoration)
        // }

        if (index == 0) {
          if (element.variation_discounted_price) {
            if (
              Number(element.variation_discounted_price) > 0 &&
              Number(element.variation_price) >
                Number(element.variation_discounted_price)
            ) {
              price = Number(element.variation_discounted_price);
            }
          } else {
            if (Number(element.variation_price) > 0) {
              price = element.variation_price;
              // maxPrice = element.variation_price
            }
          }
        } else {
          if (element.variation_discounted_price) {
            if (
              Number(element.variation_discounted_price) > 0 &&
              Number(element.variation_price) >
                Number(element.variation_discounted_price)
            ) {
              if (Number(element.variation_discounted_price) < price) {
                price = Number(element.variation_discounted_price);
              }
            }
          } else {
            if (Number(element.variation_price) < price) {
              price = Number(element.variation_price);
              // maxPrice = element.variation_price
            }
          }

          // if(Number(element.variation_price) > 0){
          //   // if(Number(element.variation_price) > maxPrice){
          //   //   maxPrice = Number(element.variation_price)
          //   //   console.log("index 32",maxPrice)
          //   // }
          //   if(Number(element.variation_price) < price){
          //     price = Number(element.variation_price)
          //     console.log("index 36",price)
          //   }
          // }
        }
      });

      //  setData({colors:colors,patterns:decorations})
    } else {
      // console.log("thethethe 85 props",props)
      if (
        props?.discounted_price &&
        Number(props?.discounted_price) < Number(props.price)
      ) {
      }
      price =
        props?.discounted_price &&
        Number(props?.discounted_price) < Number(props.price)
          ? props.discounted_price
          : props.price
          ? props.price
          : 0;
      old_price =
        props?.discounted_price &&
        Number(props.discounted_price) < Number(props.price)
          ? props.price
          : 0;
      stock = Number(props.default_stock);
      discount = props.discount || 0;
      // console.log("variations,price,maxPrice,old_price",variations,price,old_price)
      // console.log("variations,price,maxPrice,old_price",props.discounted_price)
    }
    setPrices({ variations, price, old_price, stock, discount });
  }, [props.variations]);

  // const viewProduct = (id) => {
  //   if (id && id != "") {
  //     API.get(`auth/products/${id}`)
  //       .then((response) => {
  //         if (response.status === 200 || response.status === 201) {
  //           let data = response.data;
  //           let price =
  //             data.discounted_price > 0
  //               ? data.discounted_price
  //               : data.default_price;

  //           if (typeof window !== "undefined") {
  //             if (window.dataLayer != null) {
  //               // Measure a view of product details. This example assumes the detail view occurs on pageload,
  //               // and also tracks a standard pageview of the details page.
  //               window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  //               window.dataLayer.push({
  //                 ecommerce: {
  //                   detail: {
  //                     actionField: { list: `${data?.name}` }, // 'detail' actions have an optional list property.
  //                     products: [
  //                       {
  //                         name: `${data?.name}`, // Name or ID is required.
  //                         id: `${data?.product_code}`,
  //                         price: `${price}`,
  //                         brand: "Pigeon Arabia",
  //                         // category: "Health Care",
  //                         variant: `${data?.tags[0]}`,
  //                       },
  //                     ],
  //                   },
  //                 },
  //               });
  //             }
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Something went wrong");
  //       });
  //   }
  // };

  return (
    <div
      className="grid-item"
      // onClick={() => viewProduct(props.route)}
    >
      <Link
        to={`/${props.global.activeLanguage}/product/${encodeURIComponent(
          props.route
        )}`}
        className="productLink"
      >
        <div className="img-wrapper">
          <div className="wave-overlay"></div>
          <Link className="overlay-title">
            <ButtonTheme
              style={{
                background: "#fff",
                border: "1px solid #fff",
                borderRadius: "0",
                color: "#e65550",
              }}
              onClick={() => {
                history.push(
                  `/${props.global.activeLanguage}/product/${encodeURIComponent(
                    props.route
                  )}`
                );
                // viewProduct(props.route);
              }}
            >
              {props.global.activeLanguage == "en"
                ? "View Details"
                : "عرض التفاصيل"}
            </ButtonTheme>
          </Link>
          <img
            src={process.env.REACT_APP_IMAGE_BASE_URL + props.image}
            alt=""
            className="img-thumbnail"
          />
        </div>
        <div className="description">
          {/* <div claaaName="colorAndPattern">
            {data.colors.length > 0 && <h6 className="title">Color's : {data.colors.length}+</h6>}
            {data.patterns.length > 0 && <h6 className="title">pattern's : {data.patterns.length}+</h6>}
          // </div> */}
          {/* {prices.variations > 0 && <h6 className="title priceVariation"><span className="variationsTotal">+{prices.variations} colours/patterns</span></h6>} */}
          <h6 className="title priceVariation">
            <b className="productSize">{props.name}</b>
          </h6>
          {/* {prices.price > 0 && <h6 className="title priceVariation priceMargin"> <span className="currency">AED</span>{prices.price} {prices.maxPrice > 0 && <span>  -  <span className="currency">AED</span>{prices.maxPrice}</span>}</h6>} */}
          <div className="product-price-section">
            {!prices.variations > 0 && prices.stock < 1 ? (
              <h6 className="title priceVariation priceMargin">
                {props.global.activeLanguage == "en"
                  ? "Out of Stock"
                  : "غير متوفر حالياً"}
              </h6>
            ) : (
              <>
                {prices.price > 0 && (
                  <h6 className="title priceVariation priceMargin">
                    {" "}
                    {prices.variations > 0 ? (
                      <span className="start-price-line">
                        {props.global.activeLanguage == "en"
                          ? "Starting from"
                          : "الأسعار تبدأ من"}{" "}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    <span className="currency">
                      {props.global.activeLanguage == "en" ? "AED" : "درهم"}{" "}
                    </span>
                    {Number(prices.price).toFixed(2)}
                  </h6>
                )}
                {prices.old_price > 0 && (
                  <>
                    <h6 className="old-price-h6">
                      <span className="currency">
                        {props.global.activeLanguage == "en" ? "AED" : "درهم"}{" "}
                      </span>{" "}
                      <span className="old-price">
                        {Number(prices.old_price).toFixed(2)}
                      </span>
                    </h6>{" "}
                    {prices.discount > 0 && (
                      <>
                        {props.global.activeLanguage == "en" ? (
                          <span className="percentOff percentOffSmall ">
                            {" "}
                            {"( " + prices.discount + "% off )"}{" "}
                          </span>
                        ) : (
                          <span className="percentOff percentOffSmall ">
                            {" "}
                            {"( " + prices.discount + "% خصم )"}{" "}
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {/* <span className="rating">
            {(props.avg_rating || props.rating) && (
              <ReactStars
                count={5}
                value={Math.round((props.avg_rating || 0) * 2) / 2}
                size={18}
                activeColor="gold"
                edit={false}
                color="#eaeaea"
                isHalf
                key={new Date().getTime()}
              />
            )}
            {props.rating_count > 0 && (
              <span className="text-secondary small">
                ({props.rating_count || 0})
              </span>
            )}
          </span> */}
        </div>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GridItem));
