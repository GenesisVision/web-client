import "./reallocate-container.scss";

import Dialog from "shared/components/dialog/dialog";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { compose } from "redux";
import CreateFundSettingsAddAsset from "../../pages/create-fund/components/create-fund-settings/create-fund-settings-add-asset/create-fund-settings-add-asset";
import CreateFundSettingsAssetsComponent from "../../pages/create-fund/components/create-fund-settings/create-fund-settings-assets-block/create-fund-settings-assets-block";
import { translate } from "react-i18next";
import { withFormik } from "formik";
import { array, number, object } from "yup";
import { GVButton } from "gv-react-components";
import { managerApiProxy } from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { bindActionCreators } from "redux";
import { alert } from "./servives/reallocate.services";

class ReallocateContainer_old extends Component {
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
  handleApply = (id, assets) => {
    console.log("submit");
    /*return managerApiProxy
      .v10ManagerProgramsByIdWithdrawByAmountPost(
        id,
        assets,
        authService.getAuthArg()
      )
      .then(() => {
        this.props.onClose();
        this.props.services.alert(
          "success",
          "reallocate.success-alert-message",
          true
        );
      })
      .catch(error => {
        this.setState({ error: error.errorMessage || error.error });
      });*/
  };

  render() {
    const { anchor, assets, remainder } = this.state;
    const { t, open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("reallocate.title")}</h2>
          </div>
        </div>
        <form
          className="dialog__bottom"
          id="reallocate"
          onSubmit={this.handleApply}
        >
          <div className="reallocate-container dialog__bottom">
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
            <div className="reallocate-container__buttons">
              <GVButton type={"submit"}>{t("reallocate.apply")}</GVButton>
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

ReallocateContainer_old.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
const mapDispathToProps = dispatch => ({
  services: bindActionCreators(
    {
      alert
    },
    dispatch
  )
});
export default compose(
  translate(),
  mapDispathToProps,
  withFormik({
    displayName: "reallocate",
    enableReinitialize: true,
    mapPropsToValues: props => {
      return {
        assets: [],
        remainder: 100
      };
    },
    validationSchema: ({ t }) =>
      object().shape({
        remainder: number()
          .required(t("create-fund-page.settings.validation.assets-share"))
          .max(0, t("create-fund-page.settings.validation.assets-share")),
        assets: array()
          .required(t("create-fund-page.settings.validation.assets-count"))
          .min(2, t("create-fund-page.settings.validation.assets-count"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(ReallocateContainer_old);
