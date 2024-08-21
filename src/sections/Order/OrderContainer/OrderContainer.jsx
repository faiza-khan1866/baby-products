import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import OrderList from "../OrderList/OrderList";
import './OrderContainer.scss';

function OrderContainer(props) {
  return (
    <div className="order-container">
      <Container>
        <Row>
          <Col sm={12}>
            <OrderList
              language={props.language} />
          </Col>
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

export default connect(mapStateToProps)(OrderContainer);

