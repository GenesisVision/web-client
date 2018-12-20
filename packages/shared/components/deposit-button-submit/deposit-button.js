import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const DepositButton = props => {
  const { onSubmit, available, deposit, children, title } = props;
  const disabled = props.disabled || available < deposit;
  return (
    <GVButton
      title={title}
      color="primary"
      type="submit"
      onClick={onSubmit}
      disabled={disabled}
    >
      {children}
    </GVButton>
  );
};

DepositButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  deposit: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const headerData = state.profileHeader.info.data || {};
  return {
    available: headerData.availableGvt || 0
  };
};

const DepositButtonContainer = connect(mapStateToProps)(DepositButton);

export default DepositButtonContainer;
