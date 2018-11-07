import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as managerService from "../../services/manager.service";
import ManagerDescription from "./manager-description";
import BackButton from "components/back-button/back-button";

class ManagerDescriptionContainer extends Component {
  render() {
    const { managerProfile } = this.props;
    return (
      <Fragment>
        <BackButton />
        <ManagerDescription managerProfile={managerProfile} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ ...managerService }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ManagerDescriptionContainer);
