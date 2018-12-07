import "./create-fund-settings.scss";

import classnames from "classnames";
import { Field, withFormik } from "formik";
import {
  GVButton,
  GVFormikField,
  GVProgramPeriod,
  GVTextField
} from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import DepositDetails from "shared/components/deposit-details/deposit-details";
import InputImage from "shared/components/form/input-image/input-image";
import Hint from "shared/components/hint/hint";
import { RefreshIcon } from "shared/components/icon/refresh-icon";
import { allowValuesNumberFormat } from "shared/utils/helpers";

import CreateFundSettingsAddAsset from "./create-fund-settings-add-asset/create-fund-settings-add-asset";
import CreateFundSettingsAssetsComponent from "./create-fund-settings-assets-block/create-fund-settings-assets-block";
import createFundSettingsValidationSchema from "./create-fund-settings.validators";
import ErrorNotifier from "./error-notifier/error-notifier";
import FundDefaultImage from "./fund-default-image";

class CreateFundSettings extends React.Component {
  allowEntryFee = values => {
    const { managerMaxEntryFee } = this.props.programsInfo;

    return allowValuesNumberFormat({ from: 0, to: managerMaxEntryFee })(values);
  };

  allowExitFee = values => {
    const { managerMaxExitFee } = this.props.programsInfo;

    return allowValuesNumberFormat({ from: 0, to: managerMaxExitFee })(values);
  };

  state = {
    anchor: null,
    assets: this.props.assets.map(asset => {
      return {
        ...asset,
        percent: 0
      };
    }),
    remainder: 100
  };
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
    const {
      t,
      navigateBack,
      author,
      isSubmitting,
      handleSubmit,
      values,
      setFieldValue,
      deposit,
      errors,
      programsInfo,
      onValidateError,
      setSubmitting
    } = this.props;

    const imageInputError =
      errors &&
      errors.logo &&
      (errors.logo.width || errors.logo.height || errors.logo.size);

    const onSubmit = () => {
      const isValid = createFundSettingsValidationSchema({
        t,
        programsInfo,
        deposit
      }).isValidSync(values);

      if (!isValid) {
        onValidateError();
      }

      handleSubmit(values, { setSubmitting });
    };

    return (
      <div className="create-fund-settings">
        <form className="create-fund-settings__form">
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">01</span>
            {t("manager.create-fund-page.settings.main-settings")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
            <div className="create-fund-settings__row create-fund-settings__row--description">
              <GVFormikField
                type="text"
                name="title"
                label={t("manager.create-fund-page.settings.fields.name")}
                autoComplete="off"
                component={GVTextField}
              />
              <div className="create-fund-settings__description-info">
                <span className="create-fund-settings__description create-fund-settings__description-requirements">
                  {t(
                    "manager.create-fund-page.settings.fields.name-requirements"
                  )}
                </span>
              </div>
            </div>
            <div className="create-fund-settings__row create-fund-settings__row--description">
              <GVFormikField
                type="textarea"
                name="description"
                label={t(
                  "manager.create-fund-page.settings.fields.description"
                )}
                component={GVTextField}
              />
              <div className="create-fund-settings__description-info">
                <span className="create-fund-settings__description create-fund-settings__description-requirements">
                  {t(
                    "manager.create-fund-page.settings.fields.description-requirements"
                  )}
                </span>
                {values.description.length > 0 && (
                  <div className="create-fund-settings__description-chars">
                    <div className="create-fund-settings__description-chars-value">
                      {values.description.length}
                    </div>
                    <GVProgramPeriod
                      start={0}
                      end={500}
                      value={values.description.length}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="create-fund-settings__logo-title">
              {t("manager.create-fund-page.settings.fields.upload-logo")}
            </div>
            <div className="create-fund-settings__logo-notice">
              {t("manager.create-fund-page.settings.fields.upload-logo-rules")}
            </div>
            <div className="create-fund-settings__logo-section">
              <div className="create-fund-settings__file-field-container">
                <Field
                  name="logo"
                  render={({ field, form }) => (
                    <InputImage
                      {...field}
                      defaultImage={FundDefaultImage}
                      onChange={setFieldValue}
                      alt="Fund logo"
                      error={imageInputError}
                    />
                  )}
                />
              </div>
              <div className="create-fund-settings__image-info">
                <div className="create-fund-settings__image-title">
                  {values.title}
                </div>
                <div className="create-fund-settings__image-author">
                  {author}
                </div>
              </div>
            </div>
          </div>
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">02</span>
            {t("manager.create-fund-page.settings.asset-selection")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
            <div className="create-fund-settings__description">
              <Field
                name="remainder"
                render={({ field, form }) => (
                  <ErrorNotifier
                    placeholder={t(
                      "manager.create-fund-page.settings.fields.asset-description"
                    )}
                    {...field}
                    {...form}
                  />
                )}
              />
            </div>
            <div className="create-fund-settings__error">
              <Field
                name="assets"
                render={({ field, form }) => (
                  <ErrorNotifier {...field} {...form} />
                )}
              />
            </div>
            <CreateFundSettingsAssetsComponent
              assets={assets.filter(item => item.percent > 0)}
              remainder={remainder}
              removeHandle={this.removeHandle}
              addHandle={this.handleOpenDropdown}
            />
          </div>
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">03</span>
            {t("manager.create-fund-page.settings.fees-settings")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
            <div className="create-fund-settings__row">
              <div className="create-fund-settings__fee">
                <GVFormikField
                  name="entryFee"
                  label={t(
                    "manager.create-fund-page.settings.fields.entry-fee"
                  )}
                  adornment="%"
                  //isAllowed={this.allowEntryFee}
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.entry-fee"
                  )}
                  className="create-fund-settings__fee-hint"
                  vertical={"bottom"}
                  tooltipContent={t(
                    "manager.create-fund-page.settings.hints.entry-fee-description",
                    { maxFee: programsInfo.managerMaxEntryFee }
                  )}
                />
              </div>
              <div className="create-fund-settings__fee">
                <GVFormikField
                  name="exitFee"
                  label={t("manager.create-fund-page.settings.fields.exit-fee")}
                  adornment="%"
                  //isAllowed={this.allowExitFee}
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                />
                <Hint
                  content={t(
                    "manager.create-fund-page.settings.hints.exit-fee"
                  )}
                  className="create-fund-settings__fee-hint"
                  vertical={"bottom"}
                  tooltipContent={t(
                    "manager.create-fund-page.settings.hints.exit-fee-description",
                    {
                      maxFee: programsInfo.managerMaxExitFee
                    }
                  )}
                />
              </div>
            </div>
          </div>
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">04</span>
            {t("manager.create-fund-page.settings.deposit-details")}
          </div>
          <DepositDetails deposit={deposit} />
        </form>
        <div className="create-fund-settings__navigation">
          <GVButton
            title={t("buttons.create-fund")}
            color="primary"
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {t("buttons.create-fund")}
          </GVButton>
          <GVButton
            variant="text"
            onClick={() => navigateBack(values)}
            className="create-fund-settings__navigation-back"
          >
            &larr; {t("buttons.back")}
          </GVButton>
        </div>
        <CreateFundSettingsAddAsset
          anchor={anchor}
          handleCloseDropdown={this.handleCloseDropdown}
          assets={assets}
          handleDown={this.handleDown}
          handleUp={this.handleUp}
          handlePercentChange={this.handlePercentChange}
        />
      </div>
    );
  }
}

export default translate()(
  withFormik({
    displayName: "CreateFundSettingsForm",
    enableReinitialize: true,
    mapPropsToValues: props => {
      return {
        assets: [],
        balance: 10,
        remainder: 100,
        exitFee: "",
        title: "",
        description: "",
        logo: {
          cropped: null,
          src: "",
          isNew: false,
          isDefault: true,
          size: undefined,
          width: undefined,
          height: undefined
        },
        entryFee: ""
      };
    },
    validationSchema: createFundSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })(CreateFundSettings)
);
