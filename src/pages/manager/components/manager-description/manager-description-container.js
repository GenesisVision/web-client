import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";

import * as managerService from "../../services/manager.service";
import ManagerDescription from "./manager-description";
import ManagerNavigation from "./manager-description-navigation";

class ManagerDescriptionContainer extends Component {
  render() {
    const { managerProfile, service } = this.props;

    return (
      <Fragment>
        <ManagerNavigation goBack={service.goBack} />
        <ManagerDescription managerProfile={managerProfile} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ ...managerService, goBack }, dispatch)
});

export default connect(mapDispatchToProps)(ManagerDescriptionContainer);
