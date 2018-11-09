import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as managerService from "../../services/manager.service";
import ManagerDescription from "./manager-description";

class ManagerDescriptionContainer extends Component {
  render() {
    const { managerProfile } = this.props;

    return (
      <Fragment>
        <ManagerDescription managerProfile={managerProfile} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ ...managerService }, dispatch)
});

export default connect(null, mapDispatchToProps)(ManagerDescriptionContainer);
