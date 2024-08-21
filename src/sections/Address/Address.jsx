import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../utils/constants";
import ButtonTheme from "./../../components/ButtonTheme";
import EditAddress from "./EditAddress";
import CreateAddress from "./CreateAddress";
import './Address.scss';
import { API } from '../../http/API';
import SwalToast from "../Swal/SwalToast";

function Address(props) {
  const [openEditer, setPaymentForm] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editData, setEditData] = useState({});
  const openEditForm = (val, data) => {
    setPaymentForm(val);
    setEditData(data)
  }

  useEffect(() => {
    if (openEditer == false && openCreateForm == false) {
      // let config = {
      //   headers: {
      //     Authorization: `Bearer ${props.user?.accessToken}`,
      //   },
      //   params: {
      //     user_id: props.user?.loggedInUser._id
      //   },
      // }

      // API.get(`/auth/address`, config).then((response) => {
      //   if (addresses != response.data) {
      //     setAddresses(response.data)
      //   }
      // });
    }

  }, [openEditer, openCreateForm]);

  // useEffect(() => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${props.user?.accessToken}`,
  //     },
  //     params: {
  //       user_id: props.user?.loggedInUser._id
  //     },
  //   }

  //   // API.get(`/auth/address`, config).then((response) => {

  //   //   if (addresses != response.data) {
  //   //     setAddresses(response.data)
  //   //     console.log("addresses")
  //   //     console.log(addresses)
  //   //   }
  //   // });

  // }, []);


  const deleteAddress = (id) => {
    // console.log("===id");
    // console.log(id);
    if (id) {
      API.delete(`/auth/address/${id}`)
        .then((response) => {
          // SwalToast.fire({
          //   icon: 'success',
          //   title: 'Address deleted successfully'
          // })

          // if(props.global?.activeLanguage == 'ar'){
          //     SwalToast.fire({
          //       title: 'تم حذف العنوان بنجاح',
          //       icon: 'success'
          //     })
          // } else {
          SwalToast.fire({
            icon: 'success',
            title: props.global?.activeLanguage == 'en' ? 'Address deleted successfully' : 'تم حذف العنوان بنجاح'
          })
          // }

          let config = {
            headers: {
              Authorization: `Bearer ${props.user?.accessToken}`,
            },
            params: {
              user_id: props.user?.loggedInUser._id
            },
          }

          API.get(`/auth/address`, config).then((response) => {
            if (addresses != response.data) {
              setAddresses(response.data)
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }
  const openCreateFormFn = (val) => {
    setOpenCreateForm(val);
  }
  return (
    <div className="address-container">
      {!openEditer && !openCreateForm &&
        <>
          <Row>
            <Col sm={3}>
              <ButtonTheme
                className="buy-now-btn save_btn"
                outline
                style={{ marginBottom: "20px", height: "50px" }}
                onClick={() => openCreateFormFn(true)}
              >
                {props.activeLanguage == 'en' ? 'Add Address' : 'اضف عنوان'}
              </ButtonTheme>
            </Col>
          </Row>
          {addresses?.map((x, index) => (
            <>
              <Container>
                <Row>
                  <Col sm={3}>
                    <p>{props.activeLanguage == 'en' ? 'Name :' : 'اسم'}</p>
                  </Col>
                  <Col sm={9}>
                    <p>{x.first_name + " " + x.last_name}</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <p>{props.activeLanguage == 'en' ? 'Appartment :' : 'شقة'}</p>
                  </Col>
                  <Col sm={9}>{x.apartment}</Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <p>{props.activeLanguage == 'en' ? 'Mobile Number :' : 'رقم الهاتف المحمول'}</p>
                  </Col>
                  <Col sm={9}>{x.phone}</Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <ButtonTheme
                      className="buy-now-btn save_btn"
                      outline
                      onClick={() => openEditForm(true, x)}
                    >
                      {props.language == 'en' ? 'Edit' : 'Edit'}
                    </ButtonTheme>
                  </Col>
                  <Col sm={3}>
                    <ButtonTheme
                      className="buy-now-btn buy_cart"
                      outline
                      onClick={() => deleteAddress(x._id)}
                    >
                      {props.language == 'en' ? 'Delete' : 'Delete'}
                    </ButtonTheme>
                  </Col>
                </Row>
              </Container>
              <hr></hr>
            </>
          ))}
        </>
      }
      {openEditer &&
        <EditAddress
          language={props.activeLanguage}
          openEditForm={openEditForm}
          data={editData}
        />
      }
      {openCreateForm &&
        <CreateAddress
          language={props.activeLanguage}
          openCreateFormFn={openCreateFormFn}
        />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(Address);

