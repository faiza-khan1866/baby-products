import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { Link } from "react-router-dom";
import { API } from "../http/API";
import { constants } from "../utils/constants";
import CheckoutContainer from "../sections/Checkout/CheckoutContainer/CheckoutContainer";
import ButtonTheme from "./../components/ButtonTheme";
import { Container, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "./Tracking.scss";
import {
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineOrderedList,
  AiOutlineHeatMap,
  AiOutlineMoneyCollect,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineStar,
  AiFillCar,
} from "react-icons/ai";

class Tracking extends Component {
  state = {
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "تتبع الطلب",
        active: false,
        link: `/${this.props.global?.activeLanguage}/cart`,
      },
    ],

    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Tracking",
        active: false,
        link: `/${this.props.global?.activeLanguage}/tracking`,
      },
    ],
    order: {
      _id: "",
      orderNo: "",
      awbNumber: "",
      referenceId: "",
      status: "",
    },
    userInput: "",
    orderStatus: 0,
    orderPlacedClass: "step",
    orderProcessing: "step",
    orderDispatched: "step",
    orderDelivered: "step",
    orderNotDelivered: "step",
  };

  handleSubmit = (lang) => {
    if (this.state.userInput) {
      let data = {
        order_id: this.state.userInput,
      };
      API.post(`/track_order`, data)
        .then((response) => {
          if (response.data.status === 200 || response.data.status === 201) {
            // let currentPage = response.data.find((x) => x.slug === "header");
            // return false;
            if (response?.data?.data.status == "ORDERCONFIRMED") {
              let order = {
                orderNo: data.order_id,
                status:lang == "en"
                ? "ORDER CONFIRMED"
                : "تم تأكيد الطلب",
              }

              this.setState({
                order: order,
                orderStatus: 1,
                orderPlacedClass: "step completed",
                orderProcessing: "step",
                orderDispatched: "step",
                orderDelivered: "step",
              });
            } else if (response?.data?.data.status == "ORDERPROCESSED") {
              let order = {
                orderNo: data.order_id,
                status:lang == "en"
                ? "ORDER PROCESSED"
                : "يتم تجهيز الطلب",
              }

              this.setState({
                order: order,
                orderStatus: 2,
                orderPlacedClass: "step completed",
                orderProcessing: "step completed",
                orderDispatched: "step",
                orderDelivered: "step",
              });
            } else if (response?.data?.data.status == "ORDERDISPATCHED") {
              let order = {
                orderNo: data.order_id,
                status:lang == "en"
                ? "ORDER DISPATCHED"
                : "تم إرسال الطلب",
              }

              this.setState({
                order: order,
                orderStatus: 3,
                orderPlacedClass: "step completed",
                orderProcessing: "step completed",
                orderDispatched: "step completed",
                orderDelivered: "step",
              });
            } else if (response?.data?.data.status == "ORDERDELIVERED") {
              let order = {
                orderNo: data.order_id,
                status:lang == "en"
                ? "ORDER DELIVERED"
                : "تم تسليم الطلب",
              }

              this.setState({
                order: order,
                orderStatus: 4,
                orderPlacedClass: "step completed",
                orderProcessing: "step completed",
                orderDispatched: "step completed",
                orderDelivered: "step completed",
              });
            } else if (response?.data?.data.status == "ORDERNOTDELIVERED") {
              let order = {
                orderNo: data.order_id,
                status:lang == "en"
                ? "ORDER NOT DELIVERED"
                : "لم يتم تسليم الطلب",
              }

              this.setState({
                order: order,
                orderStatus: 0,
                orderPlacedClass: "step",
                orderProcessing: "step",
                orderDispatched: "step",
                orderDelivered: "step",
              });
              Swal.fire({
                icon: "error",
                text:
                  lang == "en"
                    ? "Order Not Delivered Please Contact Customer Care"
                    : "لم يتم تسليم الطلب يرجى التواصل مع خدمة العملاء",
                confirmButtonColor: "#e65550",
              });
            } else if (response?.data?.data.status == "ORDERCANCELLED") {
              let order = {
                orderNo: data.order_id,
                status:lang == "en"
                ? "ORDER CANCELLED"
                : "تم إلغاء الطلب",
              }

              this.setState({
                order: order,
                orderStatus: 0,
                orderPlacedClass: "step",
                orderProcessing: "step",
                orderDispatched: "step",
                orderDelivered: "step",
              });
              Swal.fire({
                icon: "error",
                text:
                  lang == "en"
                    ? "Order Cancelled Please Contact Customer Care"
                    : "تم إلغاء الطلب ، يرجى الاتصال بخدمة العملاء",
                confirmButtonColor: "#e65550",
              });
            } else if (response?.data?.data.status == "ORDERPLACED") {
              let order = {
                orderNo: data.order_id,
                status:lang == "en"
                ? "ORDER PLACED"
                : "تم تقديم الطلب",
              }

              this.setState({
                order: order,
                orderStatus: 0,
                orderPlacedClass: "step",
                orderProcessing: "step",
                orderDispatched: "step",
                orderDelivered: "step",
              });
              Swal.fire({
                icon: "success",
                text:
                  lang == "en"
                    ? "Order Placed, Your Order will be updated Soon "
                    : "تم تقديم الطلب ، سيتم تحديثك قريبًا",
                confirmButtonColor: "#e65550",
              });
            }

            // } else if(response.data.status == 404){
          } else {
            let order = {
              orderNo: data.order_id,
              status:lang == "en"
              ? "No Record Found Please Try Again"
              : "لم يتم العثور على طلب يرجى المحاولة مرة أخرى",
            }

            this.setState({
              order: order,
              orderStatus: 10,
              orderPlacedClass: "step",
              orderProcessing: "step",
              orderDispatched: "step",
              orderDelivered: "step",
            });
            Swal.fire({
              icon: "error",
              text:
                lang == "en"
                  ? "No Record Found Please Try Again"
                  : "لم يتم العثور على طلب يرجى المحاولة مرة أخرى",
              confirmButtonColor: "#e65550",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      if(this.props.global.activeLanguage == 'ar'){
        alert("فضلاً ادخل رقم الطلب");
      } else {
        alert("Pleae enter the Order Number");
      }
    }
  };
  render() {
    const { global } = this.props;
    return (
      <div className="checkout-page">
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
            <div className="section-title-underlined">
              <h1>
                {global?.activeLanguage == "en" ? "Tracking" : "تتبع الطلب"}
              </h1>
            </div>
            {/* <Row> */}

            <div className="main_container">
              <div className="container padding-bottom-3x mb-1">
                <Form>
                  <Row>
                    <Col sm={6}>
                      {/* <p><strong>{global?.activeLanguage === "en" ? "Order Number" : "رقم الطلب"}</strong></p> */}
                    </Col>
                    <Col sm={9}>
                      <Form.Group controlId="order_number">
                        <Form.Control
                          type="text"
                          name="order_number"
                          // pattern=".+@globex\.com"
                          placeholder={
                            global?.activeLanguage === "en"
                              ? "Order Number*"
                              : "*رقم الطلب"
                          }
                          required="required"
                          value={this.state.userInput}
                          style={{
                            padding: "1.4rem 0.8rem",
                          }}
                          onChange={(e) => {
                            this.setState({ userInput: e.target.value });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={3}>
                      <ButtonTheme
                        variant="primary"
                        className="trackOrderBtn"
                        onClick={() =>
                          this.handleSubmit(global?.activeLanguage)
                        }
                        // onClick={() => setModalShow(true)}
                        style={{
                          borderRadius: "6px",
                          padding: "0.6rem",
                          // width: "150px",
                        }}
                      >
                        <span className="trackyourOrderspan">
                          {global?.activeLanguage === "en" ? "Track" : "تأكيد"}{" "}
                        </span>
                      </ButtonTheme>
                    </Col>
                  </Row>
                </Form>
                <div className="card mb-3 cardSetting">
                  <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
                    <span className="text-uppercase">
                      {global?.activeLanguage == "en"
                        ? "Tracking Order No"
                        : "رقم تتبع الطلب"}{" "}
                      -{" "}
                    </span>
                    <span className="text-medium">
                      {this.state.order.orderNo}
                    </span>
                  </div>
                  <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                    {/* <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> UPS Ground</div> */}
                    <div className="w-100 text-center py-1 px-2">
                      <span className="text-medium" style={{fontWeight:"bold"}}>
                        {global?.activeLanguage == "en" ? "Status:" : "الحالة:"}
                      </span>{" "}
                      {this.state.order.status}
                    </div>
                    {/* <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Date:</span> APR 27, 2021</div> */}
                  </div>
                  <div className="card-body">
                    <div className="steps stepsAr d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                      {/* <div className="step completed"> */}

                      <div className={this.state.orderPlacedClass}>
                        <div
                          className={
                            global?.activeLanguage == "en"
                              ? "step-icon-wrap"
                              : "step-icon-wrapAr"
                          }
                        >
                          <div className="step-icon">
                            <AiOutlineOrderedList
                              className={
                                global?.activeLanguage == "en"
                                  ? "trackingIcon"
                                  : "trackingIconAr"
                              }
                            />
                          </div>
                        </div>
                        <h4 className="step-title">
                          {global?.activeLanguage == "en"
                            ? "Order Confirmed"
                            : "تم تأكيد الطلب"}
                        </h4>
                      </div>
                      <div className={this.state.orderProcessing}>
                        <div
                          className={
                            global?.activeLanguage == "en"
                              ? "step-icon-wrap"
                              : "step-icon-wrapAr"
                          }
                        >
                          <div className="step-icon">
                            <AiOutlineSetting
                              className={
                                global?.activeLanguage == "en"
                                  ? "trackingIcon"
                                  : "trackingIconAr"
                              }
                            />
                          </div>
                        </div>
                        <h4 className="step-title">
                          {global?.activeLanguage == "en"
                            ? "Processing Order"
                            : "جاري اعداد الطلب"}
                        </h4>
                      </div>
                      {/* <div className={this.state.orderProcessing}>
                    <div className={global?.activeLanguage == 'en' ? "step-icon-wrap" : "step-icon-wrapAr"}>
                      <div className="step-icon"><AiOutlineStar className={global?.activeLanguage == "en" ? "trackingIcon" : "trackingIconAr"} /></div>
                    </div>
                    <h4 className="step-title">Quality Check</h4>
                  </div> */}
                      <div className={this.state.orderDispatched}>
                        <div
                          className={
                            global?.activeLanguage == "en"
                              ? "step-icon-wrap"
                              : "step-icon-wrapAr"
                          }
                        >
                          <div className="step-icon">
                            <AiFillCar
                              className={
                                global?.activeLanguage == "en"
                                  ? "trackingIcon"
                                  : "trackingIconAr"
                              }
                            />
                          </div>
                        </div>
                        <h4 className="step-title">
                          {global?.activeLanguage == "en"
                            ? "Order Dispatched"
                            : "تم شحن الطلب"}
                        </h4>
                      </div>
                      <div className={this.state.orderDelivered}>
                        <div
                          className={
                            global?.activeLanguage == "en"
                              ? "step-icon-wrap"
                              : "step-icon-wrapAr"
                          }
                        >
                          <div className="step-icon">
                            <AiOutlineHome
                              className={
                                global?.activeLanguage == "en"
                                  ? "trackingIcon"
                                  : "trackingIconAr"
                              }
                            />
                          </div>
                        </div>
                        <h4 className="step-title">
                          {global?.activeLanguage == "en"
                            ? "Order Delivered"
                            : "تم تسليم الطلب"}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {false && (
                  <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                    <div className="custom-control custom-checkbox mr-3">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        id="notify_me"
                        checked=""
                      />
                      <label className="custom-control-label" for="notify_me">
                        Notify me when order is delivered
                      </label>
                    </div>
                    <div className="text-left text-sm-right">
                      <a
                        className="btn btn-outline-primary btn-rounded btn-sm"
                        href="#"
                      >
                        {global?.activeLanguage == "en"
                          ? "View Order Details"
                          : "تفاصيل الطلب"}
                      </a>
                    </div>
                  </div>
                )}
                <div>
                  {global?.activeLanguage == "en"
                    ? "Didn't Recieve Your Order?"
                    : "لم تقم بإستلام طلبك؟"}{" "}
                  <Link
                    className="dintRecieveOrder"
                    to={`/${global?.activeLanguage}/shipping-return-policy`}
                    style={{ color: "#666" }}
                  >
                    {global?.activeLanguage == "en"
                      ? "Click here"
                      : "شروط الإستخدام"}
                  </Link>
                </div>
              </div>
            </div>
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
  };
};
export default connect(mapStateToProps)(Tracking);
