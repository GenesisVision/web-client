import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";

import DepositDetails from "./deposit-details";

const DepositDetailsContainer = () => {
  return <DepositDetails />;
};

const mapStateToProps = state => {
  const headerData = state.profileHeader.info.data || {};
  return {
    available: headerData.availableGvt || 0
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ fetchProfileHeaderInfo }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositDetailsContainer);
