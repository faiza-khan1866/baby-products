import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { IoIosHeartEmpty, IoIosTrash } from "react-icons/io";
import { constants } from "../../utils/constants";
import ButtonTheme from "./../../components/ButtonTheme";
import './Address.scss';
import { API } from '../../http/API';
import  SwalToast from '../Swal'

// useEffect(() => {
//     if (openEditer == false && openCreateForm == false) {
//       let config = {
//         headers: {
//           Authorization: `Bearer ${props.user?.accessToken}`,
//         },
//         params: {
//           user_id: props.user?.loggedInUser._id
//         },
//       }

//       API.get(`/auth/address`, config).then((response) => {

//         console.log("auth/address")
//         console.log(response.data)
//         if (addresses != response.data) {
//           setAddresses(response.data)
//           console.log("addresses")
//           console.log(addresses)
//         }
//       });
//     }

//   }, [openEditer, openCreateForm]);

function EditAddress(props) {
    // console.log("props edit address :: ", props.data)

    const initialObject = {
        first_name: props.data.first_name,
        last_name: props.data.last_name,
        phone: props.data.phone,
        apartment: props.data.apartment,
        user_id: props.data.user_id,
        city: props.data.city,
        landmark: props.data.landmark,
        id: props.data._id
    };

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
        let newFormdata = new FormData();
        newFormdata.append("first_name", `${formData.first_name}`);
        newFormdata.append("last_name", formData.last_name);
        newFormdata.append("phone", formData.phone);
        newFormdata.append("apartment", formData.apartment);
        newFormdata.append("user_id", formData.user_id);
        newFormdata.append("landmark", formData.landmark);
        newFormdata.append("city", formData.city);

        API.put(`/auth/address/${formData.id}`, formData)
            .then((res) => {
                
                SwalToast.fire({
                    icon: 'success',
                    title: props.global?.activeLanguage == 'en' ? 'Address updated successfully' : 'تم تحديث العنوان بنجاح'
                  })
                let a = {}
                props.openEditForm(false, a)
            })
            .catch((err) => alert("Something went wrong"));

        // let name =
        //     contactForm.first_name + " " + contactForm.last_name;
        // let phone = contactForm.phone;
        // let address = contactForm.address;

        // let updateValue = { name, phone, address };

        // console.log("Edit Address :: ", updateValue);
    };

    return (
        <div className="edit-address-container">
            <h2>Edit Address</h2>
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
                            <Form.Group controlId="address">
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
                                onClick={() => props.openEditForm(false)}
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
    };
};

export default connect(mapStateToProps)(EditAddress);

