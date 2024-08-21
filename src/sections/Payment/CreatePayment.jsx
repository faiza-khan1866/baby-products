import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { IoIosHeartEmpty, IoIosTrash } from "react-icons/io";
import { constants } from "../../utils/constants";
import ButtonTheme from "../../components/ButtonTheme";
import '../Address/Address.scss';
import { API } from '../../http/API';

const initialObject = {
    card_name: "",
    card_number: "",
    name: "",
    exp_date: "",
    user_id: ""
};

function CreatePayment(props) {
    const [paymentForm, setPaymentForm] =
        useState(initialObject);

    const handleInputFields = (e) => {
        let updateValue = { ...paymentForm };
        updateValue[e.target.name] = e.target.value;
        setPaymentForm(updateValue);
        // console.log("Update values", updateValue);
    };

    const handleSubmit = () => {

        let formData = paymentForm

        formData.user_id = props.user.loggedInUser._id

        let newFormdata = new FormData();
        newFormdata.append("card_name", `${formData.card_name}`);
        newFormdata.append("card_number", formData.card_number);
        newFormdata.append("name", formData.name);
        newFormdata.append("exp_date", formData.exp_date);
        newFormdata.append("user_id", formData.user_id);

        API.post(`/auth/cards`, newFormdata, {
            "Content-Type": `multipart/form-data; boundary=${newFormdata._boundary}`,
        }).then((response) => {
            // console.log("===response")
            // console.log(response)
            props.openCreatePaymentCardFn(false)
        }).catch((error) => {
            // setShowSpinner(false);
            alert("There was some error Please try again.");
        });

    };

    return (
        <div className="edit-address-container">
            <h2>Create Payment Card</h2>
            <Row>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="card_name">
                                <Form.Control
                                    type="text"
                                    name="card_name"
                                    placeholder={props.language === "en" ? "Card Name" : "اسم البطاقة"}
                                    required
                                    value={paymentForm.card_name}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="card_number">
                                <Form.Control
                                    type="text"
                                    name="card_number"
                                    placeholder={props.language === "en" ? "Card Number" : "رقم البطاقة"}
                                    value={paymentForm.last_name}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <Form.Group controlId="name">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder={props.language === "en" ? "Name" : "اسم"}
                                    value={paymentForm.name}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <Form.Group controlId="exp_date">
                                <Form.Control
                                    type="text"
                                    name="exp_date"
                                    placeholder={props.language === "en" ? "Expiry Date" : "تاريخ الانتهاء"}
                                    value={paymentForm.exp_date}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <ButtonTheme
                                variant="primary"
                                onClick={handleSubmit}
                                style={{
                                    borderRadius: "6px",
                                    width: "150px",
                                }}
                            >
                                {props.language === "en" ? "Submit" : "إرسال"}
                            </ButtonTheme>
                            <ButtonTheme
                                className="buy-now-btn buy_cart"
                                onClick={() => props.openCreatePaymentCardFn(false)}
                                outline
                            >
                                {props.language == 'en' ? 'cancel' : 'cancel'}
                            </ButtonTheme>
                        </Col>
                    </Row>
                </Form>

            </Row>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
        user: state.userReducer
    };
};

export default connect(mapStateToProps)(CreatePayment);

