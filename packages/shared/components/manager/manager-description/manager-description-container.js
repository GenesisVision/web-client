import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

const mapDispatchToProps = (dispatch, props) => ({
  service: bindActionCreators({ ...props.managerService }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ManagerDescriptionContainer);
