import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import "./CheckoutContainer.scss";
import CheckoutPaymentDetail from "../CheckoutPaymentDetail/CheckoutPaymentDetail";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import ButtonTheme from "../../../components/ButtonTheme";
import { API } from "../../../http/API";
import SwalToast from "../../Swal/SwalToast";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

function CheckoutContainer(props) {
  const history = useHistory();
  const { userDetails } = props;
  const [promoCode, setPromoCode] = useState("");
  // console.log("userDetails", userDetails);

  const [emirates, setEmirates] = useState([]);

  const getEmiratesData = () => {
    API.get(`auth/emirates`).then(response => {
      const allData = response.data?.data;
      setEmirates(allData);
    })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getEmiratesData();
  }, []);

  const handleSubmit = () => {
    // console.log("user",user)

    if (!promoCode) {
      SwalToast.fire({
        title:
          props.language == "en"
            ? "Please Enter a valid promo code and then Click Submit"
            : "الرجاء إدخال رمز ترويجي صالح ثم اضغط على إرسال",
        icon: "error",
      });
      return false;
    }

    if (promoCode == "") {
      SwalToast.fire({
        title:
          props.language == "en"
            ? "Please Enter a valid promo code and then Click Submit"
            : "الرجاء إدخال رمز ترويجي صالح ثم اضغط على إرسال",
        icon: "success",
      });
      return false;
    }
    if (userDetails?._id) {
      let data = {
        user_id: userDetails?._id,
        promo_code_id: promoCode,
      };

      API.post(`/promo-check`, data)
        .then((response) => {
          // console.log(response.data.status,"response")
          if (response.data.status === 200 || response.status === 201) {
            SwalToast.fire({
              title:
                props.language == "en"
                  ? "Promo Code Used Successfully"
                  : "تم استخدام الرمز الترويجي بنجاح",
              icon: "success",
            });
            
            let newDate = new Date();
            newDate = newDate.setMinutes( newDate.getMinutes() + 30 );
            
            // console.log(newDate,'newDate eee')
            let obj = {
              promo_code_id: promoCode,
              discount: response?.data?.data,
              promo_code_date: newDate,
              user_id: userDetails?._id
            };
            
            // console.log(date+"-"+month+"-"+year,"date")
            // return false;
            props.addPromoCode(obj);
            // props.onHide();
          } else {
            SwalToast.fire({
              title:
                props.language == "en"
                  ? "Promo Code could not be Applied Please try again"
                  : "تعذر تطبيق الرمز الترويجي ، يرجى المحاولة مرة أخرى",
              icon: "warning",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginInvokerFunction = () => {
    props.loginInvoker("checkout");
    history.push(`/${props.global.activeLanguage}/login`);
  };

  return (
    <div className="checkout-container">
      <Container>
        <div className="section-title-underlined">
          <h1>{constants?.site_content?.checkout[props.language]}</h1>
        </div>
        <Row>
          <Col md={7} sm={12}>
            <CheckoutForm language={props.language} emirates={emirates} />
          </Col>
          <Col md={5} sm={12}>
            <CheckoutPaymentDetail language={props.language} />
            <div className="promoCodeDiv">
              <Col sm={12} className="padding0">
                <Form.Group controlId="promoCode">
                  <Form.Label className="promoCodeLabel">
                    {props.global.activeLanguage == "en"
                      ? "Enter Promo Code"
                      : "أدخل رمز الكوبون"}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="promoCode"
                    placeholder={
                      props.language === "en" ? "Promo Code" : "رمز الكوبون"
                    }
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} style={{ paddingLeft: "0" }}>
                <ButtonTheme
                  variant="primary"
                  onClick={handleSubmit}
                  // onClick={() => setModalShow(true)}
                  disabled={
                    props.isUserLoggedIn == false
                      ? true
                      : props.cart.length > 0
                      ? false
                      : true
                  }
                  style={{
                    borderRadius: "6px",
                    width: "auto",
                    marginBottom: "10px",
                  }}
                >
                  {props.language === "en"
                    ? "Use Promo Code"
                    : "استخدام الكوبون"}
                </ButtonTheme>
              </Col>
              <Col sm={12} style={{ paddingLeft: "0" }}>
                {props.isUserLoggedIn == true ? (
                  ""
                ) : (
                  <span style={{ display: "flex" }}>
                    {/* <LinkContainer
                            to={`/${props.global?.activeLanguage}/login`}
                            className="log_in_text loginCheckout"
                          >
                            <Nav.Link>
                              {props.language === "en" ? "Log in" : "تسجيل دخول"}
                            </Nav.Link>
                      </LinkContainer> */}
                    <span
                      className="log_in_text loginCheckout"
                      onClick={loginInvokerFunction}
                    >
                      {props.language === "en" ? "Log in" : "تسجيل دخول"}
                    </span>
                    <span className="toUsePromo">to use Promo Code</span>
                  </span>
                )}
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
    userDetails: state.userReducer.loggedInUser,
    isUserLoggedIn: state.userReducer.isAuthenticated,
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPromoCode: (obj) =>
      dispatch({
        type: "ADD_PROMO_CODE_DISCOUNT",
        promoCode: obj,
      }),
    loginInvoker: (invoker) =>
      dispatch({
        type: "LOGIN_INVOKER_CHECKOUT",
        invoker,
      }),
  };
};

// export default connect(mapStateToProps)(CheckoutContainer);
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
