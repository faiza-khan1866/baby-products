import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import { Container } from "react-bootstrap";

class TermsOfUsePage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Shipping And Return Policy",
        active: true,
        link: `/${this.props.global?.activeLanguage}/shipping-return-policy`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "سياسة الشحن والإرجاع",
        active: true,
        link: `/${this.props.global?.activeLanguage}/shipping-return-policy`,
      },
    ],
  };
  render() {
    return (
      <div>
        <MainTitle text={this.props.global?.activeLanguage === "ar" ? "سياسة الشحن والإرجاع" : "Shipping And Return Policy"} />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={this.props.global?.activeLanguage}
        />
        <div className="terms-of-use-section">
          <Container>
            <div className="content-wrap">
              <p className="">
                Pigeon is aware that receiving your products accurately and on-time is very important to you therefore, Pigeon
                commits to provide the best customer experience for ordering and shipping.

              </p>
              <h5>
                1. Fees & Delivery Time
              </h5>
              <p>
                <ul className="listStyle">
                  <li>20 AED delivery fees for orders below 99 AED</li>
                  <li>Free delivery for orders above 99 AED</li>
                  <li>Shipping all days except for Sunday and National Holidays</li>
                </ul>
              </p>
              <p>
                <sapn className="noteStyle">Note:</sapn> There may be times where Pigeon might face unexpected delays due to unforeseen circumstances. In that
                case, we would request from our customers to cooperate as we solve pending issues.
              </p>
              <div>
                Pigeon reserves the right to cancel the order in case of longer than usual delivery time or customer cannot be
                found or contacted and refund the amount paid for canceled products.
              </div>
              <h5>
                2. ID Requirement Upon Delivery
              </h5>
              <div>
                Pigeon may require you to provide a copy of your valid ID to verify your identity to ensure that products are
                delivered with certainty. If we are unable to verify the information you provided, we have the right to refuse or
                cancel the order
              </div>
              <h5>
                3. Non-availability on Delivery
              </h5>
              <div>
                Our delivery partners will attempt to deliver 3 times before the product is returned to our warehouse. Therefore,
                please make sure to provide accurate mobile number for a faster delivery.
              </div>
              <h5>
                4. Return
              </h5>
              <div>
                You can return your order within 15 days from the time of the purchase.
                <span>Please find below non-returnable products:</span>
                <ol className="listStyle">
                  <li>Products that have been used, damaged or broken</li>
                  <li>Products that have been removed from its original package</li>
                  <li>Products that are not in the same condition as you have received them</li>
                  <li>Products showing signs of wear and tear</li>
                </ol>
              </div>
              <div>
                Once the product is returned to our warehouse, our inspection team will conduct a quality check to ensure that
                the product meets the requirements of the return policy guidelines. The refund will be processed accordingly
              </div>
              <div>
                <sapn className="noteStyle">Note :</sapn>
                If the item is purchased on sale, the refund credit for the returned item will be initiated for the value paid
                when placing the order only.
              </div>
              <h5>
                5. How Do I Return an Item?
              </h5>
              <div>
                Any order that has been shipped to UAE can be returned within 15 days from the date of purchase. To return an
                item, please send an email to <span className="emailToStyle" onClick={() => window.location = 'mailto:customercare@areenew.ae'}>customercare@areenew.ae </span>and specify the below details:
                <ol className="listStyle">
                  <li>Order number </li>
                  <li>Item to be returned with its description as per the invoice</li>
                  <li>Quantity</li>
                  <li>Reason for Return</li>
                  <li>A clear picture of the item packaged and in good condition</li>
                  <li>Contact Mobile Number</li>
                </ol>
              </div>
            </div>
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
export default connect(mapStateToProps)(TermsOfUsePage);
