import React from "react";
import { connect } from "react-redux";


function MainTitle(props) {
  return (
    <div className="main-title">
      {/* <h1>{props.text}</h1> */}
      {props?.text ? <h1>{props?.text}</h1> : !props?.category?.label ? <h1>{props.global.activeLanguage == 'en' ? "Our Products" : "منتجاتنا"}</h1> : props?.category?.label == "All" ? <h1>{props.global.activeLanguage == 'en' ? "Our Products" : "منتجاتنا"}</h1> : <h1>{props?.category?.label}</h1>}
      {/* {!props?.category?.label && <h1>{"Our Products"}</h1>} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};



export default connect(mapStateToProps)(MainTitle);

// export default MainTitle;
