import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { IoIosHeartEmpty, IoIosTrash } from "react-icons/io";
import { constants } from "../../utils/constants";
import ButtonTheme from "../../components/ButtonTheme";
import './Address.scss';
import { API } from '../../http/API';
import SwalToast from "../Swal/SwalToast";

const initialObject = {
    first_name: "",
    last_name: "",
    phone: "",
    apartment: "",
};

function CreateAddress(props) {
    const [contactForm, setContactForm] =
        useState(initialObject);

    const handleInputFields = (e) => {
        let updateValue = { ...contactForm };
        updateValue[e.target.name] = e.target.value;
        setContactForm(updateValue);
        // console.log("Update values", updateValue);
    };

    const handleSubmit = () => {

        let formData = contactForm

        formData.user_id = props.user.loggedInUser._id

        let newFormdata = new FormData();
        newFormdata.append("first_name", `${formData.first_name}`);
        newFormdata.append("last_name", formData.last_name);
        newFormdata.append("phone", formData.phone);
        newFormdata.append("apartment", formData.apartment);
        newFormdata.append("user_id", formData.user_id);
        newFormdata.append("landmark", formData.landmark);
        newFormdata.append("city", formData.city);

        API.post(`/auth/address`, newFormdata, {
            "Content-Type": `multipart/form-data; boundary=${newFormdata._boundary}`,
        }).then((response) => {

            // if(props.global?.activeLanguage == 'ar'){
            //     SwalToast.fire({
            //       title: 'تم إنشاء العنوان بنجاح',
            //       icon: 'success'
            //     })
            // } else {
              SwalToast.fire({
                icon: 'success',
                title: props.global?.activeLanguage == 'en' ? 'Address created successfully' : 'تم إنشاء العنوان بنجاح'
              })
            // }

            props.openCreateFormFn(false)
        }).catch((error) => {
            // setShowSpinner(false);
            alert("There was some error Please try again.");
        });

    };

    return (
        <div className="edit-address-container">
            <h2>Create Address</h2>
            <Row>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="firstName">
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    placeholder={props.language === "en" ? "Firstname" : "الإسم الأول"}
                                    required
                                    value={contactForm.first_name}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="lastName">
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    placeholder={props.language === "en" ? "Lastname" : "اسم العائلة"}
                                    value={contactForm.last_name}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="mobileNumber">
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder={props.language === "en" ? "Phone Number" : "رقم الهاتف"}
                                    value={contactForm.phone}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="landmark">
                                <Form.Control
                                    type="text"
                                    name="landmark"
                                    placeholder={props.language === "en" ? "Landmark" : "معلم معروف"}
                                    required
                                    value={contactForm.landmark}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="city">
                                <Form.Control
                                    type="text"
                                    name="city"
                                    placeholder={props.language === "en" ? "City" : "مدينة"}
                                    value={contactForm.city}
                                    onChange={handleInputFields}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <Form.Group controlId="apartment">
                                <Form.Control
                                    type="text"
                                    name="apartment"
                                    placeholder={props.language === "en" ? "Street name/ Building / Flat" : "شقة، جناح، إلخ"}
                                    value={contactForm.apartment}
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
                                onClick={() => props.openCreateFormFn(false)}
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

export default connect(mapStateToProps)(CreateAddress);

