import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";

import * as managerService from "../../services/manager.service";
import ManagerDescription from "./manager-description";
import ManagerNavigation from "./manager-description-navigation";

const mock = {
  id: "string",
  username: "string",
  about:
    "so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text so many text ",
  avatar: "",
  regDate: "2018-09-06T13:37:38.844Z",
  assets: ["USD", "BTC", "ETH"]
};

class ManagerDescriptionContainer extends Component {
  componentDidMount() {
    const { service } = this.props;

    service.fetchManagerProfile();
  }

  render() {
    const { managerProfile, goBack } = this.props;

    if (!managerProfile) return null;

    return (
      <Fragment>
        <ManagerNavigation goBack={goBack} />
        <ManagerDescription managerProfile={managerProfile} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    // managerProfile: state.manager.data
    managerProfile: mock
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(managerService, dispatch),
  goBack: () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerDescriptionContainer);
