import React, { useState } from "react";
import { Modal, Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { MdClose } from "react-icons/md";

import ButtonTheme from "./../../ButtonTheme";
import { API } from "../../../http/API";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";

const initialObj = {
  user_id: "",
  product_id: "",
  rating: "",
  comments: "",
};

const Login = (props) => {
  const history = useHistory();
  const [reviewData, setReviewData] = useState(initialObj);
  const [showSpinner, setShowSpinner] = useState(false);

  //!--------Handle Input Fields----------
  const handleInputFields = (e) => {
    // debugger;
    let updateField = { ...reviewData };
    updateField[e.target.name] = e.target.value;
    setReviewData(updateField);
    // console.log("Input fields", updateField);
  };
  //!------Handle Rating ----------
  const ratingChanged = (newRating, value) => {
    // debugger;
    let updateRating = { ...reviewData };
    updateRating[value] = newRating;
    setReviewData(updateRating);
    // console.log("Rating", updateRating);
  };
  //!---------Handle Submit---------
  const handleSubmit = () => {
    // debugger;
    const updatedData = {
      ...reviewData,
      product_id: props.productId,
      user_id: props.userId,
      is_approved: false,
    };
    // debugger;
    API.post(`/reviews`, updatedData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert("Your review has been submitted successfully");
          setReviewData(initialObj);
          props.onHide();
        }
      })
      .catch((err) => console.log(err));
    // console.log("Updated Data response", updatedData);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ height: "90vh" }}
    >
      <div className="review-wrapper">
        <Container>
          <MdClose className="close-icon" onClick={props.onHide} />
          <div className="review-heading">
            <span>Write Your Review</span>
          </div>
        </Container>

        <Container>
          <div className="form-wrapper">
            <Form autoComplete="">
              <Row>
                <Col sm={12}>
                  <Form.Group controlId="review" className="mt-3">
                    <Form.Label>Rating</Form.Label>
                    {/* <div className="review-star"> */}
                    {/* <ReactStars
                      count={5}
                      name="rating"
                      value={reviewData.rating || 1}
                      onChange={(newRating) => {
                        ratingChanged(newRating, "rating");
                      }}
                      size={25}
                      activeColor="gold"
                      color="#eaeaea"
                      edit={true}
                      isHalf
                    /> */}
                    {/* </div> */}
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="comments">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="comments"
                      value={reviewData.comments}
                      onChange={handleInputFields}
                    />
                  </Form.Group>
                </Col>

                <Col sm={12} className="login-button-col">
                  <ButtonTheme
                    variant="primary"
                    style={{
                      borderRadius: "4px",
                      width: "180px",
                      fontSize: "15px",
                    }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </ButtonTheme>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (data) =>
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      }),
    registerSuccess: (data) =>
      dispatch({
        type: "REGISTRATION_SUCCESS",
        payload: data,
      }),
    wishlistSuccess: (data) =>
      dispatch({
        type: "GET_WISHLIST_SUCCESS",
        payload: {
          wishlist: data,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
