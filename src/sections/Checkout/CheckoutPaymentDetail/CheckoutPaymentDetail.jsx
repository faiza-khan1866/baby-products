import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "./CheckoutPaymentDetail.scss";

function CheckoutPaymentDetail(props) {

    const { cartBit, cart, user, promoCode } = props
    const [paymentDetails, setPaymentDetails] = useState({});
    

    useEffect(() => {
        let payment = {
            productsValue : 0,
            discount : 0,
            shippingCharges : 0,
            subTotal : 0,
            finalTotal : 0,
            promo_discount:0
        }

        if(cart.length > 0){
            cart.forEach(element => {
                let price = element.price * element.quantity 
                let discounted_price = element?.discounted_price * element?.quantity
                let discount = 0
                
                if(discounted_price > 0){
                    discount = price - discounted_price
                    // payment.productsValue += discounted_price
                    payment.productsValue += price
                    payment.discount += discount
                } else {
                    payment.productsValue += price
                }
                
            });
            payment.subTotal = payment.productsValue - payment.discount
            if (promoCode?.discount && promoCode?.discount != "")
            {
                let dateStr = new Date();
                let newDate = new Date(promoCode.promo_code_date)

                if(dateStr <= newDate){
                    let promo_discount_percent = Number(promoCode.discount);
                    let data = payment.subTotal * promo_discount_percent;
                    payment.promo_discount = data / 100;
        
                } else {
                    props?.removePromoCode();
                }

            }

            let subTotalWithPromo = payment.subTotal - payment.promo_discount;

            if(subTotalWithPromo < 100){
                payment.shippingCharges = 20
            } else {
                payment.shippingCharges = 0
            }

            payment.finalTotal = subTotalWithPromo + payment.shippingCharges
            // payment.finalTotal = payment.subTotal - payment.promo_discount;

        }
        
        setPaymentDetails(payment)
    }, [cartBit, cart, promoCode]);
    
    return (
        <div className="cart-payment-detail">
        <div className="cart_payment_details">
            <h2>{props.language === 'en' ? 'Payment Details' : 'تفاصيل الدفع'}</h2>
            <Row>
                <Col sm={8}>
                    <p>{props.language === 'en' ? 'Value of Product(s)' : 'قيمة المشتريات'}</p>
                </Col>
                <Col sm={4}>
                    <p>{props.language == 'en' ? 'AED' : "درهم"} {paymentDetails?.productsValue?.toFixed(2)} </p>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <p>{props.language === 'en' ? 'Site Discount (-)' : 'خصم الموقع (-)'}</p>
                </Col>
                <Col sm={4}>
                    <p>{props.language == 'en' ? 'AED' : "درهم"} {paymentDetails?.discount && <>{paymentDetails?.discount.toFixed(2)}</>}</p>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm={8}>
                    <p><strong>{props.language === 'en' ? 'Sub Total' : 'المجموع الفرعي'}</strong></p>
                </Col>
                <Col sm={4}>
                    <p>{props.language == 'en' ? 'AED' : "درهم"} {paymentDetails?.subTotal?.toFixed(2)}</p>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm={8}>
                    <p><strong>{props.language === 'en' ? 'Promo Code' : 'الكوبون'}</strong></p>
                </Col>
                <Col sm={4}>
                    <p> {promoCode?.promo_code_id}</p>
                </Col>
                <Col sm={8}>
                    <p><strong>{props.language === 'en' ? 'Promo Code Discount' : 'خصم الكوبون'}</strong></p>
                </Col>
                <Col sm={4}>
                    <p>{props.language == 'en' ? 'AED' : "درهم"} {paymentDetails?.promo_discount?.toFixed(2)}</p>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm={8}>
                    <p><strong>{props.language === 'en' ? 'Sub Total' : 'المجموع الفرعي'}</strong></p>
                </Col>
                <Col sm={4}>
                    <p>{props.language == 'en' ? 'AED' : "درهم"} {(paymentDetails?.subTotal - paymentDetails?.promo_discount).toFixed(2)}</p>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <p>{props.language === 'en' ? 'Shipping Charges (+)' : 'رسوم الشحن (+)'}</p>
                </Col>
                <Col sm={4}>
                    <p>{props.language == 'en' ? 'AED' : "درهم"}{ " "+paymentDetails?.shippingCharges}</p>
                </Col>
                <span className="free-delivery-message delivery-message-payment">{props.language == 'en' ? 'Free delivery above AED 99' : "يتم دفع رسوم التوصيل على المشتريات الأقل من ٩٩ درهم"}</span>

            </Row>
            <hr />
            <Row>
                <Col sm={8}>
                    <p><strong>{props.language === 'en' ? 'Final Payment' : 'المجموع'}</strong></p>
                </Col>
                <Col sm={4}>
                    <p>{props.language == 'en' ? 'AED' : "درهم"} {paymentDetails?.finalTotal?.toFixed(2)}</p>
                </Col>
            </Row>
        </div>
        {/* <p className="safe_secure">{props.language == 'en' ? 'Safe and Secure Payments.Easy returns.100% Authentic products.' : 'دفع آمن وسهل. استرداد المال. منتجات أصلية 100٪.'}</p> */}
    </div>
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
        cart: state.cartReducer.cart,
        paymentDetails: state.cartReducer.paymentDetails,
        cartBit: state.cartReducer.cartBit,
        user: state.userReducer,
        promoCode:state.cartReducer.promoCode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      removePromoCode: () =>
        dispatch({
          type: "REMOVE_PROMO_CODE_DISCOUNT",
        })
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentDetail);

