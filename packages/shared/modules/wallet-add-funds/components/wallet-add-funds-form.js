import copy from "copy-to-clipboard";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import GVqr from "shared/components/gv-qr/gv-qr";
import CopyIcon from "shared/components/icon/copy-icon";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";

class WalletAddFundsForm extends Component {
  onChangeCurrency = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("currency", target.props.value);
  };

  render() {
    const { t, values, wallets, notifySuccess, notifyError } = this.props;
    const selected = wallets.find(w => w.currency === values.currency) || {};
    const { address, currency } = selected;
    const onCopy = () => {
      try {
        copy(address);
        notifySuccess(t("wallet-add-funds.copy-to-clipboard-success"));
      } catch (error) {
        notifyError(t("wallet-add-funds.copy-to-clipboard-error"));
      }
    };

    return (
      <form id="add-funds" className="wallet-add-funds-popup">
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-add-funds.title")}</h2>
          </div>
          <div className="dialog-field">
            <GVFormikField
              name="currency"
              component={GVTextField}
              label={t("wallet-add-funds.select-currency")}
              InputComponent={Select}
              onChange={this.onChangeCurrency}
            >
              {wallets.map(wallet => {
                const { description, currency } = wallet;
                return (
                  <option value={currency} key={currency}>
                    <img
                      src={getWalletIcon(wallet.currency)}
                      className="wallet-withdraw-popup__icon"
                      alt={wallet.currency}
                    />
                    {`${description} | ${currency}`}
                  </option>
                );
              })}
            </GVFormikField>
          </div>
        </div>
        <div className="dialog__bottom wallet-add-funds-popup__bottom">
          <GVqr className="wallet-add-funds-popup__qr" value={address} />
          <StatisticItem
            className="wallet-add-funds-popup__address"
            label={t("wallet-add-funds.deposit-address")}
          >
            {address}
          </StatisticItem>
          <GVButton color="secondary" onClick={onCopy} disabled={!address}>
            <CopyIcon />
            &nbsp;
            {t("buttons.copy")}
          </GVButton>
          {currency !== "GVT" && currency !== null && (
            <div className="dialog__info">
              {t("wallet-add-funds.disclaimer", { currency })}
            </div>
          )}
        </div>
      </form>
    );
  }
}

WalletAddFundsForm.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      currency: PropTypes.string,
      rateToGVT: PropTypes.number,
      description: PropTypes.string,
      logo: PropTypes.string
    })
  ),
  t: PropTypes.func
};

export default compose(
  translate(),
  withFormik({
    displayName: "add-funds",
    mapPropsToValues: props => {
      let currency = props.currentWallet ? props.currentWallet.currency : "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return {
        currency,
        amount: ""
      };
    }
  })
)(WalletAddFundsForm);
