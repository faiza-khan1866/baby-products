import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import WishlistGrid from "../../Wishlist/WishlistGrid";
import OrderContainer from "../../Order/OrderContainer/OrderContainer";
import OrderTracking from "../../OrderTracking/OrderTracking/OrderTracking";
import Address from "../../Address/Address";
import Payment from "../../Payment/Payment";
import { API } from "../../../http/API";
import {
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineOrderedList,
  AiOutlineHeatMap,
  AiOutlineMoneyCollect
} from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import ButtonTheme from "../../../components/ButtonTheme";
import { useHistory } from "react-router-dom";

function ProfileTabContainer(props) {
  let { emirates, cart, cartBit } = props

  // const emirates = [
  //   {
  //     en:"Abu Dhabi",
  //     ar:"أبو ظبي"
  //   },
  //   {
  //     en:"Dubai",
  //     ar:"دبي"
  //   },
  //   {
  //     en:"Sharjah",
  //     ar:"الشارقة"
  //   },
  //   {
  //     en:"Umm Al Quwain",
  //     ar:"أم القيوين"
  //   },
  //   {
  //     en:"Ras Al Khaimah",
  //     ar:"رأس الخيمة"
  //   },
  //   {
  //     en:"Fujairah",
  //     ar:"الفجيرة"
  //   },
  //   {
  //     en:"Ajman",
  //     ar:"عجمان"
  //   },
  // ]

  // const areas = [
  //   {
  //     _id:"1232342343",
  //     name:"satwa",
  //     arabicName:"السطوة"
  //   },
  //   {
  //     _id:"1232342344",
  //     name:"jabil ali",
  //     arabicName:"جبل علي"
  //   },
  //   {
  //     _id:"1232342345",
  //     name:"marina",
  //     arabicName:"مارينا"
  //   }
  // ]


  const trimesters = [
    {
      en:"First Trimester",
      ar:"الفصل الأول"
    },
    {
      en:"Second Trimester",
      ar:"الفصل الثاني"
    },
    {
      en:"Third Trimester",
      ar:"الربع الثالث"
    },
  ]

  const kidAges = [
    {
      en:"0-3 months",
      ar:"0-3 أشهر"
    },
    {
      en:"3-6 months",
      ar:"3-6 شهور"
    },
    {
      en:"6-9 months",
      ar:"6-9 شهور"
    },
    {
      en:"9-18 months",
      ar:"9-18 شهرًا"
    },
    {
      en:"18-24 months",
      ar:"18-24 شهرًا"
    },
    {
      en:"24-36 months",
      ar:"من 24 إلى 36 شهرًا"
    }
  ]

  const [activeTab, setActiveTab] = useState("");
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [editInfo, setEditInfo] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [areaData, setAreaData] = useState({});
  const [formData, setFormData] = useState({});
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (props.activeTab) {
      setActiveTab(props.activeTab);
    }
  }, [props.activeTab]);

  useEffect(() => {
    if (props.user && props.user != formData) {
      setFormData(props.user);
    }
  }, [props.user]);
  
  useEffect(() => {
    if (activeTab) {
      history.replace(`/${props.activeLanguage}/profile?active=${activeTab}`)
      // setActiveTab(props.activeTab);
    }
  }, [activeTab]);


  useEffect(() => {
    let search = "";
    return history.listen((location) => {
      if(location.search) {
        search = new URLSearchParams(location.search);
        if(search.get('active') != activeTab){
          setActiveTab(search.get('active'))
        }
      } 
    }) 
 },[history])

 useEffect(() => {

  if(cart.length > 0){
    let val = 0
    cart.forEach(element => {
        val +=  element.quantity 
    });
    setCartQuantity(val)
  } else {
    setCartQuantity(0)
  }

    
}, [cartBit, cart]);


 const updateUserInfo = () => {
   let firstName = formData.firstName
   let lastName= formData.lastName
   let email= formData.email
  // console.log()
   if (firstName !== '' && lastName !== '' && formData.mobile !== '' && formData.mobile.length == 9 && formData.address !== '' && formData.area !== '' && formData.emirates !== '') {
    let formdata2 = new FormData();
    formdata2.append("user_id", `${formData._id}`);
    formdata2.append("name", `${firstName} ${lastName}`);
    formdata2.append("firstName",firstName);
    formdata2.append("lastName",lastName);
    formdata2.append("mobile",formData.mobile);
    formdata2.append("address",formData.address);
    formdata2.append("area",formData.area);
    formdata2.append("emirates",formData.emirates);
    if(formData.kid_age){
      formdata2.append("kid_age",formData.kid_age);
    }
    if(formData.pregnent){
      formdata2.append("pregnent",formData.pregnent);
    }

    API.post(`/auth/update-detail`, formdata2, {
      "Content-Type": `multipart/form-data; boundary=${formdata2._boundary}`,
    }).then((response) => {
      // setShowSpinner(false);
      // props.registerSuccess(response.data);
      // props.onHide();
      alert(
        "Info updated successfully."
      );
        let data = {
          user:formData,
          access_token:props.accessToken
        }
        props.loginSuccess(data)
        setEditInfo(false)
    })
      .catch((error) => {
        // setShowSpinner(false);
        // setShow(true);
        //alert("There was some error Please try again.");
      });
  } else {
    //alert("There was some error Please try again.");
    if (firstName === '') {
      if(props.activeLanguage === "en"){
        alert("Please Enter First Name.");
      } else {
        alert("فضلاً أدخل الاسم الأول");
      }
      return false;
      // const error1 = "Please Enter First Name.";
      // props.allError = error1;
    }
    if (lastName === '') {
      if(props.activeLanguage === "en"){
        alert("Please Enter Last Name.");
      } else {
        alert("فضلاً أدخل الاسم الأخير");
      }
      return false;
    }

    if(formData.mobile == ''){
      if(props.activeLanguage === "en"){
        alert("Please Enter Mobile Number");
      } else {
        alert("الرجاء إدخال رقم هاتف صحيح");
      }
      return false;
    } else if(formData.mobile.length != 9){

      if(props.activeLanguage === "en"){
        alert("Please enter Correct phone number");
      } else {
        alert("الرجاء إدخال رقم هاتف صحيح");
      }
      return false;
    }

    if(formData.address == ''){
      if(props.activeLanguage === "en"){
        alert("Please Enter Correct Address");
      } else {
        alert("فضلاً أدخل عنوان صحيح");
      }
      return false;
    }
    if(formData.area == ''){
      if(props.activeLanguage === "en"){
        alert("Please Select an Area");
      } else {
        alert("يرجى تحديد نوع العنوان مثلاً المنزل أو المكتب");
      }
      return false;
    }
    if(formData.emirates == ''){
      if(props.activeLanguage === "en"){
        alert("Please Select a state");
      } else {
        alert("يرجى اختيار الدولة");
      }
      return false;
    }
  }
 }

 const handleAreaChange = (e) => {

  let tmpArea = e.target.value
  if(tmpArea == "other"){
    setShowOther(true)
    setFormData({...formData, area:""})
  } else {
    setFormData({...formData, area:tmpArea})
  }
}

const setSelectedArea = (emirate) => {
  let selectedEmirate = emirates.find(element => element.name == emirate);

    const isEmpty = Object.keys(selectedEmirate).length === 0;

    if(!isEmpty){
      
      setAreaData(selectedEmirate.locations)
    } else {
      setAreaData([])
    }

}

const handleEmirateChange = (e) => {

  // setF
  let tmpEm = e.target.value
  setFormData({...formData, emirates:tmpEm})
  
  setShowOther(false)
    let selectedEmirate = emirates.find(element => element.name == e.target.value);

    const isEmpty = Object.keys(selectedEmirate).length === 0;

    if(!isEmpty){
      
      setAreaData(selectedEmirate.locations)
    } else {
      setAreaData([])
    }
}

const handleValuesChange = (e) => {

  // setF
  let tmpArea = e.target.value
  setFormData({...formData, [e.target.name]:tmpArea})
}
  // const query = new URLSearchParams(
  //   this.props.location.search
  // );

  // this.setState({ activeTab: query.get("active") });

  const handelResetPassword = () => {

    let formdata = new FormData();
    // formdata.append("password", oldpassword);
    formdata.append("current_password", oldpassword);
    formdata.append("password", newPassword);
    // let data = {
    //   current_password: oldpassword,
    //   password: newPassword
    // }
    // formdata.append("changed_password", newPassword);

    formdata.append("user_id", props.user._id);
    API.post(`/auth/reset`, formdata, {
      "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
    })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data[1]);
        }
      })
      .catch((error) => {
        if (oldpassword === '' && newPassword === '') {
          alert("Please Enter Current Password and New Password.");
        } else {
          if (oldpassword === '') {
            alert("Please Enter Current Password.");
          }
          if (newPassword === '') {
            alert("Please Enter New Password.");
          }
        }
      });
  };

  const setMobileNumber = (e) => {

    let a = Number(e.target.value)
    
    if(e.target.value === ""){
      setFormData({...formData, mobile:""})

    } else if (!isNaN(a)) {
      setFormData({...formData, mobile:e.target.value})
    } else {
      e.preventDefault();
    }
  }
  const goToCheckout= (route) => {
    history.push(`/${props.activeLanguage}/${route}`)
  }
  
  return (
    <div className="profile-tab-container">
      <Container className="tabs-wrapper">
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={"basic"}
          activeKey={activeTab}
          onSelect={(name) => setActiveTab(name)}
        >
          <Row>
            <Col xl={3} lg={5} md={6} sm={12}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="basic">
                    <AiOutlineInfoCircle className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Basic Info' : 'المعلومات الاساسيه'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wishlist">
                    <AiOutlineHeart className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Wishlist' : 'قائمة الأمنيات'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="order">
                    <AiOutlineOrderedList className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Orders' : 'الطلبات'} </span>
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="orderTracking">
                    <AiOutlineHeatMap className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Order Tracking' : 'تتبع الطلب'} </span>
                  </Nav.Link>
                </Nav.Item> */}
                {/* <Nav.Item>
                  <Nav.Link eventKey="address">
                    <AiOutlineOrderedList className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Address' : 'تبوك'} </span>
                  </Nav.Link>
                </Nav.Item> */}
                {/* <Nav.Item>
                  <Nav.Link eventKey="payment">
                    <AiOutlineMoneyCollect className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Payment' : 'دفع'} </span>
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="reset">
                    <AiOutlineLock className="mr-2" />
                    <span> {props.activeLanguage == 'en' ? 'Reset Password' : 'تغيير كلمة المرور'} </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="logout" onClick={() => props.logout()}>
                    <AiOutlineLogout className="mr-2" /> <span> {props.activeLanguage == 'en' ? 'Logout' : 'تسجيل خروج'} </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xl={9} lg={7} md={6} sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="basic">
                  <div className="tab-content basic-tab">
                    <h3 className="tab-title"> {props.activeLanguage == 'en' ? 'Basic Info' : 'المعلومات الاساسيه'}</h3>
                    <Row>
                      {/* <Col sm={3}>
                        <div className="profile-avatar">
                          {console.log("props.user",props.user)}
                          <img src={props.user?.avatar || ""} alt="" />
                        </div>
                      </Col> */}
                      
                      {/* {console.log(props.user)} */}
                      
                      <Col sm={9}>
                      {!editInfo &&
                        <>
                          <Row>
                            <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                              <p>{props.activeLanguage == 'en' ? 'First Name' : 'الإسم الأول'}</p>
                            </Col>
                            <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                              <p>{formData?.firstName}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                              <p>{props.activeLanguage == 'en' ? 'Last Name' : 'الإسم الاخير'}</p>
                            </Col>
                            <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                              <p>
                                {formData?.lastName ||
                                  "Not provided"}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                              <p>{props.activeLanguage == 'en' ? 'Email' : 'البريد الالكتروني'}</p>
                            </Col>
                            <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                              <p>{formData?.email}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                              <p>{props.activeLanguage == 'en' ? 'Mobile No' : 'رقم الهاتف'}</p>
                            </Col>
                            <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                              <p>{formData?.mobile}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                              <p>{props.activeLanguage == 'en' ? 'Address' : 'العنوان'}</p>
                            </Col>
                            <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                              <p>{formData?.address}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                              <p>{props.activeLanguage == 'en' ? 'Area' : 'المنطقة'}</p>
                            </Col>
                            <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                              <p>{formData?.area}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                              <p>{props.activeLanguage == 'en' ? 'Emirate' : 'الإمارة'}</p>
                            </Col>
                            <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                              <p>{formData?.emirates}</p>
                            </Col>
                          </Row>
                          {formData?.kid_age &&
                            <Row>
                              <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                                <p>{props.activeLanguage == 'en' ? "Kid's Age" : 'عمر الطفل'}</p>
                              </Col>
                              <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                                <p>{formData?.kid_age}</p>
                              </Col>
                            </Row>
                          }
                          {formData?.pregnent &&
                            <Row>
                              <Col className="width40percent" xl={3} lg={5} md={6} sm={6}>
                                <p>{props.activeLanguage == 'en' ? "Pregnancy time" : 'فترة الحمل'}</p>
                              </Col>
                              <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                                <p>{formData?.pregnent}</p>
                              </Col>
                            </Row>
                          }
                          <ButtonTheme
                          variant="primary"
                          style={{margin:"5px", borderRadius: "6px", width: props.activeLanguage == "en" ? "210px" : "210px" }}
                          onClick={() => { setEditInfo(true); setSelectedArea(formData.emirates) } }
                          outline
                        >
                          {props.activeLanguage == 'en' ? 'Edit Info' : 'تحرير المعلومات'}
                        </ButtonTheme>
                          <ButtonTheme
                          variant="primary"
                          style={{margin:"5px",borderRadius: "6px", width: props.activeLanguage == "en" ? "210px" : "210px" }}
                          onClick={() => goToCheckout(cartQuantity > 0 ? 'checkout' : 'mother-baby-products')}
                          outline
                        >
                          {cartQuantity > 0 ? 
                            props.activeLanguage == 'en' ? 'Go To Checkout' : 'الدفع والخروج'
                            :
                            props.activeLanguage == 'en' ? 'Check Out Our Products' : 'قم بالتعرف على منتجاتنا'
                          }
                        </ButtonTheme>
                        </>
                      }
                      {editInfo &&
                      <>
                        <Form>
                          <Row>
                              <Col sm={6}>
                                  <Form.Group controlId="firstName">
                                  <Form.Label>{props.activeLanguage == "en" ? 'First Name' : 'الإسم الأول'}</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="firstName"
                                          placeholder={props.activeLanguage === "en" ? "First name" : "الإسم الأول"}
                                          required
                                          value={formData?.firstName}
                                          onChange={(e) =>
                                            setFormData({...formData, firstName:e.target.value})
                                          }
                                      />
                                  </Form.Group>
                              </Col>
                              <Col sm={6}>
                                  <Form.Group controlId="lastName">
                                  <Form.Label>{props?.activeLanguage == "en" ? 'Last Name' : 'الإسم الاخير'}</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="lastName"
                                          placeholder={props.activeLanguage === "en" ? "Last name" : "اسم العائلة"}
                                          value={formData?.lastName}
                                          onChange={(e) =>
                                            setFormData({...formData, lastName:e.target.value})
                                          }
                                      />
                                  </Form.Group>
                              </Col>
                          </Row>
                          <Row>
                              <Col sm={6}>
                                  <Form.Group controlId="email">
                                  <Form.Label>{props?.activeLanguage == "en" ? 'Email' : 'البريد الالكتروني'}</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="email"
                                          disabled
                                          placeholder={props.activeLanguage === "en" ? "Email" : "بريد الالكتروني"}
                                          required
                                          value={formData?.email}
                                          onChange={(e) =>
                                            setFormData({...formData, email:e.target.value})
                                          }
                                      />
                                  </Form.Group>
                              </Col>
                              {props?.activeLanguage == "en" &&
                                <Col sm={2} className="noPaddingRight">
                                    <Form.Group controlId="mobile">
                                    <Form.Label>{props?.activeLanguage == "en" ? 'Mobile' : ''}&nbsp;</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="mobileCode"
                                            value={"+971 (0)"}
                                            disabled="disabled"
                                        />
                                    </Form.Group>
                                </Col>
                              }
                              <Col sm={4} className="noPaddingLeft">
                                  <Form.Group controlId="mobile" className="ltrDirection">
                                  <Form.Label>{props?.activeLanguage == "en" ? '' : 'رقم الهاتف'}&nbsp;</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="mobile"
                                          className="mobileNumberEdit"
                                          maxLength={9}
                                          // placeholder={props.activeLanguage === "en" ? "Mobile" : "رقم الهاتف"}
                                          value={formData?.mobile}
                                          onChange={setMobileNumber}
                                      />
                                  </Form.Group>
                              </Col>
                              {props?.activeLanguage == "ar" &&
                                <Col sm={2} className="noPaddingRight">
                                    <Form.Group controlId="mobile" className="ltrDirection">
                                    <Form.Label>{props?.activeLanguage == "en" ? 'Mobile' : ''}&nbsp;</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="mobileCode"
                                            value={"+971 (0)"}
                                            disabled="disabled"
                                        />
                                    </Form.Group>
                                </Col>
                              }
                          </Row>
                          <Row>
                              <Col sm={12}>
                                  <Form.Group controlId="address">
                                  <Form.Label>{props?.activeLanguage == "en" ? 'Delivery Address' : 'العنوان التسليم'}</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="address"
                                          placeholder={props.activeLanguage === "en" ? "Address" : "العنوان التسليم"}
                                          required
                                          value={formData?.address}
                                          onChange={(e) =>
                                            setFormData({...formData, address:e.target.value})
                                          }
                                      />
                                  </Form.Group>
                              </Col>
                          </Row>
                          <Row>
                          <Col sm={6}>
                              <Form.Group controlId="Emirates" className="ltrDirection">
                              <Form.Label>{props?.activeLanguage == "en" ? 'Emirates' : 'الإمارة'}</Form.Label>
                                <select onChange={handleEmirateChange} name="emirates">
                                <option selected value="" disabled>
                                  { "Select Emirates"}
                                </option>
                                {emirates.length > 0 && emirates.map((data) => {
                                  
                                    let selected = ""
                                    if(data.name == formData.emirates){
                                      selected = "selected"
                                    }
                                    return <option selected={selected} value={data.name}>{ data.name}</option>
                                })}
                              </select>
                              </Form.Group>
                              </Col>
                              <Col sm={6}>
                              <Form.Group controlId="Area" className="ltrDirection">
                              <Form.Label>{props?.activeLanguage == "en" ? 'Area' : 'المنطقة'}</Form.Label>
                                {!showOther &&
                                <select onChange={handleAreaChange}>
                                <option selected value="" disabled>
                                  { "Select Area"}
                                </option>
                                {areaData.length > 0 && areaData.map((data) => {
                                  let selected = ""
                                    if(data.name == formData.area){
                                      selected = "selected"
                                    }
                                    return (<option selected={selected} value={data.name} >{ data.name }</option>)
                                })}
                                <option value="other">
                                  { "Other"}
                                </option>
                                </select>
                              }
                              {showOther &&
                                <Form.Control
                                    required
                                    name="area"
                                    type="text"
                                    value={formData.area}
                                    onChange={(e) =>
                                      setFormData({...formData, area:e.target.value})
                                    }
                                  />
                              }
                              </Form.Group>
                              </Col>
                              <Col sm={6}>
                  <Form.Group controlId="kidsAge">
                    <Form.Label>{props?.activeLanguage == "en" ? 'How Old is your Kid' : 'عمر الطفل'}</Form.Label>
                    <select onChange={handleValuesChange} name="kid_age">
                    <option selected value="" disabled>
                      {props?.activeLanguage === 'en'
                        ? "Select Age" : "حدد العمر"}
                    </option>
                    {kidAges.length > 0 && kidAges.map((data) => {
                        let selected = ""
                        if(data.en == formData.kid_age){
                          selected = "selected"
                        }
                        return <option selected={selected} value={data.en}>{ props?.activeLanguage === 'en' ? data.en : data.ar}</option>
                    })}
                  </select>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="Area">
                    <Form.Label>{props?.activeLanguage == "en" ? 'I am Pregnant' : 'فترة الحمل'}</Form.Label>
                    <select onChange={handleValuesChange} name="pregnent">
                    <option selected value="" disabled>
                      {props?.activeLanguage === 'en'
                        ? "Select Trimester" : "حدد الفصل الثالث"}
                    </option>
                    {trimesters.length > 0 && trimesters.map((data) => {
                      let selected = ""
                      if(data.en == formData.pregnent){
                        selected = "selected"
                      }
                        return <option selected={selected} value={data.en}>{ props?.activeLanguage === 'en' ? data.en : data.ar}</option>
                    })}
                  </select>
                  </Form.Group>
                </Col>
                          </Row>
                          <ButtonTheme
                          variant="primary"
                          style={{ borderRadius: "6px", width: props.activeLanguage == "en" ? "150px" : "200px" }}
                          onClick={() => updateUserInfo()}
                          outline
                        >
                          {props.activeLanguage == 'en' ? 'Update Info' : 'تحرير المعلومات'}
                        </ButtonTheme>
                    </Form>
                      </>
                      }
                        
                        {/* <Row>
                          <Col sm={3} xs={5}>
                            <p>{props.activeLanguage == 'en' ? 'Social Connected' : 'التواصل الاجتماعي'}</p>
                          </Col>
                          <Col className="width50percent" xl={9} lg={7} md={6} sm={6}>
                            <p>{props.user?.is_social ? "Yes" : "No"}</p>
                          </Col>
                        </Row> */}
                      </Col>
                    </Row>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="wishlist">
                  <div className="tab-content wishlist-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Wishlist' : 'قائمة الأمنيات'}</h3>
                    <WishlistGrid data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="order">
                  <div className="tab-content order-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Order' : 'الطلبات'}</h3>
                    <OrderContainer data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="orderTracking">
                  <div className="tab-content order-tracking-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Order Tracking' : 'تتبع الطلب'}</h3>
                    <OrderTracking data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="address">
                  <div className="tab-content order-tracking-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Address' : 'تبوك'}</h3>
                    <Address data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="payment">
                  <div className="tab-content order-tracking-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Payment' : 'دفع'}</h3>
                    <Payment data={props.userWishlistProducts} activeLanguage={props.activeLanguage} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="reset">
                  <div className="tab-content reset-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Reset Password' : 'تغيير كلمة المرور'}</h3>
                    <Form>
                      <Row>
                        <Col sm={6}>
                          <Row>
                            <Col sm={12}>
                              <Form.Group controlId="password">
                                <Form.Label>{props.activeLanguage == 'en' ? 'Current Password' : 'كلمة المرور الحالية'}</Form.Label>
                                <Form.Control type="password"
                                  autoComplete="new-password"
                                  onChange={(e) => setOldPassword(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col sm={12}>
                              <Form.Group controlId="newPassword">
                                <Form.Label>{props.activeLanguage == 'en' ? 'New Password' : 'كلمة المرور الجديدة'}</Form.Label>
                                <Form.Control type="password"
                                  autoComplete="new-password"
                                  onChange={(e) => setNewPassword(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col sm={12}>
                              <ButtonTheme
                                variant="primary"
                                style={{ borderRadius: "6px", width: props.activeLanguage == "en" ? "150px" : "200px" }}
                                onClick={() => handelResetPassword()}
                                outline
                              >
                                {props.activeLanguage == 'en' ? 'Reset Password' : 'تغيير كلمة المرور'}
                              </ButtonTheme>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="logout">
                  <div className="tab-content logout-tab">
                    <h3 className="tab-title">{props.activeLanguage == 'en' ? 'Logout' : 'تسجيل خروج'}</h3>
                    <div className="d-flex align-items-center justify-content-center p-5">
                      <Spinner
                        animation="border"
                        variant="danger"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer?.loggedInUser,
    accessToken: state.userReducer.accessToken,
    userWishlistProducts: state.productReducer?.userWishlistProducts,
    cartBit: state.cartReducer.cartBit,
    cart: state.cartReducer.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
      loginSuccess: (data) =>
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTabContainer);
