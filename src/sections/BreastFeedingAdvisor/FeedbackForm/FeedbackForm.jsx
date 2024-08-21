import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaEnvelope, FaPen, FaMobile } from "react-icons/fa";

import { Col, Container, Form, InputGroup } from "react-bootstrap";
import ButtonTheme from "../../../components/ButtonTheme";

const FeedbackForm = () => {
  return (
    <div className="feedback-section">
      <Container>
        <div className="feedback-heading">
          <h6>
            Your email address will not be published. Required fields are marked
          </h6>
        </div>
        <div>
          <Form>
            <Form.Row>
              <Form.Group lg={6} as={Col}>
                <InputGroup className="form-input-wrap">
                  <Form.Control
                    className="input"
                    type="name"
                    placeholder="Name*"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <BsPersonFill className="form-icon" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
              <Form.Group lg={6} as={Col}>
                <InputGroup className="form-input-wrap">
                  <Form.Control
                    className="input"
                    type="email"
                    placeholder="Email*"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaEnvelope className="form-icon" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup className="form-input-wrap">
                  <Form.Control
                    className="input"
                    type="contact"
                    placeholder="Mobile*"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaMobile className="form-icon" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup className="text-area-wrap">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="comment"
                    placeholder="Enter your comment here..."
                    className="text-area"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text className="review-icon">
                      <FaPen />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <ButtonTheme
                  variant="primary"
                  style={{ borderRadius: "6px", width: "150px", marginTop: '1rem' }}
                >
                  Submit
                </ButtonTheme>
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default FeedbackForm;
