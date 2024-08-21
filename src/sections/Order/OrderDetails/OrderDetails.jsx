import React from "react";
import { Modal, Button, Row, Col, Badge, Table } from "react-bootstrap";
// import { Badge, Col, Row } from "reactstrap";
// import ReactStars from "react-rating-stars-component";
// import DataTable from "react-data-table-component";
import "./OrderDetails.scss";
import { connect } from "react-redux";

const OrderDetailsModal = (props) => {
  let order = props.review;
  let data = order?.cart;
  let columns = [
    {
      name: "Image",
      selector: "englishImage",
      sortable: true,
      cell: (row) => <img style={{ width: "25%" }} src={row.englishImage} />,
    },
    {
      name: "Name",
      selector: "productName",
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row.productName}</p>,
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row.quantity}</p>,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">
          {row?.discounted_price > 0
            ? row?.discounted_price.toFixed(2)
            : row?.price.toFixed(2)}
        </p>
      ),
    },
    {
      name: "Sub Total",
      selector: "",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">
          {row?.discounted_price > 0
            ? (row.quantity * row?.discounted_price).toFixed(2)
            : (row.quantity * row?.price).toFixed(2)}
        </p>
      ),
    },
  ];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={
        props.language === "en"
          ? "modelForOrder"
          : "modelForOrder modelForOrderAr"
      }
    >
      <Modal.Header closeButton className="orderdetailModelheader">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.language === "en" ? "Order Details" : "تفاصيل الطلب"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="orderdetailModelBody">
        <div>
          <Row>
            <Col lg={3} md={6} sm={6} xs={12}>
              <h6 className="h6title">
                {props.language === "en" ? "Order ID" : "رقم الطلب"}
              </h6>
            </Col>
            <Col>
              <p>{order?.orderNo}</p>
            </Col>
            {order?.payment_details?.shippingCharges > 0 && (
              <>
                <Col lg={3} md={6} sm={6} xs={12}>
                  <h6 className="h6title">
                    {props.language === "en"
                      ? "Shipping Charges"
                      : "رسوم الشحن "}
                  </h6>
                </Col>
                <Col>
                  <p>{order?.payment_details?.shippingCharges || ""}</p>
                </Col>
              </>
            )}
          </Row>
          <Row>
            <Col lg={3} md={6} sm={6} xs={12}>
              <h6 className="h6title">
                {props.language === "en" ? "User Name" : "إسم المستخدم"}
              </h6>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <p>{order?.user_name}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={6} xs={12}>
              <h6 className="h6title">
                {props.language === "en" ? "Total Amount" : "المجموع الكلي"}
              </h6>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <p>{order?.payment_details?.finalTotal?.toFixed(2)}</p>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <h6 className="h6title">
                {props.language === "en" ? "Paid Amount" : "المبلغ المدفوع"}
              </h6>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <p>{order?.paid_amount}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={6} xs={12}>
              <h6 className="h6title">
                {props.language === "en" ? "Date" : "التاريخ"}
              </h6>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <p>{new Date(order?.created_at).toLocaleDateString()}</p>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <h6 className="h6title">
                {props.language === "en" ? "Status" : "الحالة"}
              </h6>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              {order?.status}
            </Col>
          </Row>
          <Row>
            {/* <Col sm={4}>
              <h6>Stars</h6>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <ReactStars
                  count={5}
                  value={rating || 5}
                  onChange={() => {}}
                  size={25}
                  activeColor="gold"
                  color="#eaeaea"
                  edit={false}
                  isHalf
                />
              </div>
            </Col> */}
          </Row>
        </div>
        <h6 className="h6title" style={{ marginTop: "10px" }}>
          {props.language === "en" ? "Products List" : "رقم الطلب"}
        </h6>
        <div className="mt-2 tableScroll">
          {/* <p>{comments}</p> */}
          <Table className="orderDetailsTableClient">
            <thead>
              {/* <td>Image</td> */}
              <td>{props.language === "en" ? "Image" : "الصورة"}</td>
              <td>{props.language === "en" ? "Name" : "الاسم"}</td>
              <td>{props.language === "en" ? "Product Code" : "رمز المنتج"}</td>
              <td>{props.language === "en" ? "Quantity" : "الكمية"}</td>
              <td>{props.language === "en" ? "Price" : "السعر"}</td>
              <td>
                {props.language === "en" ? "Sub Total" : "المجموع الفرعي"}
              </td>
            </thead>
            <tbody className="orderDetailModelTableBody">
              {data?.map((item, index) => (
                <tr key={index}>
                  <td className="td_product td_productImg">
                    {props.language === "en" && (
                      <img
                        src={
                          process.env.REACT_APP_IMAGE_BASE_URL +
                          item.englishImage
                        }
                        alt=""
                        className="orderdetailImg"
                      />
                    )}
                    {props.language === "ar" && (
                      <img
                        src={
                          item.arabicImage
                            ? process.env.REACT_APP_IMAGE_BASE_URL +
                              item.arabicImage
                            : process.env.REACT_APP_IMAGE_BASE_URL +
                              item.englishImage
                        }
                        alt=""
                        className="orderdetailImg"
                      />
                    )}
                  </td>
                  {props.language === "en" && (
                    <td className="td_product">
                      <span>
                        {" "}
                        <span className="productNameStyle">
                          {item.productName}
                        </span>{" "}
                        {item.variation && <>({item.variation})</>}{" "}
                        {item.color && <>({item.color})</>}{" "}
                        {item?.decoration && <>({item?.decoration})</>}{" "}
                      </span>
                    </td>
                  )}
                  {props.language === "ar" && (
                    <td className="td_product">
                      <span>
                        {" "}
                        <span className="productNameStyle">
                          {item.productArabicName}
                        </span>{" "}
                        {item.arabicVariation && <>({item.arabicVariation})</>}{" "}
                        {item.arabicColor && <>({item.arabicColor})</>}{" "}
                        {item.arabicDecoration && (
                          <>({item.arabicDecoration})</>
                        )}{" "}
                      </span>
                    </td>
                  )}
                  <td className="td_product_code">
                    <span>{item.productCode}</span>
                  </td>
                  <td className="td_product">
                    <span>{item.quantity}</span>
                  </td>
                  <td className="td_product">
                    <span>{item.price.toFixed(2)}</span>
                  </td>
                  <td className="td_product">
                    <span>{(item.price * item.quantity).toFixed(2)}</span>
                  </td>
                  {/* <td className="td_status"><p className={item.status === "Delivered" ? "status_green" : "status_red"}>{item.status}</p></td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>
          {props.language === "en" ? "Close" : "إغلاق"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(OrderDetailsModal);

// export default OrderDetailsModal;
