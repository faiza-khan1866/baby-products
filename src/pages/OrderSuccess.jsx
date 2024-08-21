import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const PaymentSuccess = (props) => {
  const history = useHistory();
  useEffect(() => {
    let total = localStorage.getItem("orderTotal");

    props.emptyCart();
    props.emptySwal();
    if (typeof window !== "undefined") {
      if (window.fbq != null) {
        window.fbq("track", "Purchase", { currency: "AED", value: total });
      }
      if (window.snaptr != null) {
        window.snaptr("track", "PURCHASE", { currency: "AED", value: total });
      }
    }

    localStorage.removeItem("orderSuccessToken");
    localStorage.removeItem("orderTotal");

    let icon = "success";
    Swal.fire({
      icon: icon,
      title:
        props.global?.activeLanguage == "en"
          ? "Thank you for shopping with us!"
          : "شكرا للتسوق معنا!",
      text:
        props.global?.activeLanguage == "en"
          ? "You will receive an email notification for order confirmation"
          : "ستتلقى إشعارًا بالبريد الإلكتروني لتأكيد الطلب",
      showCancelButton: false,
      confirmButtonText:
        props.global?.activeLanguage == "en"
          ? "Continue Shopping"
          : "مواصلة التسوق",
      confirmButtonColor: "#e65550",
      allowOutsideClick: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        history.push(`/${props.global.activeLanguage}/mother-baby-products`);
      }
    });
  }, []);

  return (
    <div className="checkout-page">
      <div className="checkout-container"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyCart: () =>
      dispatch({
        type: "EMPTY_CART",
        invoker: "paymentSuccess",
      }),
    emptySwal: (cart) =>
      dispatch({
        type: "EMPTY_SWAL",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess);
