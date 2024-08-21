import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./OrderList.scss";
import { API } from '../../../http/API';
import { FaEye } from "react-icons/fa";
import OrderDetailsModal from "../OrderDetails";

function OrderList(props) {
    let { global } = props
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({selectedOrder:"",showModel:false});

    useEffect(() => {
        if(props?.user?.isAuthenticated){
            let data = {
                email: props?.user?.loggedInUser?.email
              }
          
              API.post('/user-orders',data).then((response) => {
                // console.log("data by user",response.data.data)
                setOrders(response.data.data)
              })
              .catch((error) => {
                console.log(error);
              });
        }
        

    }, [props?.user]);

    const qorderDetails = [
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Pending",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        }
    ];
    return (
        <div className="order-list orderDetailsOrderList">
            <div className="list_box orderDetailsTableDiv">
                <Table className="orderDetailsTableClient">
                    <thead>
                        {/* <td>Image</td> */}
                        <td>{global.activeLanguage === 'en' ? "Order Number" : "رقم الطلب"}</td>
                        <td>{global.activeLanguage === 'en' ? "Payment Method" : "طريقة الدفع"}</td>
                        <td>{global.activeLanguage === 'en' ? "Shipment Status" : "حالة الشحن"}</td>
                        <td>{global.activeLanguage === 'en' ? "Total" : "المجموع"}</td>
                        <td>{global.activeLanguage === 'en' ? "View Details" : "عرض التفاصيل"}</td>
                    </thead>
                    <tbody>
                        {orders?.map((item, index) => (
                            <tr key={index}>
                                <td className="td_product">
                                    <span>{item.orderNo}</span>
                                </td>
                                <td className="td_product">
                                    <span>{item.paymentmethod == "cashOnDelivery" ? "Cash On Delivery" : "Card Payment"}</span>
                                </td>
                                <td className="td_product">
                                    <span>{item.status}</span>
                                </td>
                                <td className="td_product">
                                    <span>{Number(item.finalTotal).toFixed(2)}</span>
                                </td>
                                <td className="td_product">
                                    <span>
                                        <FaEye
                                            size={20}
                                            onClick={() => {
                                                // this.setState({ selectReview: item });
                                                setOrderDetails({showModel:true,selectedOrder:item})
                                                // this.setState({ show: true });
                                            }}
                                            className="action-icon-details"
                                        />
                                    </span>
                                </td>
                                {/* <td className="td_status"><p className={item.status === "Delivered" ? "status_green" : "status_red"}>{item.status}</p></td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <OrderDetailsModal
                    show={orderDetails.showModel}
                    onHide={() => {
                    setOrderDetails({ showModel: false });
                    }}
                    review={orderDetails.selectedOrder}
                    language={global.activeLanguage}
                />
            </div>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(OrderList);

