import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";



const RegisterSuccess = (props) => {
  const history = useHistory();


  useEffect(() => {
    if (props.global.activeLanguage) {
      Swal.fire({
        title: 'Email Verification Successful',
        text: "Redirecting To login!",
        icon: 'success',
        // showCancelButton: true,
        showConfirmButton: false,
        timer: 2000,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        // confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        // let url = `${window.location.origin}/${props.global.activeLanguage}/login`
        history.replace(`/${props.global.activeLanguage}/login`)
      })
    }

  }, [props.global.activeLanguage]);
  return (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterSuccess);
