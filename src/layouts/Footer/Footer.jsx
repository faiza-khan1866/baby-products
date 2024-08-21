import React from "react";
import FooterLower from "./FooterLower";
import FooterUpper from "./FooterUpper";
import Help from "../../sections/Products/Help/Help";
import Title from "../../sections/Home/Welcome/Title";
import { getCategories, getCategoryProducts, getProducts } from "../../redux/products";
import { connect } from "react-redux";


function Footer(props) {
    const { global } = props;
    return (
        <footer style={{ backgroundColor: '#fff' }}>
            <FooterUpper
                language={global?.activeLanguage}
            />
            <FooterLower
                language={global?.activeLanguage}
            />
        </footer>
    );
}
const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (page) => dispatch(getProducts(page)),
        getCategories: () => dispatch(getCategories()),
        getCategoryProducts: (category) =>
            dispatch(getCategoryProducts(category)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);
