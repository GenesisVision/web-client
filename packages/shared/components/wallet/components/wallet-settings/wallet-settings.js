import "./wallet-settings.scss";

import { GVSwitch } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";

class WalletSettings extends Component {
  handleSwitch = () => {
    const { isPayFeesWithGvt, offPayGVTFee, onPayGVTFee } = this.props;
    if (isPayFeesWithGvt) {
      offPayGVTFee();
    } else {
      onPayGVTFee();
    }
  };

  render() {
    const { isPayFeesWithGvt, name, label, isPending } = this.props;
    return (
      <div className="wallet-settings">
        <button type="button" className="wallet-settings__question">
          ?
        </button>
        <div className="wallet-settings__label">{label}</div>
        <GVSwitch
          className="wallet-settings__switch"
          name={name}
          value={isPayFeesWithGvt}
          disabled={isPending}
          color="primary"
          onChange={this.handleSwitch}
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
