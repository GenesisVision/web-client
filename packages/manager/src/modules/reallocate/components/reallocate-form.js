import { withFormik } from "formik";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import ErrorMessage, {
  OVER
} from "shared/components/error-message/error-message";
import { array, number, object } from "yup";

import CreateFundSettingsAddAsset from "../../../pages/create-fund/components/create-fund-settings/create-fund-settings-add-asset/create-fund-settings-add-asset";
import CreateFundSettingsAssetsComponent from "../../../pages/create-fund/components/create-fund-settings/create-fund-settings-assets-block/create-fund-settings-assets-block";

class ReallocateForm extends Component {
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
    const { t, handleSubmit, isValid, dirty, errors } = this.props;
    return (
      <form
        className="reallocate-container dialog__top"
        id="reallocate"
        onSubmit={handleSubmit}
      >
        <div className="dialog__header">
          <h2>{t("reallocate.title")}</h2>
        </div>
        {(errors.assets && (
          <ErrorMessage error={errors.assets} type={OVER} />
        )) ||
          (errors.remainder && (
            <ErrorMessage error={errors.remainder} type={OVER} />
          ))}
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
        <div className="dialog__buttons">
          <GVButton type={"submit"} disabled={!isValid || !dirty}>
            {t("reallocate.apply")}
          </GVButton>
        </div>
      </form>
    );
  }
}
export default compose(
  translate(),
  withFormik({
    displayName: "reallocate",
    enableReinitialize: true,
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
)(ReallocateForm);
