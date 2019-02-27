import "./wallet-settings.scss";

import { GVButton, GVSwitch } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import GVTFees from "shared/components/gvt-fees/gvt-fees";

class WalletSettings extends Component {
  state = {
    isOpenGVTFees: false,
    anchor: null
  };
  handleOpenGVTFees = () => {
    this.setState({ isOpenGVTFees: true });
  };
  handleCloseGVTFees = () => this.setState({ isOpenGVTFees: false });
  handleSwitch = () => {
    const { isPayFeesWithGvt, offPayGVTFee, onPayGVTFee } = this.props;
    if (isPayFeesWithGvt) {
      offPayGVTFee();
    } else {
      onPayGVTFee();
    }
  };

  render() {
    const { isPayFeesWithGvt, name, label, isPending, role } = this.props;
    const { isOpenGVTFees } = this.state;
    return (
      <div className="wallet-settings">
        <GVButton
          variant="text"
          type="button"
          color="secondary"
          className="wallet-settings__question"
          onClick={this.handleOpenGVTFees}
        >
          ?
        </GVButton>
        <div className="wallet-settings__label">{label}</div>
        <GVSwitch
          className="wallet-settings__switch"
          name={name}
          value={isPayFeesWithGvt}
          disabled={isPending}
          color="primary"
          onChange={this.handleSwitch}
        />
        <GVTFees
          open={isOpenGVTFees}
          onClose={this.handleCloseGVTFees}
          role={role}
        />
      </div>
    );
  }
}

WalletSettings.propTypes = {
  isPayFeesWithGvt: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  assetId: PropTypes.string,
  onPayGVTFee: PropTypes.func,
  offPayGVTFee: PropTypes.func
};

export default WalletSettings;
