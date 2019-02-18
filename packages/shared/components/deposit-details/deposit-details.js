import "./deposit-details.scss";

import classnames from "classnames";
import * as PropTypes from "prop-types";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { RefreshIcon } from "shared/components/icon/refresh-icon";
import { GVFormikField, GVTextField } from "gv-react-components";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import InputAmountField from "../input-amount-field/input-amount-field";
import rateApi from "shared/services/api-client/rate-api";
import { formatCurrencyValue } from "shared/utils/formatter";
import { convertFromCurrency } from "shared/utils/currency-converter";

class DepositDetails extends React.Component {
  state = {
    rate: 0
  };
  fetchRate = initialDepositCurrency => {
    const { values, currency } = this.props;
    rateApi
      .v10RateByFromByToGet(
        currency,
        initialDepositCurrency || values.initialDepositCurrency
      )
      .then(rate => {
        if (rate !== this.state.rate) this.setState({ rate });
      });
  };
  onChangeCurrencyFrom = (name, target) => {
    const { setFieldValue } = this.props;
    const wallet = target.props.value;
    setFieldValue("wallet", wallet);
    this.fetchRate(wallet);
  };
  render() {
    const {
      t,
      available,
      service,
      deposit,
      className,
      titleClassName,
      currency,
      wallets,
      availableToWithdraw,
      setFieldValue,
      fetchRate,
      values
    } = this.props;
    const { rate } = this.state;
    return (
      <div className={classnames("deposit-details", className)}>
        <div
          className={classnames(
            "deposit-details__deposit-amount-title",
            titleClassName
          )}
        >
          {t("manager.create-fund-page.settings.fields.deposit-amount")}
        </div>
        {values && (
          <Fragment>
            <div className="deposit-details__wallets">
              <GVFormikField
                name="wallet"
                // value={"GVT"}
                component={GVTextField}
                label={t("wallet-transfer.from")}
                InputComponent={Select}
                onChange={this.onChangeCurrencyFrom}
              >
                {wallets.map(wallet => {
                  return (
                    <option value={wallet.currency} key={wallet.currency}>
                      <img
                        src={getWalletIcon(wallet.currency)}
                        className="wallet-transfer-popup__icon"
                        alt={wallet.currency}
                      />
                      {`${wallet.title} | ${wallet.currency}`}
                    </option>
                  );
                })}
              </GVFormikField>
            </div>
            <div className="deposit-details__amount">
              <InputAmountField
                name="amount"
                label={t("wallet-transfer.amount")}
                currency={currency}
                // setMax={setMaxAmount}
              />
              {currency !== values.wallet && (
                <div className="invest-popup__currency">
                  <NumberFormat
                    value={formatCurrencyValue(
                      convertFromCurrency(values.amount, rate),
                      values.wallet
                    )}
                    prefix="= "
                    suffix={` ${values.wallet}`}
                    displayType="text"
                  />
                </div>
              )}
            </div>
            {/*<div className="deposit-details__deposit-amount-value">{`${deposit} ${currency}`}</div>*/}
            <div className="deposit-details__available-amount">
              {"Min. deposit"}
              <span
                className={classnames(
                  "deposit-details__available-amount-value",
                  {
                    "deposit-details__available-amount-value--error":
                      available < deposit
                  }
                )}
              >
                <NumberFormat
                  value={50}
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" GVT"
                />
              </span>
            </div>
          </Fragment>
        )}
        <div className="deposit-details__available-amount">
          {t("manager.create-fund-page.settings.fields.available-in-wallet")}
          <span
            className={classnames("deposit-details__available-amount-value", {
              "deposit-details__available-amount-value--error":
                available < deposit
            })}
          >
            <NumberFormat
              value={available}
              thousandSeparator=" "
              displayType="text"
              suffix=" GVT"
            />
          </span>
          {/*<span onClick={service.fetchProfileHeaderInfo}>
            {<RefreshIcon />}
          </span>*/}
        </div>
      </div>
    );
  }
}

DepositDetails.propTypes = {
  deposit: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  service: PropTypes.shape({
    fetchProfileHeaderInfo: PropTypes.func.isRequired
  }),
  className: PropTypes.string,
  titleClassName: PropTypes.string
};

export default translate()(DepositDetails);
