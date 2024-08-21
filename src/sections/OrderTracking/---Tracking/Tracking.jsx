import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import { constants } from "../utils/constants";
import CheckoutContainer from "../sections/Checkout/CheckoutContainer/CheckoutContainer";
import { Container, Row, Col, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import './Tracking.scss';
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

  };
  render() {
    const { global } = this.props;
    return (
      <div className="checkout-page">
        
        <Helmet>
          <title>
            {this.state.currentPage?.meta_details?.title ||
              constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.currentPage?.meta_details
                ?.description || constants.seo_description
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
          <h1>{"tracking"}</h1>
        </div>
        {/* <Row> */}
          
           <div className="main_container">

            <div class="container padding-bottom-3x mb-1">
            <div class="card mb-3 cardSetting">
              <div class="p-4 text-center text-white text-lg bg-dark rounded-top"><span class="text-uppercase">Tracking Order No - </span><span class="text-medium">001698653lp</span></div>
              <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                {/* <div class="w-100 text-center py-1 px-2"><span class="text-medium">Shipped Via:</span> UPS Ground</div> */}
                <div class="w-100 text-center py-1 px-2"><span class="text-medium">Status:</span> Checking Quality</div>
                <div class="w-100 text-center py-1 px-2"><span class="text-medium">Expected Date:</span> APR 27, 2021</div>
              </div>
              <div class="card-body">
                <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                  <div class="step completed">
                    <div class="step-icon-wrap">
                      <div class="step-icon"><AiOutlineOrderedList className="trackingIcon"/></div>
                    </div>
                    <h4 class="step-title">Confirmed Order</h4>
                  </div>
                  <div class="step completed">
                    <div class="step-icon-wrap">
                      <div class="step-icon"><AiOutlineSetting className="trackingIcon" /></div>
                    </div>
                    <h4 class="step-title">Processing Order</h4>
                  </div>
                  <div class="step completed">
                    <div class="step-icon-wrap">
                      <div class="step-icon"><AiOutlineStar className="trackingIcon" /></div>
                    </div>
                    <h4 class="step-title">Quality Check</h4>
                  </div>
                  <div class="step">
                    <div class="step-icon-wrap">
                      <div class="step-icon"><AiFillCar className="trackingIcon" /></div>
                    </div>
                    <h4 class="step-title">Product Dispatched</h4>
                  </div>
                  <div class="step">
                    <div class="step-icon-wrap">
                      <div class="step-icon"><AiOutlineHome className="trackingIcon" /></div>
                    </div>
                    <h4 class="step-title">Product Delivered</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
              <div class="custom-control custom-checkbox mr-3">
                <input class="custom-control-input" type="checkbox" id="notify_me" checked="" />
                <label class="custom-control-label" for="notify_me">Notify me when order is delivered</label>
              </div>
              <div class="text-left text-sm-right"><a class="btn btn-outline-primary btn-rounded btn-sm" href="#">View Order Details</a></div>
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
