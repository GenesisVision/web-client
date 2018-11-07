import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as managerService from "../../services/manager.service";
import ManagerDescription from "./manager-description";
import BackButton from "components/back-button/back-button";

class ManagerDescriptionContainer extends Component {
  render() {
    const { managerProfile, goBack, backPath } = this.props;
    return (
      <Fragment>
        <BackButton backPath={backPath} goBack={goBack} />
        <ManagerDescription managerProfile={managerProfile} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  backPath: state.routing.location.state
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ ...managerService }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerDescriptionContainer);
