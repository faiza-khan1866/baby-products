import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../utils/constants";
import ButtonTheme from "./../../components/ButtonTheme";
import CreatePayment from "./CreatePayment";
import './Payment.scss';
import { API } from '../../http/API';


function Payment(props) {
  const [openCreatePaymentForm, setOpenCreatePaymentForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [editData, setEditData] = useState({});
  const [openEditPaymentForm, setOpenEditPaymentForm] = useState(false);

  const openCreatePaymentCardFn = (val) => {
    setOpenCreatePaymentForm(val)
  }
  const deletePaymentCard = (id) => {
    // console.log("===id");
    // console.log(id);
    // if (id) {
    //   API.delete(`/auth/cards/${id}`)
    //     .then((response) => {
    //       alert("Address deleted successfully");
    //       let config = {
    //         headers: {
    //           Authorization: `Bearer ${props.user?.accessToken}`,
    //         },
    //         params: {
    //           user_id: props.user?.loggedInUser._id
    //         },
    //       }

    //       // API.get(`/auth/cards`, config).then((response) => {
    //       //   if (payments != response.data) {
    //       //     setPayments(response.data)
    //       //   }
    //       // });
    //     })
    //     .catch((err) => console.log(err));
    // }
  }

  useEffect(() => {
    // if (openEditPaymentForm == false && openCreatePaymentForm == false) {
    //   let config = {
    //     headers: {
    //       Authorization: `Bearer ${props.user?.accessToken}`,
    //     },
    //     params: {
    //       user_id: props.user?.loggedInUser._id
    //     },
    //   }

      // API.get(`/auth/cards`, config).then((response) => {
      //   if (payments != response.data) {
      //     setPayments(response.data)
      //   }
      // });
    // }

  }, [openCreatePaymentForm]);


  return (
    <div className="payment-container">
      {!openCreatePaymentForm &&
        <Container>
          <Row>
            <Col sm={3}>
              <ButtonTheme
                className="buy-now-btn save_btn"
                outline
                style={{ marginBottom: "20px", height: "50px" }}
                onClick={() => openCreatePaymentCardFn(true)}
              >
                {props.activeLanguage == 'en' ? 'Add Payment Card' : 'إضافة بطاقة الدفع'}
              </ButtonTheme>
            </Col>
          </Row>
          {payments?.map((x, index) => (
            <>
              <Row>
                <Col sm={8}>
                  <p><strong>Card Number : </strong> {x.card_number}</p>
                  <p><strong>Name : </strong> {x.name}</p>
                  <ButtonTheme
                    className="buy-now-btn buy_cart"
                    outline
                    onClick={() => deletePaymentCard(x._id)}
                  >
                    {props.activeLanguage == 'en' ? 'Delete' : 'حذف'}
                  </ButtonTheme>
                </Col>
                <Col sm={4}>
                  <p><strong>Card Name : </strong><span>{x.card_name}</span></p>
                  <p><strong>Expiry :</strong> {x.exp_date}</p>
                </Col>
              </Row>
              <hr></hr>
            </>
          ))}

          {/* <Row>
            <Col sm={8}>
              <p>Card ending in <strong>7200</strong></p>
              <p><strong>Name :</strong> Lovetto Nazareth</p>
              <ButtonTheme
                className="buy-now-btn buy_cart"
                outline
              >
                {props.language == 'en' ? 'Delete' : 'Delete'}
              </ButtonTheme>
            </Col>
            <Col sm={4}>
              <p><span>Visa</span></p>
              <p><strong>Expiry :</strong> Aug, 2022</p>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col sm={8}>
              <p>Card ending in <strong>7200</strong></p>
              <p><strong>Name :</strong> Lovetto Nazareth</p>
              <ButtonTheme
                className="buy-now-btn buy_cart"
                outline
              >
                {props.language == 'en' ? 'Delete' : 'Delete'}
              </ButtonTheme>
            </Col>
            <Col sm={4}>
              <p><span>Visa</span></p>
              <p><strong>Expiry :</strong> Aug, 2022</p>
            </Col>
          </Row> */}

        </Container>
      }
      {openCreatePaymentForm &&
        <CreatePayment
          language={props.activeLanguage}
          openCreatePaymentCardFn={openCreatePaymentCardFn}
        />
      }
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(Payment);

