import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ButtonTheme from "./../../../components/ButtonTheme";
// import locationSVG from "./../../../assets/images/shapes/moon-location.svg";
// import locationSVG from "./../../../assets/images/slider/slider_03.jpg";
import locationSVG from "./../../../assets/images/Contact US(650x650).png";
import { API } from "../../../http/API";
import axios from "axios";
import { constants } from "../../../utils/constants";
//import validator from "validator";

const initialObject = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
};
function ContactForm({ language }) {
  const [contactForm, setContactForm] = useState(initialObject);
  const [double, setDouble] = useState(false);
  const handleInputFields = (e) => {
    let updateValue = { ...contactForm };
    updateValue[e.target.name] = e.target.value;
    setContactForm(updateValue);
    // console.log("Update values", updateValue);
  };

  const handleSubmit = () => {
    let name = contactForm.first_name + " " + contactForm.last_name;
    let email = contactForm.email;
    let phone = contactForm.phone;
    let message = contactForm.message;
    if (contactForm.first_name === "") {
      alert("Please enter your name");
      return;
    }

    if (email === "") {
      alert("Please enter you valid email");
      return;
    }

    if (phone === "") {
      alert("Please enter your phone number");
      return;
    }
    if (message === "") {
      alert("Please enter your message");
      return;
    }

    let updateValue = { name, email, phone, message };
    API.post("/insertContact", updateValue)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setContactForm({ ...initialObject });
          alert("Your feedback sent successfully");
          setDouble(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setDouble(false);
      });
  };

  const successUrl = () => {
    alert("success url");
  };

  return (
    <div className="contact-form">
      <Container>
        <div className="section-title-underlined">
          <h1>{constants?.site_content?.contact_page_title[language]}</h1>
        </div>
        <div className="form-wrapper">
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <h5>{constants?.site_content?.contact_feedback[language]}</h5>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>
                        {constants?.site_content?.first_name[language]}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        required
                        value={contactForm.first_name}
                        onChange={handleInputFields}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>
                        {constants?.site_content?.last_name[language]}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={contactForm.last_name}
                        onChange={handleInputFields}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="email">
                      <Form.Label>
                        {constants?.site_content?.email[language]}
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        // pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                        pattern=".+@globex\.com"
                        required
                        value={contactForm.email}
                        onChange={handleInputFields}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="mobileNumber">
                      <Form.Label>
                        {constants?.site_content?.mobile_phone[language]}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleInputFields}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="message">
                      <Form.Label>
                        {constants?.site_content?.message[language]}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputFields}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <ButtonTheme
                      variant="primary"
                      onClick={() => {
                        handleSubmit();
                        setDouble(true);
                      }}
                      style={{
                        borderRadius: "6px",
                        width: "150px",
                      }}
                      disabled={double === true ? true : false}
                    >
                      {constants?.site_content?.get_in_touch[language]}
                    </ButtonTheme>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={6} lg={{ span: 6, offset: 0 }}>
                <div className="location-image">
                  <img src={locationSVG} alt="location" />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default ContactForm;
