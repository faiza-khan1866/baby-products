import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import { constants } from "../utils/constants";
import { Container} from "react-bootstrap";
import Swal from "sweetalert2";
import "./Tracking.scss";
import ClipLoader from "react-spinners/BounceLoader";

class PaymentSuccess extends Component {
  state = {
    makeApiCall: "true",
    loader: true,
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "الدفع",
        active: false,
        link: `/${this.props.global?.activeLanguage}/payment`,
      },
    ],

    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "payment",
        active: false,
        link: `/${this.props.global?.activeLanguage}/payment`,
      },
    ],
  };

  componentDidUpdate() {
    if (this.props.cartReducer.tran_ref) {
      if (this.state.makeApiCall) {
        let updatedData = {
          profile_id: constants.profile_id,
          tran_ref: this.props.cartReducer.tran_ref,
          orderId: this.props.cartReducer.order_id,
        };

        API.post("/paymetStatus", updatedData)
          .then((response) => {
            if (response.data.data.response_status == "A") {
              localStorage.setItem(
                "orderSuccessToken",
                response.data.data.token
              );
              this.props.history.push(
                `/${this.props.global?.activeLanguage}/order/success/`
              );
              
            } else {
              this.setState({ loader: false });
              Swal.fire({
                icon: "danger",
                title:
                  this.props.global?.activeLanguage == "en"
                    ? "Invalid Card"
                    : "بطاقة غير صالحة ",
                text:
                  this.props.global?.activeLanguage == "en"
                    ? "You have entered invalid card number"
                    : "لقد أدخلت رقم بطاقة غير صالح",
                confirmButtonText:
                  this.props.global?.activeLanguage == "en"
                    ? "Pay Again"
                    : "مواصلة التسوق",
                confirmButtonColor: "#e65550",
              });
              setTimeout(() => {
                this.props.history.push("/en/checkout");
              }, 2000);
            }
          })
          .catch((error) => {
            this.setState({ loader: false });
            Swal.fire({
              icon: "danger",
              title:
                this.props.global?.activeLanguage == "en"
                  ? "Invalid Card"
                  : "بطاقة غير صالحة ",
              text:
                this.props.global?.activeLanguage == "en"
                  ? "You have entered invalid card number"
                  : "لقد أدخلت رقم بطاقة غير صالح",
              confirmButtonText:
                this.props.global?.activeLanguage == "en"
                  ? "Pay Again"
                  : "مواصلة التسوق",
              confirmButtonColor: "#e65550",
            });
            setTimeout(() => {
              this.props.history.push("/en/checkout");
            }, 2000);
            // console.log("eeeeeeeeeeeeeer", error);
          });
        this.setState({ makeApiCall: false });
      }
    }
  }

  render() {
    const { global } = this.props;
    return (
      <div className="checkout-page">
        <div
          className={`${
            this.state.loader ? "d-flex" : "d-none"
          } flex-column text-center align-items-center justify-content-center`}
          style={{
            position: "absolute",
            zIndex: 99999,
            height: "100%",
            width: "100%",
            background: "rgba(255,255,255,0.6)",
          }}
        >
          <ClipLoader color={"#e65550"} loading={true} size={80} />
        </div>

        <Helmet>
          <title>
            {this.state.currentPage?.meta_details?.title || constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.currentPage?.meta_details?.description ||
              constants.seo_description
            }
          />
        </Helmet>
        <BreadCrumbs
          breadCrumbItems={
            global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={global?.activeLanguage}
        />

        <div className="checkout-container">
          <Container>
            {/* <div className="section-title-underlined">
          <h1>{"Success Order"}</h1>
        </div> */}
            {/* <Row> */}

            <div className="main_container"></div>
            {/*
          <Col sm={5}>
            <CheckoutPaymentDetail
              language={props.language}
            />
          </Col> */}
            {/* </Row> */}
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
    swalMsg: state.cartReducer.swalMsg,
    // tran_ref: state.cartReducer.tran_ref,
    cartReducer: state.cartReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () =>
    //     dispatch({
    //         type: "LOGOUT",
    //     }),
    // wishlistSuccess: (data) =>
    //     dispatch({
    //         type: "GET_WISHLIST_SUCCESS",
    //         payload: {
    //             wishlist: data,
    //         },
    //     }),
    // add_cart_product: (cart) => dispatch({
    //     type: "ADD_PRODUCT_C",
    //     data: cart
    // }),
    emptyCart: () =>
      dispatch({
        type: "EMPTY_CART",
        // productCode: productCode,
        invoker: "paymentSuccess",
      }),
    // changeQuantity: (productCode, quantity, qtyType) => dispatch({
    //     type: "CHANGE_PRODUCT_QUANTITY",
    //     payload: {
    //         productCode,
    //         quantity,
    //         qtyType
    //     }
    // }),
    // emptySwal: (cart) => dispatch({
    //     type: "EMPTY_SWAL",
    //   })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess);
