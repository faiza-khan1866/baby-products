import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { types } from "../../redux/global/types";
class CustomRoute extends Component {
  state = {
    // isAuthenticated: true,
  };
  renderRoute = () => {
    let isAuthenticated = this.props.user?.isAuthenticated;
    let hasTokken = this.props.user?.accessToken || "";
    // const { isAuthenticated } = this.state;
    const { isPrivate, path, component, exact } =
      this.props;
    if (!isPrivate) {
      return (
        <Route
          path={path}
          exact={exact}
          component={component}
        />
      );
    } else {
      if (hasTokken && isAuthenticated) {
        return (
          <Route
            path={path}
            exact={exact}
            component={component}
          />
        );
      } else {
        let lang = this.props.global.activeLanguage || "en"
        return <Redirect to={`/${lang}/login`} />;
      }
    }
  };

  // componentDidUpdate(prevProps)

  render() {
    return this.renderRoute();
    const { global } = this.props;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveLanguage: (language) =>
      dispatch({
        type: types.SET_ACTIVE_LANGUAGE,
        payload: {
          language: language,
        },
      }),
    // loginRequest: ({ username, token }) => dispatch(loginRequest({ username, token }))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomRoute);

// export default CustomRoute;
