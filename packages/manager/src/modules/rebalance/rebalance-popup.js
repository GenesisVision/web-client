import "./rebalancing-container.scss";

import Dialog from "shared/components/dialog/dialog";
import PropTypes from "prop-types";
import React, { Component } from "react";
import CreateFundSettingsAddAsset from "../../pages/create-fund/components/create-fund-settings/create-fund-settings-add-asset/create-fund-settings-add-asset";
import CreateFundSettingsAssetsComponent from "../../pages/create-fund/components/create-fund-settings/create-fund-settings-assets-block/create-fund-settings-assets-block";

class RebalancePopup extends Component {
  state = {
    anchor: null,
    assets: this.props.assets,
    remainder: 0
  };

  componentDidMount() {
    this.setState({ remainder: this.getRemainder() });
  }

  handlePercentChange = asset => e => {
    let value = +e.target.value;
    if (isNaN(value)) return;
    if (value > this.getRemainderWithoutChoised(asset))
      value = this.getRemainderWithoutChoised(asset);
    asset.percent = value;
    this.updateAssets();
  };
  handleDown = asset => () => {
    if (asset.percent === 0) return;
    asset.percent--;
    this.updateAssets();
  };
  handleUp = asset => () => {
    if (this.state.remainder - 1 < 0) return;
    asset.percent++;
    this.updateAssets();
  };
  getRemainder = () => {
    return 100 - this.state.assets.reduce((sum, item) => sum + item.percent, 0);
  };
  getRemainderWithoutChoised = asset => {
    return (
      100 -
      this.state.assets
        .filter(item => item.asset !== asset.asset)
        .reduce((sum, item) => sum + item.percent, 0)
    );
  };
  updateAssets = () => {
    const newRemainder = this.getRemainder();
    this.setState({
      assets: [...this.state.assets],
      remainder: newRemainder
    });
    this.props.setFieldValue("balance", this.props.balance);
    this.props.setFieldValue("remainder", newRemainder);
    this.props.setFieldValue(
      "assets",
      this.state.assets.filter(item => item.percent > 0)
    );
  };
  removeHandle = currency => () => {
    this.state.assets.find(item => item.asset === currency).percent = 0;
    this.updateAssets();
  };
  handleOpenDropdown = event => {
    this.setState({ anchor: event.currentTarget });
  };
  handleCloseDropdown = () => this.setState({ anchor: null });

  render() {
    const { anchor, assets, remainder } = this.state;
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <div className="rebalancing-container">
          <CreateFundSettingsAssetsComponent
            assets={assets.filter(item => item.percent > 0)}
            remainder={remainder}
            removeHandle={this.removeHandle}
            addHandle={this.handleOpenDropdown}
          />
          <CreateFundSettingsAddAsset
            anchor={anchor}
            handleCloseDropdown={this.handleCloseDropdown}
            assets={assets}
            handleDown={this.handleDown}
            handleUp={this.handleUp}
            handlePercentChange={this.handlePercentChange}
          />
        </div>
      </Dialog>
    );
  }
}

RebalancePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RebalancePopup;
