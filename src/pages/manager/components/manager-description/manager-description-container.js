import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as managerService from "../../services/manager.service";
import ManagerDescription from "./manager-description";
import ManagerNavigation from "./manager-description-navigation";

class ManagerDescriptionContainer extends Component {
  render() {
    const { managerProfile, goBack } = this.props;

    return (
      <Fragment>
        <ManagerNavigation goBack={goBack} />
        <ManagerDescription managerProfile={managerProfile} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ ...managerService }, dispatch)
});

export default connect(mapDispatchToProps)(ManagerDescriptionContainer);
