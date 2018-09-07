import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";

import * as managerService from "../../services/manager.service";
import ManagerDescription from "./manager-description";

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
        <ManagerDescription managerProfile={managerProfile} goBack={goBack} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    managerProfile: state.manager.data
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
