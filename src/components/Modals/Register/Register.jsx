import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import ButtonTheme from "./../../ButtonTheme";
import { API } from "../../../http/API";
import { Link } from "react-router-dom";
import SwalToast from "../../../sections/Swal/SwalToast";
import ClipLoader from "react-spinners/BounceLoader";
import useGetReq from "../../customHooks/useGetReq";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getData, cancelRequests] = useGetReq();

  const trimesters = [
    {
      en: "First Trimester",
      ar: "الفصل الأول",
    },
    {
      en: "Second Trimester",
      ar: "الفصل الثاني",
    },
    {
      en: "Third Trimester",
      ar: "الربع الثالث",
    },
  ];

  const kidAges = [
    {
      en: "0-3 months",
      ar: "0-3 أشهر",
    },
    {
      en: "3-6 months",
      ar: "3-6 شهور",
    },
    {
      en: "6-9 months",
      ar: "6-9 شهور",
    },
    {
      en: "9-18 months",
      ar: "9-18 شهرًا",
    },
    {
      en: "18-24 months",
      ar: "18-24 شهرًا",
    },
    {
      en: "24-36 months",
      ar: "من 24 إلى 36 شهرًا",
    },
  ];

  let initData = {
    mobile: "",
    address: "",
    area: "",
    emirates: "",
    country: "UAE",
    kid_age: "",
    pregnent: "",
  };

  const [formData, setFormData] = useState(initData);
  const [areaData, setAreaData] = useState({});
  const [showOther, setShowOther] = useState(false);

  const [emiratesData, setEmiratesData] = useState([]);

  useEffect(() => {
    getData(
      "https://pigeonarabia.com/E_Commerce_APis_v2/public/api/auth/emirates",
      setEmiratesData
    );
    return cancelRequests;
  }, []);

  // const getEmiratesData = useCallback(() => {
  //   API.get(`auth/emirates`)
  //     .then((response) => {
  //       const allData = response.data?.data;
  //       setEmiratesData(allData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, emiratesData);

  // useEffect(() => {
  //   getEmiratesData();
  // }, []);

  const handleSubmit = (event) => {
    let lang = props.global.activeLanguage || "en";
    let url = `${window.location.origin}/${lang}/register/success`;

    setShowSpinner(true);
    const passwordLength = password.length;
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      passwordLength >= 6 &&
      formData.mobile !== "" &&
      formData.address !== "" &&
      formData.area !== "" &&
      formData.emirates !== ""
    ) {
      let formdata = new FormData();
      formdata.append("name", `${firstName} ${lastName}`);
      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("mobile", formData.mobile);
      formdata.append("address", formData.address);
      formdata.append("area", formData.area);
      formdata.append("emirates", formData.emirates);
      formdata.append("user_type", "user");
      formdata.append("redirect_url", url);

      if (formData.kid_age) {
        formdata.append("kid_age", formData.kid_age);
      }
      if (formData.pregnent) {
        formdata.append("pregnent", formData.pregnent);
      }

      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("password_confirmation", password);

      API.post(`/auth/register`, formdata, {
        "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
      })
        .then((response) => {
          setShowSpinner(false);
          if (response.data.status == "email error") {
            if (response.data[0].email?.length > 0) {
              SwalToast.fire({
                title:
                  props.global.activeLanguage === "en"
                    ? response.data[0].email[0]
                    : "البريد الإلكتروني تم أخذه",
                icon: "error",
              });
              return false;
            }
            if (response.data[0].firstName?.length > 0) {
              SwalToast.fire({
                title:
                  props.global.activeLanguage === "en"
                    ? response.data[0].firstName[0]
                    : "مطلوب حقل الاسم الأول",
                icon: "error",
              });
              return false;
            }
            if (response.data[0].lastName?.length > 0) {
              SwalToast.fire({
                title:
                  props.global.activeLanguage === "en"
                    ? response.data[0].lastName[0]
                    : "حقل الاسم الأخير مطلوب",
                icon: "error",
              });
              return false;
            }
            if (response.data[0].mobile?.length > 0) {
              SwalToast.fire({
                title:
                  props.global.activeLanguage === "en"
                    ? response.data[0].mobile[0]
                    : "حقل المحمول مطلوب",
                icon: "error",
              });
              return false;
            }
          }

          setFirstName("");
          setLastName("");
          setFormData(initData);
          setEmail("");
          setPassword("");

          SwalToast.fire({
            title:
              props.global.activeLanguage === "en"
                ? "You will now receive an account verification email. Please verify your account"
                : "سوف تتلقى الآن رسالة للتحقق من الحساب على بريدك الإلكتروني. يرجى تأكيد حسابك",
            icon: "success",
          });
        })
        .catch((error) => {
          setShowSpinner(false);
          SwalToast.fire({
            title:
              props.global.activeLanguage === "en"
                ? "Something Went Wrong Please try again"
                : "هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق",
            icon: "error",
          });
        });
    } else {
      setShowSpinner(false);
      if (firstName === "") {
        if (props.global.activeLanguage === "en") {
          alert("Please Enter First Name.");
        } else {
          alert("فضلاً أدخل الاسم الأول");
        }
        return false;
      }
      if (lastName === "") {
        if (props.global.activeLanguage === "en") {
          alert("Please Enter Last Name.");
        } else {
          alert("فضلاً أدخل الاسم الأخير");
        }

        return false;
      }

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      } else {
        if (props.global.activeLanguage === "en") {
          alert("Please enter a valid email");
        } else {
          alert("فضلاً أدخل بريد الكتروني صحيح");
        }
        return false;
      }

      if (password === "") {
        if (props.global.activeLanguage === "en") {
          alert("Please Enter Password.");
        } else {
          alert("الرجاء إدخال كلمة المرور");
        }
        return false;
      } else if (passwordLength < 6) {
        if (props.global.activeLanguage === "en") {
          alert("Password must be at least 6 characters.");
        } else {
          alert("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل");
        }
        return false;
      }

      if (formData.mobile == "") {
        if (props.global.activeLanguage === "en") {
          alert("Please Enter Mobile Number");
        } else {
          alert("الرجاء إدخال رقم هاتف صحيح");
        }
        return false;
      } else if (formData.mobile.length != 9) {
        if (props.global.activeLanguage === "en") {
          alert("Please enter Correct phone number");
        } else {
          alert("الرجاء إدخال رقم هاتف صحيح");
        }
        return;
      }

      if (formData.address == "") {
        if (props.global.activeLanguage === "en") {
          alert("Please Enter Correct Address");
        } else {
          alert("فضلاً أدخل عنوان صحيح");
        }
        return false;
      }
      if (formData.area == "") {
        if (props.global.activeLanguage === "en") {
          alert("Please Select an Area");
        } else {
          alert("يرجى تحديد نوع العنوان مثلاً المنزل أو المكتب");
        }
        return false;
      }
      if (formData.emirates == "") {
        if (props.global.activeLanguage === "en") {
          alert("Please Select a state");
        } else {
          alert("يرجى اختيار الدولة");
        }
        return false;
      }
    }
  };

  const handleEmirateChange = (e) => {
    // setF
    let tmpEm = e.target.value;
    setFormData({ ...formData, emirates: tmpEm });
    setShowOther(false);
    let selectedEmirate = emiratesData.find(
      (element) => element.name == e.target.value
    );

    const isEmpty = Object.keys(selectedEmirate).length === 0;

    if (!isEmpty) {
      setAreaData(selectedEmirate.locations);
    } else {
      setAreaData([]);
    }
  };
  const handleAreaChange = (e) => {
    // setF
    let tmpArea = e.target.value;
    if (tmpArea == "other") {
      setShowOther(true);
      setFormData({ ...formData, area: "" });
    } else {
      setFormData({ ...formData, area: tmpArea });
    }
  };
  const handleValuesChange = (e) => {
    // setF
    let tmpArea = e.target.value;
    setFormData({ ...formData, [e.target.name]: tmpArea });
  };

  const setMobileNumber = (e) => {
    let a = Number(e.target.value);

    if (e.target.value === "") {
      setFormData({ ...formData, mobile: "" });
    } else if (!isNaN(a)) {
      setFormData({ ...formData, mobile: e.target.value });
    } else {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div
        className={`${
          showSpinner ? "d-flex" : "d-none"
        } flex-column text-center align-items-center justify-content-center`}
        style={{
          position: "absolute",
          zIndex: 999,
          height: "100%",
          width: "100%",
          background: "rgba(255,255,255,0.8)",
        }}
      >
        <ClipLoader color={"#e65550"} loading={true} size={80} />
      </div>
      <div className="register-wrapper">
        <Container>
          <div
            className={`register-heading ${
              props.global.activeLanguage === "ar"
                ? "register-heading-Arabic"
                : ""
            }`}
          >
            <span>
              {props.global.activeLanguage == "en" ? "Register" : "سجل"}
            </span>
          </div>
        </Container>

        <Container>
          <div className="form-wrapper">
            <Form>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="firstName">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "First Name"
                        : "الإسم الأول"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter First Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "Last Name"
                        : "الإسم الاخير"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="email">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "Email"
                        : "البريد الالكتروني"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="password">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "Password"
                        : "كلمة المرور"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                {props.global.activeLanguage == "en" && (
                  <Col
                    lg={1}
                    md={2}
                    sm={12}
                    className={
                      props.global.activeLanguage == "en"
                        ? "noPaddingRight"
                        : "noPaddingRight"
                    }
                  >
                    <Form.Group controlId="mobile">
                      <Form.Label>
                        {props.global.activeLanguage == "en" ? "Mobile" : ""}
                        &nbsp;
                      </Form.Label>
                      <Form.Control
                        required
                        name=""
                        type="text"
                        value={"+971 (0)"}
                        disabled="disabled"
                        className={
                          props.global.activeLanguage == "en"
                            ? "countryCodyEn"
                            : "countryCodyEn"
                        }
                      />
                    </Form.Group>
                  </Col>
                )}
                <Col
                  lg={5}
                  md={4}
                  sm={12}
                  className="noPaddingLeft ltrDirection"
                >
                  <Form.Group controlId="mobile2">
                    <Form.Label>
                      {props.global.activeLanguage == "en" ? "" : "رقم الهاتف"}
                      &nbsp;
                    </Form.Label>
                    <input
                      required
                      name="mobile"
                      type="text"
                      maxLength="9"
                      value={formData.mobile}
                      onChange={setMobileNumber}
                      className={"form-control mobileNoClassEn"}
                    />
                  </Form.Group>
                </Col>
                {props.global.activeLanguage == "ar" && (
                  <Col
                    lg={1}
                    md={2}
                    sm={12}
                    className={
                      props.global.activeLanguage == "en"
                        ? "noPaddingRight ltrDirection"
                        : "noPaddingRight ltrDirection"
                    }
                  >
                    <Form.Group controlId="mobile">
                      <Form.Label>
                        {props.global.activeLanguage == "en" ? "Mobile" : ""}
                        &nbsp;
                      </Form.Label>
                      <Form.Control
                        required
                        name=""
                        type="text"
                        value={"+971 (0)"}
                        disabled="disabled"
                        className={
                          props.global.activeLanguage == "en"
                            ? "countryCodyEn"
                            : "countryCodyEn"
                        }
                      />
                    </Form.Group>
                  </Col>
                )}
                <Col sm={12}>
                  <Form.Group controlId="address">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "Delivery Address"
                        : "عنوان التسليم"}
                    </Form.Label>
                    <Form.Control
                      required
                      name="address"
                      type="text"
                      value={formData.address}
                      placeholder={
                        props.global.activeLanguage === "en"
                          ? "Street name/ Building / Flat"
                          : "العنوان"
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group controlId="Emirates" className="leftToRight">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "Emirates"
                        : "الإمارة"}
                    </Form.Label>
                    <select
                      onChange={handleEmirateChange}
                      name="emirates"
                      className="registerSelect"
                    >
                      <option selected value="" disabled>
                        {"Select Emirates"}
                      </option>
                      {emiratesData?.length > 0 &&
                        emiratesData?.map((data) => {
                          return <option value={data.name}>{data.name}</option>;
                        })}
                    </select>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="Area" className="leftToRight">
                    <Form.Label>
                      {props.global.activeLanguage == "en" ? "Area" : "المنطقة"}
                    </Form.Label>
                    {!showOther && (
                      <select
                        onChange={handleAreaChange}
                        className="registerSelect"
                      >
                        <option selected value="" disabled>
                          {"Select Area"}
                        </option>
                        {areaData.length > 0 &&
                          areaData.map((data) => {
                            return (
                              <option value={data.name}>{data.name}</option>
                            );
                          })}
                        <option value="other">{"Other"}</option>
                      </select>
                    )}
                    {showOther && (
                      <Form.Control
                        required
                        name="area"
                        type="text"
                        value={formData.area}
                        onChange={(e) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="kidsAge">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "How old is your Kid"
                        : "عمر الطفل"}
                    </Form.Label>
                    <select
                      onChange={handleValuesChange}
                      name="kid_age"
                      className="registerSelect"
                    >
                      <option selected value="" disabled>
                        {props.global?.activeLanguage === "en"
                          ? "Select Age"
                          : "حدد العمر"}
                      </option>
                      {kidAges.length > 0 &&
                        kidAges.map((data) => {
                          return (
                            <option value={data.en}>
                              {props.global?.activeLanguage === "en"
                                ? data.en
                                : data.ar}
                            </option>
                          );
                        })}
                    </select>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="Area">
                    <Form.Label>
                      {props.global.activeLanguage == "en"
                        ? "I am Pregnant"
                        : "فترة الحمل"}
                    </Form.Label>
                    <select
                      onChange={handleValuesChange}
                      name="pregnent"
                      className="registerSelect"
                    >
                      <option selected value="" disabled>
                        {props.global?.activeLanguage === "en"
                          ? "Select Trimester"
                          : "حدد الفصل الثالث"}
                      </option>
                      {trimesters.length > 0 &&
                        trimesters.map((data) => {
                          return (
                            <option value={data.en}>
                              {props.global?.activeLanguage === "en"
                                ? data.en
                                : data.ar}
                            </option>
                          );
                        })}
                    </select>
                  </Form.Group>
                </Col>
                <Col sm={12} className="login-button-col">
                  <Form.Group controlId="paymeny" className="agreeToTerms">
                    <label for="paymentmethod2">
                      <div style={{ fontSize: "12px" }}>
                        <div className="agreeToTermsdiv">
                          <p className="agreeToPigeon">
                            {props.global?.activeLanguage == "en"
                              ? "By registering, you agree to Pigeon’s"
                              : "عبر التسجيل، فإنك توافق على بيجون "}
                          </p>
                          <Link to={`/${global.activeLanguage}/term-of-use`}>
                            {props.global?.activeLanguage == "en"
                              ? " Terms of Use "
                              : " شروط الإستخدام"}
                          </Link>
                        </div>
                        <p>
                          {props.global?.activeLanguage == "en"
                            ? "Pigeon may send you communications. You can unsubscribe through the link in each communication we send"
                            : "يمكننا إرسال بعض العروض والرسائل إليك، تستطيع إلغاء الاشتراك عبر الرابط الموجود في كل رسالة نقوم بإرسالها."}
                        </p>
                      </div>
                    </label>
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
                    {props.global.activeLanguage == "en"
                      ? "Register now"
                      : "سجل الآن‎"}
                  </ButtonTheme>
                </Col>
                <Col sm={12}>
                  <p className="text-center small">
                    {props.global.activeLanguage == "en"
                      ? "Already have an account ?"
                      : "لديك حساب بالفعل؟"}{" "}
                    &nbsp;
                    <span
                      style={{
                        color: "#e65550",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => props.shiftToLogin()}
                    >
                      {props.global.activeLanguage == "en"
                        ? "Login"
                        : "تسجيل دخول"}
                    </span>
                  </p>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
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
    registerSuccess: (data) =>
      dispatch({
        type: "REGISTRATION_SUCCESS",
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
