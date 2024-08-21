import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import ButtonTheme from "./../../../components/ButtonTheme";
import { useHistory } from "react-router-dom";

import './OrderTracking.scss';

const initialObject = {
  orderNumber: "",
};

function OrderTracking(props) {

  const history = useHistory();
  const get_in_touch = {
    en: "Track Your Order",
    ar: "Track Your Order",
  };

  const [trackingForm, settrackingForm] = useState(initialObject);

  const handleInputFields = (e) => {
    let updateValue = { ...trackingForm };
    updateValue[e.target.name] = e.target.value;
    settrackingForm(updateValue);
    // console.log("Update values", updateValue);
  };

  const handleSubmit = () => {
    let orderNumber = trackingForm.orderNumber;
    if (orderNumber === "") {
      alert("Please enter you order Number");
      return;
    }


    // let updateValue = { orderNumber };
    history.push(`/${props.global?.activeLanguage}/tracking?${orderNumber}`)
  };

  return (
    <div className="order-container">
      <Container>
        <Row>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </Row>
        <Row>
          <Form>
            <Form.Group controlId="tracking_id">
              <Form.Control
                type="text"
                name="orderNumber"
                placeholder="Order Number"
                required
                value={trackingForm.orderNumber}
                onChange={handleInputFields}
              />
            </Form.Group>
            <ButtonTheme
              variant="primary"
              onClick={handleSubmit}
              style={{
                borderRadius: "6px",
                width: "150px",
              }}
            >
              {
                get_in_touch?.en
              }
            </ButtonTheme>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(OrderTracking);

