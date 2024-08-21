import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IoIosHeartEmpty, IoIosTrash } from "react-icons/io";
import ButtonTheme from "../../../components/ButtonTheme";
import "./CartList.scss";
import { useHistory } from "react-router-dom";
import { API } from "../../../http/API";
import Swal from "sweetalert2";
import SwalToast from "../../Swal";

const CartList = (props) => {
  const history = useHistory();
  const { cart, global, user, swalMsg, emptySwal, promoCode, cartBit } = props;
  // console.log("cart",cart)
  const [value, setIncrement] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {}, [refresh]);

  const removeGAProduct = (prodcode) => {
    let data = "";
    if (cart.length > 0) {
      data = cart?.filter((x) => x.productCode == prodcode)[0];
    }

    if (typeof window !== "undefined") {
      if (window.dataLayer != null) {
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
          event: "removeFromCart",
          ecommerce: {
            remove: {
              actionField: {
                list: "Shopping cart",
              },
              products: [
                {
                  name: data?.productName, // Name or ID is required.
                  id: data?.product_id,
                  price:
                    data?.discounted_price > 0
                      ? data?.discounted_price
                      : data?.price,
                  brand: "Pigeon Arabia",
                  category: data?.productCategory,
                  variant: data?.variation,
                  quantity: data.quantity,
                },
              ],
            },
          },
        });
      }
    }
  };

  useEffect(() => {
    if (
      swalMsg &&
      (swalMsg == "Product removed from cart" ||
        swalMsg == "Product added to wishlist")
    ) {
      emptySwal();
      if (props.global?.activeLanguage == "ar") {
        if (swalMsg == "Product removed from cart") {
          SwalToast.fire({
            title: "تمت إزالة المنتج من سلة التسوق",
            icon: "success",
          });
        } else if (swalMsg == "Product added to wishlist") {
          SwalToast.fire({
            icon: "success",
            title: "تمت إضافة المنتج إلى قائمة الرغبات",
          });
        }
      } else {
        SwalToast.fire({
          icon: "success",
          title: swalMsg,
        });
      }
    }
  }, [swalMsg]);

  useEffect(() => {
    let payment = {
      productsValue: 0,
      discount: 0,
      shippingCharges: 0,
      subTotal: 0,
      finalTotal: 0,
      promo_discount: 0,
    };

    if (cart.length > 0) {
      cart.forEach((element) => {
        let price = element.price * element.quantity;
        let discounted_price = element?.discounted_price * element?.quantity;
        let discount = 0;

        if (discounted_price > 0) {
          discount = price - discounted_price;
          payment.productsValue += price;
          payment.discount += discount;
        } else {
          payment.productsValue += price;
        }
      });

      payment.subTotal = payment.productsValue - payment.discount;
      if (promoCode?.discount && promoCode?.discount != "") {
        let dateStr = new Date();
        let newDate = new Date(promoCode.promo_code_date);

        if (dateStr <= newDate) {
          let promo_discount_percent = Number(promoCode.discount);
          let data = payment.subTotal * promo_discount_percent;
          payment.promo_discount = data / 100;
        }
      }

      let subTotalWithPromo = payment.subTotal - payment.promo_discount;

      if (subTotalWithPromo < 100) {
        payment.shippingCharges = 20;
      } else {
        payment.shippingCharges = 0;
      }

      payment.finalTotal = subTotalWithPromo + payment.shippingCharges;
    }
    setPaymentDetails(payment);
  }, [cartBit, cart, promoCode]);

  const incrementClicks = (productCode, quantity) => {
    if (quantity >= 10) {
      return false;
    } else {
      quantity = quantity + 1;
    }

    props.changeQuantity(productCode, quantity, "increment");
    setRefresh(refresh + 1);
  };

  const decrementClicks = (productCode, quantity) => {
    // setIncrement(v - 1);
    if (quantity <= 1) {
      return false;
    }
    quantity = quantity - 1;
    props.changeQuantity(productCode, quantity, "decrement");
    setRefresh(refresh + 1);
  };

  // const addToWishList = (product_id) => {
  //     let user_id = user.loggedInUser._id
  //     console.log(user_id)
  // }

  const addToWishList = (productCode, product) => {
    // alert("Added to wishlist")
    if (!user.loggedInUser) {
      Swal.fire({
        icon: "warning",
        title: "You are not logged in",
        text: "Login before adding a product to wishlist!",
        confirmButtonColor: "#e65550",
        confirmButtonText: "Cancel",
      });
    } else {
      let user_id = user.loggedInUser._id;
      API.post(
        "/auth/wishlist",
        {
          user_id: user_id,
          product,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
        .then((response) => {
          // console.log("response.data.status", response.data);
          if (response.data.status == 200) {
            // console.log("hereee");
            // console.log(product);
            props.removeProduct(productCode, "wishlist");

            let config = {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`,
              },
              params: {
                user_id: user?.loggedInUser._id,
              },
            };

            API.get(`/auth/wishlist`, config).then((response) => {
              props.wishlistSuccess(response.data);
              // history.push(
              //     `/${props.global.activeLanguage}/profile?active=wishlist`
              // );
            });

            // API.get(`/auth/wishlist`, {
            //     headers: {
            //         Authorization: `Bearer ${user?.accessToken}`,
            //     },
            // }).then((response) => {
            //     props.wishlistSuccess(response.data);
            // });
          } else if (response.data.status == 400) {
            SwalToast.fire({
              icon: "warning",
              title:
                props.language == "en"
                  ? "Product already in the wishlist"
                  : "المنتج موجود بالفعل في قائمة الرغبات",
            });
          }
        })
        .catch(function (error) {
          // console.log("error occured");
          // console.log(error);
        });
    }
  };

  const initiateCheckout = () => {
    if (typeof window !== "undefined") {
      if (window.fbq != null) {
        window.fbq("track", "InitiateCheckout", {
          currency: "AED",
          value: paymentDetails.finalTotal,
        });
      }
      if (window.snaptr != null) {
        window.snaptr("track", "START_CHECKOUT", {
          currency: "AED",
          value: paymentDetails.finalTotal,
        });
      }
      if (window.dataLayer != null) {
        let products = [];
        cart.map((acc) => {
          products.push({
            name: acc.productName,
            id: acc.product_id,
            price: acc.productDiscount > 0 ? acc.productDiscount : acc.price,
            brand: "Pigeon",
            category: acc.productCategory,
            variant: acc.variation,
            quantity: acc.quantity,
          });
        });

        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
          event: "checkout",
          ecommerce: {
            checkout: {
              actionField: {
                step: 1,
                option: "Place Order",
              },
              products: products,
            },
          },
        });
      }
    }
    history.push(`/${global.activeLanguage}/checkout`);
  };

  return (
    <div className="cart-list">
      <div className="list_box">
        {/* <Row> */}
        {cart.length > 0 ? (
          cart?.map((x, index) => (
            <Row className="productRow" key={index}>
              <Col lg={4} md={4} sm={12} className="productimgAndQty">
                <div className="product_img product_img_cart">
                  <img
                    src={
                      props.language == "en"
                        ? process.env.REACT_APP_IMAGE_BASE_URL + x.englishImage
                        : process.env.REACT_APP_IMAGE_BASE_URL + x.arabicImage
                    }
                  />
                </div>
                <div className="product_qyt product_qyt_margin">
                  <div className="quantity-input">
                    <button
                      className="quantity-input__modifier quantity-input__modifier--left"
                      onClick={() => decrementClicks(x.productCode, x.quantity)}
                    >
                      &mdash;
                    </button>
                    <input
                      className="quantity-input__screen"
                      type="text"
                      value={x.quantity}
                      readOnly
                    />

                    <button
                      className="quantity-input__modifier quantity-input__modifier--right"
                      onClick={() => incrementClicks(x.productCode, x.quantity)}
                    >
                      &#xff0b;
                    </button>
                  </div>
                </div>
              </Col>
              <Col lg={8} md={8} sm={12} className="productdetailsAndBtns">
                <div className="cart_list_detail">
                  <h2>
                    {props.language == "en"
                      ? x.productName
                      : x.productArabicName}
                  </h2>
                  {x.variation && (
                    <p>
                      {props.language == "en"
                        ? "Size : " + x.variation
                        : "الحجم : " + x.arabicVariation}
                    </p>
                  )}
                  {/* {!props.language == 'en' && x.arabicVariation &&
                                <p>{props.language == 'en' ? "Size : " + x.variation : "الحجم / الاختلاف : " + x.arabicVariation}</p>
                                } */}
                  {(x.color || x.decoration) && (
                    <div className="colorDecorationDiv">
                      {x.decoration && (
                        <p>
                          {props.language == "en"
                            ? "Color : " + x.decoration
                            : "اللون : " + x.arabicDecoration}
                        </p>
                      )}
                      {x.color && (
                        <p>
                          {props.language == "en"
                            ? "Pattern : " + x.color
                            : "الشكل : " + x.arabicColor}
                        </p>
                      )}
                    </div>
                  )}

                  {/* {!props.language == 'en' && (x.arabicColor || x.arabicDecoration) &&
                                    <div className="colorDecorationDiv">
                                    {x.arabicColor && <p>{props.language == 'en' ? "Color : " + x.color : "اللون : " + x.arabicColor}</p>}
                                    {x.arabicDecoration && <p>{props.language == 'en' ? "Pattern : " + x.decoration : "الشكل : " + x.arabicDecoration}</p>}
                                </div> */}
                  {/* } */}

                  {x.discounted_price > 0 && (
                    <p className="cart_list_price">
                      {props.language == "en"
                        ? "price : AED " + Number(x.discounted_price).toFixed(2)
                        : "السعر : AED " +
                          Number(x.discounted_price).toFixed(2)}
                    </p>
                  )}
                  {/* {x.discounted_price > 0 && <p className="cart_list_price">{props.language == 'en' ? "old price : AED " + x.price : "السعر : AED " + x.arabicPrice}</p>} */}
                  {!x.discounted_price && !x.discounted_price > 0 && (
                    <p className="cart_list_price">
                      {props.language == "en"
                        ? "price : AED " + Number(x.price).toFixed(2)
                        : "السعر : AED " + Number(x.arabicPrice).toFixed(2)}
                    </p>
                  )}
                  {/* <p className="cart_list_price">{props.language == 'en' ? "price : AED " + x.price : "السعر : AED " + x.arabicPrice}</p> */}
                  <div className="cartlistButtons">
                    <ButtonTheme
                      className="buy-now-btn save_btn wishlistBtn"
                      outline
                      onClick={() => {
                        addToWishList(x.productCode, x);
                        removeGAProduct(x.productCode);
                      }}
                    >
                      {props.language == "en"
                        ? "Save for later"
                        : "حفظ لوقت لاحق"}
                      <IoIosHeartEmpty />
                    </ButtonTheme>
                    <ButtonTheme
                      className="buy-now-btn buy_cart romeveBtn"
                      onClick={() => {
                        props.removeProduct(x.productCode, "remove");
                        removeGAProduct(x.productCode);
                      }}
                      outline
                    >
                      {props.language == "en" ? "Remove" : "إزالة"}
                      <IoIosTrash />
                    </ButtonTheme>
                  </div>
                </div>
              </Col>
            </Row>
          ))
        ) : (
          <p className="emptyCart">{"Your cart is empty"}</p>
        )}
        {/* </Row> */}
        {/* <Row>
                    <Col sm={4}>
                        <div className="product_img">
                            <img src="https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg" />
                        </div>
                        <div className="product_qyt">
                            <div className="quantity-input">
                                <button className="quantity-input__modifier quantity-input__modifier--right" onClick={() => incrementClicks(value)}>
                                    &#xff0b;
                                </button>
                                <input className="quantity-input__screen" type="text" value={value} readonly />
                                <button className="quantity-input__modifier quantity-input__modifier--left" onClick={() => decrementClicks(value)}>
                                    &mdash;
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="cart_list_detail">
                            <h2>Pigeon Breast Pump Manual - White</h2>
                            <p>Size: 10.4 x 20.6 x 20.4 cm</p>
                            <p className="cart_list_price">Price : AED 243.47 <span>AED 278.25</span></p>

                            <ButtonTheme
                                className="buy-now-btn save_btn"
                                outline
                            >
                                {props.language == 'en' ? 'Save for later' : 'الحفظ لوقت لاحق'}
                                <IoIosHeartEmpty />
                            </ButtonTheme>
                            <ButtonTheme
                                className="buy-now-btn buy_cart"
                                outline
                            >
                                {props.language == 'en' ? 'Remove' : 'إزالة'}
                                <IoIosTrash />
                            </ButtonTheme>
                        </div>
                    </Col>
                </Row> */}
      </div>
      <Row>
        <div className="order_action_div">
          {cart?.length > 0 && (
            <ButtonTheme
              className="buy-now-btn placeOrderBtn"
              outline
              onClick={initiateCheckout}
            >
              {props.language == "en" ? "Place Order" : "تقديم طلب"}
            </ButtonTheme>
          )}
          <ButtonTheme
            className="buy-now-btn buy_cart placeOrderBtn"
            outline
            onClick={() =>
              history.push(`/${global.activeLanguage}/mother-baby-products`)
            }
          >
            {props.language == "en" ? "Continue Shopping" : "مواصلة الشراء "}
          </ButtonTheme>
        </div>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    userWishlistProducts: state.productReducer?.userWishlistProducts,
    global: state.globalReducer,
    cart: state.cartReducer.cart,
    cartBit: state.cartReducer.cartBit,
    swalMsg: state.cartReducer.swalMsg,
    promoCode: state.cartReducer.promoCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
    wishlistSuccess: (data) =>
      dispatch({
        type: "GET_WISHLIST_SUCCESS",
        payload: {
          wishlist: data,
        },
      }),
    add_cart_product: (cart) =>
      dispatch({
        type: "ADD_PRODUCT_C",
        data: cart,
      }),
    removeProduct: (productCode, invoker) =>
      dispatch({
        type: "REMOVE_PRODUCT_FROM_CART",
        productCode: productCode,
        invoker,
      }),
    changeQuantity: (productCode, quantity, qtyType) =>
      dispatch({
        type: "CHANGE_PRODUCT_QUANTITY",
        payload: {
          productCode,
          quantity,
          qtyType,
        },
      }),
    emptySwal: (cart) =>
      dispatch({
        type: "EMPTY_SWAL",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
