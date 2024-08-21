import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ButtonTheme from "./../../../components/ButtonTheme";
import { connect } from "react-redux";
import "./CheckoutForm.scss";
import { API } from "../../../http/API";
import SwalToast from "../../Swal/SwalToast";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";

function CheckoutForm(props) {
  const history = useHistory();
  const { cartBit, cart, user, swalMsg, emirates, promoCode } = props;

  const initialObject = {
    first_name: user?.loggedInUser?.firstName
      ? user.loggedInUser.firstName
      : "",
    last_name: user?.loggedInUser?.lastName ? user.loggedInUser.lastName : "",
    email: user?.loggedInUser?.email ? user.loggedInUser.email : "",
    phone: user?.loggedInUser?.mobile ? user.loggedInUser.mobile : "",
    message: "",
    address: user?.loggedInUser?.address ? user.loggedInUser.address : "",
    landmark: user?.loggedInUser?.area ? user.loggedInUser.area : "",
    city: user?.loggedInUser?.emirates ? user.loggedInUser.emirates : "",
    zipcode: "",
    paymentmethod: "",
    saveInfo: false,
    sendUpdates: false,
    country: "UAE",
    addressType: "",
    promo_code_id: "",
    promoCodeDiscount: "",
  };

  const [contactForm, setContactForm] = useState(initialObject);
  const [country, setCountry] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});

  const areas = [
    {
      _id: "1232342343",
      name: "satwa",
      arabicName: "السطوة",
    },
    {
      _id: "1232342344",
      name: "jabil ali",
      arabicName: "جبل علي",
    },
    {
      _id: "1232342345",
      name: "marina",
      arabicName: "مارينا",
    },
  ];

  const [areaData, setAreaData] = useState(areas);

  useEffect(() => {
    if (user?.loggedInUser?._id) {
      if (user.loggedInUser != contactForm) {
        const initialObject = {
          first_name: user?.loggedInUser?.firstName
            ? user.loggedInUser.firstName
            : "",
          last_name: user?.loggedInUser?.lastName
            ? user.loggedInUser.lastName
            : "",
          email: user?.loggedInUser?.email ? user.loggedInUser.email : "",
          phone: user?.loggedInUser?.mobile ? user.loggedInUser.mobile : "",
          message: "",
          address: user?.loggedInUser?.address ? user.loggedInUser.address : "",
          area: user?.loggedInUser?.area ? user.loggedInUser.area : "",
          state: user?.loggedInUser?.emirates ? user.loggedInUser.emirates : "",
          zipcode: "",
          paymentmethod: "",
          saveInfo: false,
          sendUpdates: false,
          country: "UAE",
          promo_code_id: promoCode?.promo_code_id
            ? promoCode?.promo_code_id
            : "",
          promoCodeDiscount: promoCode?.discount ? promoCode?.discount : 0,
          addressType: contactForm.addressType,
          paymentmethod: contactForm.paymentmethod,
        };
        setSelectedArea(user?.loggedInUser?.emirates);
        setContactForm(initialObject);
      }
    }
  }, [user, promoCode]);

  useEffect(() => {
    let payment = {
      productsValue: 0,
      discount: 0,
      shippingCharges: 0,
      subTotal: 0,
      finalTotal: 0,
      promo_discount: 0,
    };

    if (cart.length > 0) {
      cart.forEach((element) => {
        let price = element.price * element.quantity;
        let discounted_price = element?.discounted_price * element?.quantity;
        let discount = 0;

        if (discounted_price > 0) {
          discount = price - discounted_price;
          payment.productsValue += price;
          payment.discount += discount;
        } else {
          payment.productsValue += price;
        }
      });

      payment.subTotal = payment.productsValue - payment.discount;
      if (promoCode?.discount && promoCode?.discount != "") {
        let dateStr = new Date();
        let newDate = new Date(promoCode.promo_code_date);

        if (dateStr <= newDate) {
          let promo_discount_percent = Number(promoCode.discount);
          let data = payment.subTotal * promo_discount_percent;
          payment.promo_discount = data / 100;
        } else {
          props?.removePromoCode();
        }
      }

      let subTotalWithPromo = payment.subTotal - payment.promo_discount;

      if (subTotalWithPromo < 100) {
        payment.shippingCharges = 20;
      } else {
        payment.shippingCharges = 0;
      }

      payment.finalTotal = subTotalWithPromo + payment.shippingCharges;
    }
    setPaymentDetails(payment);
  }, [cartBit, cart, promoCode]);

  useEffect(() => {
    if (swalMsg && swalMsg == "Order placed successfully") {
      let icon = "success";
      Swal.fire({
        icon: icon,
        title:
          props.global?.activeLanguage == "en"
            ? "Thank you for shopping with us!"
            : "شكرا للتسوق معنا!",
        text:
          props.global?.activeLanguage == "en"
            ? "You will receive an email notification for order confirmation"
            : "ستتلقى إشعارًا بالبريد الإلكتروني لتأكيد الطلب",
        showCancelButton: true,
        confirmButtonText:
          props.global?.activeLanguage == "en"
            ? "Continue Shopping"
            : "مواصلة التسوق",
        confirmButtonColor: "#e65550",
        cancelButtonText: `Cancel`,
        cancelButtonColor: "#fff",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          history.push(`/${props.global.activeLanguage}/mother-baby-products`);
        }
      });

      props.emptySwal();
    }
  }, [swalMsg]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: () => ({
      height: 45,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const handleInputFields = (e) => {
    let updateValue = { ...contactForm };
    if (e.target.type === "checkbox") {
      updateValue[e.target.name] = e.target.checked;
    } else {
      updateValue[e.target.name] = e.target.value;
    }
    setContactForm(updateValue);
  };

  const setMobileNumber = (e) => {
    let a = Number(e.target.value);

    if (e.target.value === "") {
      setContactForm({ ...contactForm, phone: "" });
    } else if (!isNaN(a)) {
      setContactForm({ ...contactForm, phone: e.target.value });
    } else {
      e.preventDefault();
    }
  };

  const handleEmirateChange = (e) => {
    // setF
    let tmpEm = e.target.value;
    setContactForm({ ...contactForm, state: tmpEm });
    setShowOther(false);
    let selectedEmirate = emirates.find(
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
      setContactForm({ ...contactForm, area: "" });
    } else {
      setContactForm({ ...contactForm, area: tmpArea });
    }
  };

  const setSelectedArea = (emirate) => {
    let selectedEmirate = emirates.find((element) => element.name == emirate);
    if (!selectedEmirate) {
      setAreaData([]);
      return false;
    }
    const isEmpty = Object.keys(selectedEmirate).length === 0;

    if (!isEmpty) {
      setAreaData(selectedEmirate.locations);
    } else {
      setAreaData([]);
    }
  };

  const [double, setDouble] = useState(false);

  const handleSubmit = () => {
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    let date1 = new Date();
    let date2 = addDays(date1, 3);

    date1 = date1.toISOString();
    date2 = date2.toISOString();

    let data = { ...contactForm };

    data.country = country.label ? country.label : "";
    data.paymentDetails = paymentDetails;
    data.cart = cart;

    if (contactForm.first_name === "") {
      if (props.language == "en") {
        alert("Please enter your first name");
      } else {
        alert("فضلاً أدخل الاسم الأول");
      }
      return;
    }

    if (contactForm.last_name === "") {
      if (props.language == "en") {
        alert("Please enter your last name");
      } else {
        alert("فضلاً أدخل الاسم الأخير");
      }
      return;
    }
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contactForm.email)
    ) {
    } else {
      if (props.language == "en") {
        alert("Please enter a valid email");
      } else {
        alert("فضلاً أدخل بريد الكتروني صحيح");
      }

      return false;
    }

    if (contactForm.phone === "") {
      if (props.language == "en") {
        alert("Please enter Your phone number");
      } else {
        alert("الرجاء إدخال رقم هاتف صحيح");
      }
      return;
    } else if (contactForm.phone.length != 9) {
      if (props.language == "en") {
        alert("Please enter Correct phone number");
      } else {
        alert("الرجاء إدخال رقم هاتف صحيح");
      }
      return;
    }

    if (contactForm.address === "") {
      if (props.language == "en") {
        alert("Please enter a Valid Address");
      } else {
        alert("فضلاً أدخل عنوان صحيح");
      }
      return;
    }

    if (!contactForm.addressType || contactForm.addressType == "") {
      if (props.language == "en") {
        alert("Please Select Address type I.e Home or Office");
      } else {
        alert("يرجى تحديد نوع العنوان مثلاً المنزل أو المكتب");
      }
      return;
    }

    if (!contactForm.state || contactForm.state == "") {
      if (props.language == "en") {
        alert("Please Select a State");
      } else {
        alert("يرجى اختيار الدولة");
      }

      return;
    }
    if (!contactForm.area || contactForm.area == "") {
      if (props.language == "en") {
        alert("Please fill the Area field ");
      } else {
        alert("يرجى تحديد نوع العنوان مثلاً المنزل أو المكتب");
      }
      return;
    }

    if (!contactForm.paymentmethod || contactForm.paymentmethod == "") {
      if (props.language == "en") {
        alert("Please Select a payment method");
      } else {
        alert("فضلاً يجب إختيار طريقة الدفع");
      }
      return;
    }

    let url = window.location + "/success";

    let shipmentlineitemsData = [];

    cart.forEach((element) => {
      let itemName = element.productName;
      if (element.productCode) {
        itemName = itemName + "-" + element.productCode;
      }
      let itemType = "";
      if (element.variation) {
        itemType = itemType + element.variation;
      }
      if (element.color) {
        itemType = itemType + "-" + element.color;
      }
      if (element.decoration) {
        itemType = itemType + "-" + element.decoration;
      }

      let tmp = {
        itemCd: element?.productBarcode || "",
        itemName: itemName || "",
        itemPrice: element?.price?.toFixed(2) || "",
        itemQuantity: element?.quantity || "",
        itemDiscountedPrice: element?.discounted_price?.toFixed(2) || "",
        itemID: element?.product_id || "",
        itemType: itemType || "",
        itemWeight: 10,
        itemVolume: 11,
      };

      shipmentlineitemsData.push(tmp);
    });

    let packageValue =
      data?.paymentDetails?.subTotal - data?.paymentDetails?.promo_discount;
    packageValue = packageValue.toFixed(2);
    let shipmentDetails = [
      {
        orderNo: "",
        awbNumber: "",
        shipmentOrderTypeCd: "BOTH",
        orderState: "FORWARD",
        shipmentOrderDt: date1, ///end
        distributionCenter: "Transguard Head office",
        packageWeight: "5",
        packageVolume: "4500",
        paymentType: data?.paymentmethod, // COD or "Prepaid"
        packageValue: packageValue,
        shippingCost: data?.paymentDetails?.shippingCharges,
        numberOfItems: 1,
        partialDeliveryAllowedFl: "Y",
        returnAllowedFl: "Y",
        cancellationAllowedFl: "Y",
        deliverBranch: "Transguard Head office",
        deliverServiceTime: "10",
        deliverEndTimeWindow: date2, // +2 days
        deliverStartTimeWindow: date1, //current date

        deliverEmail: data?.email,
        deliverPhoneNumber: "+971" + data?.phone,

        deliverAccountCode: data?.first_name + data?.phone,
        // home / office
        deliverAddressId: data?.addressType,

        deliverAccountName: data?.first_name + " " + data?.last_name,
        deliverApartment: data?.address,
        deliverStreetName: data?.address,
        deliverLandmark: "abc",
        deliverLocality: data?.area,
        deliverCity: data?.state,
        deliverCountry: "UAE",
        deliverLatitude: "15.000000",
        deliverLongitude: "15.00000",

        pickupBranch: "Transguard Head Office",
        pickupServiceTime: "10",
        pickupStartTimeWindow: date1,
        pickupEndTimeWindow: date2,
        pickupEmail: "customercare@areenew.ae",
        pickupPhoneNumber: "110569900531",
        pickupAccountCode: "Areen2022",
        pickupAddressId: "Home",
        pickupAccountName: "Areen East & West Warehouse",
        pickupApartment: "Areen East & West Warehouse",
        pickupStreetName: "17th street",
        pickupLandmark: "Areen East & West Warehouse",
        pickupLocality: "Um Ramool",
        pickupCity: "Dubai",
        pickupCountry: "UAE",
        pickupLatitude: "15.00000",
        pickupLongitude: "15.00000",
        returnBranch: "Transguard Head office",
        returnStartTimeWindow: date1,
        returnEndTimeWindow: date2,
        returnAccountCode: "Areen2022",
        returnAddressId: "Home",
        returnAccountName: "Areen East & West Warehouse",
        returnEmail: "customercare@areenew.ae",
        returnPhoneNumber: "110569900531",
        returnApartment: "Areen East & West Warehouse",
        returnStreetName: "17th street",
        returnLandmark: "Areen East & West Warehouse",
        returnLocality: "Um Ramool",
        returnCity: "Dubai",
        returnCountry: "UAE",
        pickupNotes: "Picked from 7th floor please knock the door",
        deliverNotes: "Delivered it to the building security",
        clientCode: "Areen East and West LLC",
        shipmentCrateMappings: [
          {
            crateCd: "CR123",
            crateName: "CR123",
            crateAmount: data?.paymentDetails?.finalTotal.toFixed(2),
            crateType: "case",
            noOfUnits: cart?.length,
            crateWeight: 10,
            crateVolume: 11,
            shipmentlineitems: shipmentlineitemsData,
          },
        ],
      },
    ];
    let object1 = {
      promo_code_id: data?.promo_code_id,
      promo_discount: data?.promoCodeDiscount,
      paymentmethod: data?.paymentmethod,
      cart: cart,
      paymentDetails: data?.paymentDetails,
      profile_id: "83116",
      callback: url,
      return: url,
      framed: true,
      framed_return_top: true,
      framed_return_parent: true,
      hide_shipping: true,
      tran_type: "sale",
      tran_class: "ecom",
      cart_id: `cart_${uuid()}`,
      cart_currency: "AED",
      cart_amount: data?.paymentDetails?.finalTotal.toFixed(2),
      cart_description: "Description of the items/services",
      paypage_lang: "en",
      customer_details: {
        user_id: user?.loggedInUser?._id || "",
        name: data?.first_name + " " + data?.last_name,
        email: data?.email,
        phone: "+971" + data?.phone,
        street1: data?.address,
        city: data?.area,
        state: data?.state,
        country: "United Arab Emirates",
        zip: "0000",
      },
      shipment_details: shipmentDetails,
    };

    API.post("/paytabs", object1)
      .then((response) => {
        props?.removePromoCode();

        if (object1.paymentmethod == "COD") {
          if (response.data.status == 200) {
            localStorage.setItem(
              "orderTotal",
              data?.paymentDetails?.finalTotal.toFixed(2)
            );
            localStorage.setItem("orderSuccessToken", response.data.token);

            if (window.dataLayer != null) {
              let products = [];
              cart.map((acc) => {
                products.push({
                  name: acc.productName,
                  id: acc.product_id,
                  price:
                    acc.productDiscount > 0 ? acc.productDiscount : acc.price,
                  brand: "Pigeon Arabia",
                  category: acc?.productCategory,
                  variant: acc.variation,
                  quantity: acc.quantity,
                });
              });
              window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
              window.dataLayer.push({
                event: "purchase",
                ecommerce: {
                  currencyCode: "AED",
                  purchase: {
                    actionField: {
                      id: response.data.transaction_id, // Transaction ID. Required for purchases and refunds.
                      affiliation: "Pigeon Arabia",
                      revenue: data?.paymentDetails?.finalTotal.toFixed(2), // Total transaction value (incl. tax and shipping)
                      // tax: "0",
                      shipping: data?.paymentDetails?.shippingCharges,
                      // coupon: "SUMMER_SALE",
                    },
                    products: products,
                  },
                },
              });
            }

            history.push(`/${props.global?.activeLanguage}/order/success/`);
            setContactForm(initialObject);
          } else {
            SwalToast.fire({
              title:
                props.language === "en"
                  ? "Something Went Wrong Please Try Again Later"
                  : "هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق",
              icon: "error",
            });
          }
        } else if (object1.paymentmethod == "prepaid") {
          localStorage.setItem(
            "orderTotal",
            data?.paymentDetails?.finalTotal.toFixed(2)
          );
          if (response?.data?.data?.redirect_url) {
            props.set_tran_ref(
              response.data.data.tran_ref,
              response.data.orderId
            );
            window.location.href = response.data.data.redirect_url;
          } else {
            SwalToast.fire({
              title:
                props.language === "en"
                  ? "Something Went Wrong Please Try Again Later"
                  : "هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق",
              icon: "error",
            });
          }
        }
      })
      .catch((error) => {
        props?.removePromoCode();
        alert("Some Error Occured Please try Again");
        console.log(error);
        setDouble(false);
      });
  };

  const loginInvokerFunction = () => {
    props.loginInvoker("checkout");
    history.push(`/${props.global.activeLanguage}/login`);
  };

  return (
    <div className="checkout-form">
      <div className="form-wrapper">
        <Form>
          <Row>
            <Col sm={6}>
              <p>
                <strong>
                  {props.language === "en"
                    ? "Contact Information"
                    : "معلومات الإتصال"}
                </strong>
              </p>
            </Col>
            <Col sm={6}>
              {!user.isAuthenticated && !user.accessToken && (
                <p className="text_align login_text">
                  {props.language === "en"
                    ? "Already have an account?"
                    : "لديك حساب؟"}
                  <span
                    className="log_in_text loginCheckout"
                    onClick={loginInvokerFunction}
                  >
                    {props.language === "en" ? "Log in" : "تسجيل دخول"}
                  </span>
                </p>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  pattern=".+@globex\.com"
                  placeholder={
                    props.language === "en"
                      ? "Email Address*"
                      : "*البريد الإلكتروني"
                  }
                  required
                  value={contactForm.email}
                  onChange={handleInputFields}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <Form.Group controlId="firstName">
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder={
                    props.language === "en" ? "First Name*" : "*الإسم الأول"
                  }
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
                  placeholder={
                    props.language === "en" ? "Last Name*" : "*اسم العائلة"
                  }
                  value={contactForm.last_name}
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
                  name="address"
                  placeholder={
                    props.language === "en"
                      ? "Street name/ Building / Flat"
                      : "العنوان"
                  }
                  value={contactForm.address}
                  onChange={handleInputFields}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {props.language === "en" && (
              <Col md={2} sm={12} className="noPaddingRight">
                <Form.Group controlId="mobileNumber">
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder={
                      props.language === "en" ? "Phone Number*" : "*رقم الهاتف"
                    }
                    value={"+971 (0)"}
                    className="mobileCode"
                    disabled="disabled"
                  />
                </Form.Group>
              </Col>
            )}
            <Col md={10} sm={12} className="noPaddingLeft">
              <Form.Group controlId="mobileNumber" className="ltrDirection">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder={
                    props.language === "en" ? "Phone Number*" : "*رقم الهاتف"
                  }
                  value={contactForm.phone}
                  onChange={setMobileNumber}
                  maxLength={9}
                  className="mobileNumberEdit"
                />
              </Form.Group>
            </Col>
            {props.language === "ar" && (
              <Col md={2} sm={12} className="noPaddingRight">
                <Form.Group controlId="mobileNumber" className="ltrDirection">
                  <Form.Control
                    type="text"
                    placeholder={
                      props.language === "en" ? "Phone Number*" : "*رقم الهاتف"
                    }
                    value={"+971 (0)"}
                    className="mobileCode"
                    disabled="disabled"
                  />
                </Form.Group>
              </Col>
            )}
          </Row>

          <Row>
            <Col sm={6}>
              <Form.Group controlId="paymeny" className="payment_method">
                <input
                  type="radio"
                  id="home"
                  name="addressType"
                  value="home"
                  onClick={handleInputFields}
                />
                <label className="marginlr5px" for="home">
                  {props.language === "en" ? "Home" : "المنزل"}
                </label>
                <br></br>
                <input
                  type="radio"
                  id="office"
                  name="addressType"
                  value="office"
                  onClick={handleInputFields}
                />
                <label for="office" className="marginlr5px">
                  {props.language === "en" ? "Office" : "المكتب"}
                </label>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <Form.Group controlId="state">
                <select onChange={handleEmirateChange} name="state">
                  <option selected value="" disabled>
                    {"Select Emirates"}
                  </option>
                  {emirates.length > 0 &&
                    emirates.map((data) => {
                      let selected = "";
                      if (data.name == contactForm.state) {
                        selected = "selected";
                      }
                      return (
                        <option selected={selected} value={data.name}>
                          {data.name}
                        </option>
                      );
                    })}
                </select>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="Area">
                {!showOther && (
                  <select onChange={handleAreaChange}>
                    <option selected value="" disabled>
                      {"Select Area"}
                    </option>
                    {areaData.length > 0 &&
                      areaData.map((data) => {
                        let selected = "";
                        if (data.name == contactForm.area) {
                          selected = "selected";
                        }
                        return (
                          <option selected={selected} value={data.name}>
                            {data.name}
                          </option>
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
                    value={contactForm.area}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, area: e.target.value })
                    }
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="list_box">
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="paymeny1" className="payment_method">
                <input
                  type="radio"
                  id="paymentmethod1"
                  name="paymentmethod"
                  value="prepaid"
                  onClick={handleInputFields}
                />
                <label for="paymentmethod1" className="marginlr5px">
                  {props.language === "en"
                    ? "Credit / Debit / ATM card"
                    : "بطاقة اِئْتِمَانٌ / بطاقة خصم / بطاقة مصرفية"}
                </label>
                <br></br>
                <input
                  type="radio"
                  id="paymentmethod2"
                  name="paymentmethod"
                  value="COD"
                  onClick={handleInputFields}
                />
                <label for="paymentmethod2" className="marginlr5px">
                  {props.language === "en"
                    ? "Cash On Delivery"
                    : "الدفع عند التسليم"}
                </label>
              </Form.Group>

              <Col sm={12} style={{ paddingLeft: "0" }}>
                <ButtonTheme
                  // className="btn placeorderbtn"
                  variant="primary"
                  onClick={() => {
                    handleSubmit();
                    setDouble(true);
                  }}
                  disabled={
                    paymentDetails?.subTotal > 0 && double === false
                      ? false
                      : true
                  }
                  style={{
                    borderRadius: "6px",
                    width: "150px",
                  }}
                >
                  {props.language === "en" ? "Confirm Order" : "تأكيد الطلب"}
                </ButtonTheme>
              </Col>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
    paymentDetails: state.cartReducer.paymentDetails,
    cartBit: state.cartReducer.cartBit,
    cart: state.cartReducer.cart,
    user: state.userReducer,
    promoCode: state.cartReducer.promoCode,
    swalMsg: state.cartReducer.swalMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
    wishlistSuccess: (data) =>
      dispatch({
        type: "GET_WISHLIST_SUCCESS",
        payload: {
          wishlist: data,
        },
      }),
    add_cart_product: (cart) =>
      dispatch({
        type: "ADD_PRODUCT_C",
        data: cart,
      }),
    removeProduct: (productCode, invoker) =>
      dispatch({
        type: "REMOVE_PRODUCT_FROM_CART",
        productCode: productCode,
        invoker,
      }),
    changeQuantity: (productCode, quantity, qtyType) =>
      dispatch({
        type: "CHANGE_PRODUCT_QUANTITY",
        payload: {
          productCode,
          quantity,
          qtyType,
        },
      }),
    emptySwal: (cart) =>
      dispatch({
        type: "EMPTY_SWAL",
      }),
    loginInvoker: (invoker) =>
      dispatch({
        type: "LOGIN_INVOKER_CHECKOUT",
        invoker,
      }),
    set_tran_ref: (value, value2) =>
      dispatch({
        type: "TRAN_REF",
        tran_ref: value,
        order_id: value2,
      }),
    emptyCart: () =>
      dispatch({
        type: "EMPTY_CART",
        invoker: "cashOndelivery",
      }),
    removePromoCode: () =>
      dispatch({
        type: "REMOVE_PROMO_CODE_DISCOUNT",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
