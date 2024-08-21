import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";
import SwalToast from "../../../sections/Swal/SwalToast";
import { connect } from "react-redux";
import { MdClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
import ClipLoader from "react-spinners/BounceLoader";
// import Toast from "react-bootstrap/Toast";
import ButtonTheme from "./../../ButtonTheme";
import { API } from "../../../http/API";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useHistory } from "react-router-dom";
import axios from "axios";

const googleClientId =
  // "443788196047-43sg5nlk5qh2a2p3615ifqlhe68apjvk.apps.googleusercontent.com";
  "505082694781-ec503g1ljvj53dd76j21iq1ro6pk0l5o.apps.googleusercontent.com";
const facebookClientId = "1461431724244066";
// const secret_key = "71af4ec0c95587ff3d3b01c3016285e7";

const Login = (props) => {
  const history = useHistory();
  const [showSpinner, setShowSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [reSetemail, setReSetemail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePasswordReset = () => {
    let url = window.location.href;

    if(!reSetemail){
      SwalToast.fire({
        title: props.global.activeLanguage === "en" ? "Please Enter a Valid Email" : "يرجى إدخال البريد الإلكتروني الصحيح",
        icon: 'error'
      })
      return false;
    } else if(reSetemail == "") {
      SwalToast.fire({
        title: props.global.activeLanguage === "en" ? "Please Enter a Valid Email" : "يرجى إدخال البريد الإلكتروني الصحيح",
        icon: 'error'
      })
      return false;
    }

    let data = {
      email: reSetemail,
      redirect_url: url
    }

    API.post(`/forget-password`, data).then((response) => {
      if(response.data.status == 200){
        SwalToast.fire({
          title: props.global.activeLanguage === "en" ? "An Email is sent to your Accout Please go to Your Inbex to reset your Password" : "هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق",
          icon: 'success'
        })  
      } else if(response.data.status == 404){
        SwalToast.fire({
          title: props.global.activeLanguage === "en" ? "Please Make Sure the Email is Valid" : "Please Make Sure the Email is Valid",
          icon: 'error'
        })
      }
      
      // setMessage("An Email is sent to your Accout Please go to Your Inbex to reset your Password")
    }).catch(function (error) {

      SwalToast.fire({
        title: props.global.activeLanguage === "en" ? "Something Went Wrong Please Try Again Later" : "هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق",
        icon: 'error'
      })

    });
    
  }


  const handleSubmit = () => {
    // let a = 
    // console.log(a);
    // return false;

    // setShowSpinner(true);
    if (email !== '' && password !== '') {
      let formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("user_type", "user");

      let fData = {
        email:  email,
        password: password,
        user_type: "user"

      }

      // axios.post('https://prismcloudhosting.com/pigeon_apis_v3/public/api/paytabs',object1).then((response) => {
      //   // debugger;
      //   console.log(response.data.data)
      // })
      // .catch((error) => {
      //   console.log(error);
      // });


      // axios.post('https://prismcloudhosting.com/pigeon_apis_v3/public/api/auth/login', formdata, {
      //     "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
      //   }).then(function (response) {
      //     console.log("i was here lats check what happenes")
      //     history.goBack();
      //     props.loginSuccess(response.data);
      //   return false;
      // })
      // .catch(function (error) {
      //   alert("Invalid email/password combination. Please try again.");
      //   console.log(error);
      // });

      API.post(`/auth/login`, formdata, {
        "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
      })
        .then((response) => {
          // setShowSpinner(false);
          // console.log("response.data us",response.data)
          props.loginSuccess(response.data);
          if (response.data.access_token) {
            let config = {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
              params: {
                user_id: response.data.user._id
              },
            }

            API.get(`/auth/wishlist`, config).then((response) => {

              props.wishlistSuccess(response.data);
              
            });
            // console.log("i am here")
            // history.goBack();
            
          }

          
        })
        .catch((error) => {
          setShowSpinner(false);
          // setShow(true);
          alert("Invalid email/password combination. Please try again.");
        });
    } else {
      if (email === '') {
        alert("Please Enter Email.");
      }
      if (password === '') {
        alert("Please Enter Password.");
      }
    }
  };

  useEffect(() => {

    if(props.user.isAuthenticated && props.user.accessToken){

      if(props.global.loginInvoker == "checkout"){
        
        props.loginInvoker("");

        history.push(
          `/${props.global.activeLanguage}/checkout`
        );

      } else {
        
        history.push(
        `/${props.global.activeLanguage}/profile?active=basic`
        );
        
      }
    }
    // props.setDefaultLanguage();
  }, []);

  //----------------

  //Google Login
  const responseGoogle = (response) => {
    // debugger;
    setShowSpinner(true);
    let bearerToken = null;
    let formdata = new FormData();
    formdata.append("name", response.profileObj.name);
    formdata.append("email", response.profileObj.email);
    formdata.append(
      "password",
      response.profileObj.googleId
    );
    formdata.append(
      "password_confirmation",
      response.profileObj.googleId
    );
    formdata.append("is_social", true);

    API.post(`/auth/register`, formdata, {
      "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
    })
      .then((response) => {
        // debugger;
        setShowSpinner(false);
        props.registerSuccess(response.data);
        bearerToken = response.data?.access_token;
        API.get(`/auth/wishlist`, {
          user_id: response.data?._id
        }, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }).then((response) => {
          props.wishlistSuccess(response.data);
        });
        props.onHide();
        // debugger;
        // alert("You are logged in.");
        history.push(
          `/${props.global.activeLanguage}/profile?active=basic`
        );
      })
      .catch((error) => {
        setShowSpinner(false);
        console.log(error);
        // setShow(true);
        // alert("There was some error. Please try again.");
      });
  };
  //Facebook Login
  const responseFacebook = (response) => {
    setShowSpinner(true);
    let bearerToken = null;
    let formdata = new FormData();
    formdata.append("name", response.name);
    formdata.append("email", response.email);
    formdata.append("password", response.userID);
    formdata.append(
      "password_confirmation",
      response.userID
    );
    formdata.append("is_social", true);

    API.post(`/auth/register`, formdata, {
      "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
    })
      .then((response) => {
        // debugger;
        setShowSpinner(false);
        props.registerSuccess(response.data);
        bearerToken = response.data?.access_token;
        API.get(`/auth/wishlist`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }).then((response) => {
          props.wishlistSuccess(response.data);
        });
        props.onHide();
        // alert("You are logged in.");
        // history.push(`/${props.global?.activeLanguage}/profile`);
        history.push(
          `/${props.global.activeLanguage}/profile?active=basic`
        );
      })
      .catch((error) => {
        setShowSpinner(false);
        console.log(error);
        // setShow(true);
        // alert("There was some error. Please try again.");
      });

    // console.log("Response from Facebook login", response);
  };

  return (
    <div>
      <div className="login-wrapper">
        <Container>
          {/* <div className="close-icon-wrapper"> */}
          {/* </div> */}
          <div
            // className="login-heading"
            className={`login-heading ${props.global.activeLanguage === "ar" ? "login-heading-Arabic" : ""}`}
          >
            <span>{props.global.activeLanguage == 'en' ? 'Log In' : 'تسجيل دخول'}</span>
          </div>
          {/* <div className="login-sub-heading">
            <p>{props.global.activeLanguage == 'en' ? 'Login with your social media accounts' : 'تسجيل الدخول عبر مواقع التواصل الحسابات'}</p>
          </div> */}
          {/* <Row>
            <Col
              sm={12}
              md={6}
              className="google-login-col"
            >
              <GoogleLogin
                clientId={googleClientId}
                render={(renderProps) => (
                  <ButtonTheme
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="google-login-button"
                  >
                    <span>
                      <FcGoogle fontSize="20px" style={{ marginRight: "0.5rem" }} />
                      {props.global.activeLanguage == 'en' ? 'Continue with Google' : 'مواصلة عبر حساب قوقل'}</span>
                  </ButtonTheme>
                )}
                onSuccess={responseGoogle}
                onFailure={() =>
                  console.log(
                    "Something went wrong. Please try again."
                  )
                }
                cookiePolicy={"single_host_origin"}
              />
            </Col>
            <Col
              sm={12}
              md={6}
              className="facebook-login-col"
            >
              <FacebookLogin
                // appId={facebookClientId}
                // autoLoad={false}
                // callback={responseFacebook}
                // render={(renderProps) => (
                //   <ButtonTheme
                //     onClick={renderProps.onClick}
                //     className="facebook-login-button"
                //   >
                //     <TiSocialFacebook fontSize="20px" />
                //     <span>Continue with Facebook</span>
                //   </ButtonTheme>
                // )}

                appId={facebookClientId}
                autoLoad={false}
                fields="name,email,picture"
                render={(renderProps) => (
                  <ButtonTheme
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="facebook-login-button"
                  >
                    <span>
                      <TiSocialFacebook fontSize="20px" style={{ marginRight: "0.5rem" }} />
                      {props.global.activeLanguage == 'en' ? 'Continue with Facebook' : 'مواصلة عبر حساب فيسبوك'}</span>
                  </ButtonTheme>
                )}
                callback={responseFacebook}
                onFailure={() =>
                  console.log(
                    "Something went wrong. Please try again."
                  )
                }
                cookiePolicy={"single_host_origin"}

              />
            </Col>
          </Row> */}
        </Container>
        {/* <div className="login-divider-wrap">
          <hr />
        </div> */}
        <Container>
          <div className="form-wrapper">
            <Form autoComplete="new-password">
              <Row>
                <Col sm={12}>
                  <Form.Group controlId="email">
                    <Form.Label>{props.global.activeLanguage == 'en' ? 'Email' : 'البريد الالكتروني'}</Form.Label>
                    <Form.Control
                      type="email"
                      autoComplete="new-password"
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="password">
                    <Form.Label>{props.global.activeLanguage == 'en' ? 'Password' : 'كلمة المرور'}</Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
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
                    {props.global.activeLanguage == 'en' ? 'Login' : 'تسجيل دخول'}
                  </ButtonTheme>
                  <p
                      style={{
                        color: "#e65550",
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginLeft: '10px',
                        fontSize: '13px'
                      }}
                      onClick={handleShow}
                    >
                      {props.global.activeLanguage == 'en' ? 'Forgot Password?' : 'نسيت كلمة المرور؟'}
                    </p>
                </Col>
                <Col sm={12}>
                  <p className="text-center small">
                    {props.global.activeLanguage == 'en' ? "Don't have an account? " : "لا تملك حساب؟"}
                    <span
                      style={{
                        color: "#e65550",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        props.shiftToRegister()
                      }
                    >
                      {props.global.activeLanguage == 'en' ? 'Register' : 'سجل'}
                    </span>
                  </p>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>

        <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className={props.global.activeLanguage == 'ar' ? "modelHeadererCustom customarabic" : "modelHeadererCustom"}>
          <Modal.Title className={props.global.activeLanguage == 'ar' ? "arabicTitlepass":""}>{props.global.activeLanguage == 'ar' ? 'استعادة كلمة المرور' : 'Restore Password'}</Modal.Title>
          {/* <CloseButton /> */}
          {/* <button type="button" className="close" aria-hidden="true" onClick={this.props.onRequestHide}>&times;</button> */}
        </Modal.Header>
        <Modal.Body className="modalBodyCustom">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className={props.global.activeLanguage == 'ar' ? "arabiclabel" : ""}>{props.global.activeLanguage == 'ar' ? "البريد الالكتروني":"Email address"}</Form.Label>
              <Form.Control
                type="email"
                name="reSetEmail"
                // value={reSetEmail}
                onChange={(e) => setReSetemail(e.target.value)}
                placeholder={props.global.activeLanguage == 'en' ? "name@example.com" : ""}
                autoFocus
                required
              />
              <span>{message}</span> 
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modelFooterCustom">
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button className="resetbutton" variant="primary" onClick={handlePasswordReset}>
          {/* <Button type="submit" value="Submit" className="resetbutton"> */}
            {props.global.activeLanguage == 'ar' ? "اعادة تعيين" : "Reset"}
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/* <div
        className={`${
          showSpinner ? "d-flex" : "d-none"
        } flex-column text-center align-items-center justify-content-center`}
        style={{
          position: "absolute",
          zIndex: 99999,
          height: "100%",
          width: "100%",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <ClipLoader color={"#e65550"} loading={true} size={80} />
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    global: state.globalReducer,
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
      loginInvoker: (invoker) => dispatch({
        type: "LOGIN_INVOKER_CHECKOUT",
        invoker
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
