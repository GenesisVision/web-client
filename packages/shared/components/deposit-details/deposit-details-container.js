import * as PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";

import DepositDetails from "./deposit-details";

const DepositDetailsContainer = props => {
  return <DepositDetails {...props} />;
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

DepositDetailsContainer.propTypes = {
  deposit: PropTypes.number.isRequired,
  className: PropTypes.string,
  titleClassName: PropTypes.string
};

DepositDetailsContainer.defaultProps = {
  className: "",
  titleClassName: ""
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositDetailsContainer);
