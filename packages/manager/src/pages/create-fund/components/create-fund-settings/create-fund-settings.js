import "shared/components/deposit-details/deposit-details.scss";

import "./create-fund-settings.scss";

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
import DepositButtonContainer from "shared/components/deposit-button-submit/deposit-button";
import InputImage from "shared/components/form/input-image/input-image";
import Hint from "shared/components/hint/hint";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import FundDefaultImage from "shared/media/program-default-image.svg";
import rateApi from "shared/services/api-client/rate-api";
import filesService from "shared/services/file-service";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { allowValuesNumberFormat } from "shared/utils/helpers";

import CreateFundSettingsAddAsset from "./create-fund-settings-add-asset/create-fund-settings-add-asset";
import CreateFundSettingsAssetsComponent from "./create-fund-settings-assets-block/create-fund-settings-assets-block";
import createFundSettingsValidationSchema from "./create-fund-settings.validators";
import ErrorNotifier from "./error-notifier/error-notifier";

class CreateFundSettings extends React.Component {
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
  allowEntryFee = values => {
    const { managerMaxEntryFee } = this.props.programsInfo;

    return allowValuesNumberFormat({ from: 0, to: managerMaxEntryFee })(values);
  };

  allowExitFee = values => {
    const { managerMaxExitFee } = this.props.programsInfo;

    return allowValuesNumberFormat({ from: 0, to: managerMaxExitFee })(values);
  };

  fetchRate = (fromCurrency, toCurrency) => {
    rateApi.v10RateByFromByToGet(fromCurrency, toCurrency).then(rate => {
      if (rate !== this.props.values.rate) {
        this.props.setFieldValue("rate", rate);
      }
    });
  };
  onChangeDepositWallet = (name, target) => {
    const {
      setFieldValue,
      values,
      wallets,
      fetchWallets,
      currency
    } = this.props;
    const depositWalletCurrency = target.props.value;
    setFieldValue("depositWalletCurrency", depositWalletCurrency);
    setFieldValue(
      "depositWalletId",
      wallets.find(item => item.currency === (values && depositWalletCurrency))
        .id
    );
    fetchWallets();
    this.fetchRate(depositWalletCurrency, currency);
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
  setMaxAmount = (available, currency) => () => {
    const { setFieldValue } = this.props;
    setFieldValue("depositAmount", formatCurrencyValue(available, currency));
  };
  render() {
    const { anchor, assets, remainder } = this.state;
    const {
      currency,
      wallets,
      t,
      navigateBack,
      author,
      isSubmitting,
      handleSubmit,
      values,
      deposit,
      programsInfo,
      onValidateError,
      setSubmitting,
      isValid
    } = this.props;
    if (!wallets || !wallets.length) return;
    const {
      depositWalletCurrency,
      depositAmount,
      description,
      title,
      rate
    } = values;

    const onSubmit = () => {
      createFundSettingsValidationSchema({
        wallets,
        t,
        programsInfo,
        deposit
      })
        .validate(values)
        .then(res => {}, () => onValidateError());

      handleSubmit(values, {
        setSubmitting
      });
    };

    const selectedWallet = wallets.find(
      item => item.currency === (values && values.depositWalletCurrency)
    );
    return (
      <div className="create-fund-settings">
        <form className="create-fund-settings__form">
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">01</span>
            {t("manager.create-fund-page.settings.main-settings")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
            <div className="create-fund-settings__row">
              <div className="create-fund-settings__item create-fund-settings__item--wider">
                <GVFormikField
                  type="text"
                  name="title"
                  label={t("manager.create-fund-page.settings.fields.name")}
                  autoComplete="off"
                  component={GVTextField}
                />
                <div className="create-fund-settings__item-caption">
                  <span className="create-fund-settings__description create-fund-settings__description-requirements">
                    {t(
                      "manager.create-fund-page.settings.fields.name-requirements"
                    )}
                  </span>
                </div>
              </div>
              <div className="create-fund-settings__item create-fund-settings__item--wider">
                <GVFormikField
                  type="textarea"
                  name="description"
                  label={t(
                    "manager.create-fund-page.settings.fields.description"
                  )}
                  component={GVTextField}
                />
                <div className="create-fund-settings__item-caption create-fund-settings__description">
                  <span className="create-fund-settings__description-requirements">
                    {t(
                      "manager.create-fund-page.settings.fields.description-requirements"
                    )}
                  </span>
                  {description.length > 0 && (
                    <div className="create-fund-settings__description-chars">
                      <div className="create-fund-settings__description-chars-value">
                        {description.length}
                      </div>
                      <GVProgramPeriod
                        start={0}
                        end={500}
                        value={description.length}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="create-fund-settings__item">
                <div className="create-fund-settings__logo-title">
                  {t("manager.create-fund-page.settings.fields.upload-logo")}
                </div>
                <div className="create-fund-settings__logo-notice">
                  {t(
                    "manager.create-fund-page.settings.fields.upload-logo-rules"
                  )}
                </div>
              </div>
              <div className="create-fund-settings__item create-fund-settings__item--wider">
                <div className="create-fund-settings__logo-section">
                  <div className="create-fund-settings__file-field-container">
                    <GVFormikField
                      name="logo"
                      component={InputImage}
                      defaultImage={FundDefaultImage}
                    />
                  </div>
                  <div className="create-fund-settings__image-info">
                    <div className="create-fund-settings__image-title">
                      {title}
                    </div>
                    <div className="create-fund-settings__image-author">
                      {author}
                    </div>
                  </div>
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
              <div className="create-fund-settings__item">
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
                  className="create-fund-settings__item-caption"
                  vertical={"bottom"}
                  tooltipContent={t(
                    "manager.create-fund-page.settings.hints.entry-fee-description",
                    { maxFee: programsInfo.managerMaxEntryFee }
                  )}
                />
              </div>
              <div className="create-fund-settings__item">
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
                  className="create-fund-settings__item-caption"
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
          <div className={"deposit-details create-fund-settings__fill-block"}>
            <div className="create-program-settings__item deposit-details">
              <GVFormikField
                name="depositWalletCurrency" // value={"GVT"}
                component={GVTextField}
                label={t("transfer.from")}
                InputComponent={Select}
                onChange={this.onChangeDepositWallet}
              >
                {wallets.map(wallet => {
                  return (
                    <option value={wallet.currency} key={wallet.currency}>
                      <img
                        src={filesService.getFileUrl(wallet.logo)}
                        className="transfer-popup__icon"
                        alt={wallet.currency}
                      />
                      {`${wallet.title} | ${wallet.currency}`}
                    </option>
                  );
                })}
              </GVFormikField>
              <InputAmountField
                autoFocus={false}
                name="depositAmount"
                label={t("transfer.amount")}
                currency={depositWalletCurrency}
                setMax={this.setMaxAmount(
                  selectedWallet.available,
                  selectedWallet.currency
                )}
              />
              {currency !== depositWalletCurrency && (
                <div className="invest-popup__currency">
                  <NumberFormat
                    value={formatCurrencyValue(
                      convertFromCurrency(depositAmount, rate),
                      currency
                    )}
                    prefix="≈ "
                    suffix={` ${currency}`}
                    displayType="text"
                  />
                </div>
              )}
              <div className="deposit-details__available-list">
                <div className="deposit-details__available-amount">
                  {t("manager.create-program-page.settings.fields.min-deposit")}
                  <span className={"deposit-details__available-amount-value"}>
                    <NumberFormat
                      value={deposit}
                      thousandSeparator=" "
                      displayType="text"
                      suffix={` ${currency}`}
                    />
                  </span>
                </div>
                <div className="deposit-details__available-amount">
                  {t(
                    "manager.create-fund-page.settings.fields.available-in-wallet"
                  )}
                  <span className={"deposit-details__available-amount-value"}>
                    <NumberFormat
                      value={selectedWallet.available}
                      thousandSeparator=" "
                      displayType="text"
                      suffix={values ? ` ${depositWalletCurrency}` : " GVT"}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="create-fund-settings__navigation">
          <DepositButtonContainer
            title={t("buttons.create-fund")}
            deposit={deposit}
            onSubmit={onSubmit}
            disabled={isSubmitting || !isValid}
          >
            {t("buttons.create-fund")}
          </DepositButtonContainer>
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
        rate: "1",
        depositWalletCurrency: "GVT",
        depositWalletId: Array.isArray(props.wallets)
          ? props.wallets.find(item => item.currency === "GVT").id
          : null,
        assets: [],
        remainder: 100,
        exitFee: "",
        title: "",
        description: "",
        logo: {},
        entryFee: ""
      };
    },
    validationSchema: createFundSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })(CreateFundSettings)
);
