import React, { useState } from "react";
import { connect } from "react-redux";
import WishlistCard from "../../../components/WishlistCard/WishlistCard";
import { API } from "../../../http/API";
import SwalToast from "../../Swal/SwalToast";

function WishlistGrid(props) {
  const deleteWishlistItem = (id) => {
    let config = {
      headers: {
        Authorization: `Bearer ${props.user?.accessToken}`,
      },
      params: {
        user_id: props.user?.loggedInUser?._id,
        wishlist_id: id,
      },
    };

    API.get(`/auth/delete_wishlist`, config).then((response) => {
      props.wishlistSuccess(response.data);
      SwalToast.fire({
        icon: "success",
        title:
          props.activeLanguage == "en"
            ? "Product removed from Wishlist"
            : "تمت إزالة المنتج من قائمة الرغبات",
      });
      // API.get(`/auth/wishlist`, config).then((response) => {

      //   console.log("wishlist response.data")
      //   console.log(response.data)
      //   props.wishlistSuccess(response.data);
      // });

      // API.get(`/auth/wishlist`, {
      //   headers: {
      //     Authorization: `Bearer ${props.user?.accessToken}`,
      //   },
      // }).then((response) => {
      //   props.wishlistSuccess(response.data);
      // });
    });
  };
  return (
    <div className="wishlist-grid">
      {/* <Container fluid> */}
      {props.data?.length > 0 ? (
        props.data.map((x) => (
          <WishlistCard {...x} onDelete={deleteWishlistItem} />
        ))
      ) : (
        <p className="text-italic text-center fw-500">
          {props.activeLanguage == "en"
            ? "No items added to the wishlist"
            : "لم يتم إضافة أي عنصر لقائمة المشتريات"}
        </p>
      )}
      {/* </Container> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    userWishlistProducts: state.productReducer?.userWishlistProducts,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistGrid);
