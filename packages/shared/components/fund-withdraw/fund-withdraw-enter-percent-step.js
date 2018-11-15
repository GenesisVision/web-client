import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "shared/utils/formatter";

const FundWithdrawEnterPercentStep = props => {
  const {
    t,
    onClick,
    disabled,
    exitFee,
    feeInCurrency,
    valueInCurrency,
    withdrawAmount
  } = props;
  return (
    <Fragment>
      <GVFormikField
        className="invest-field"
        name="percent"
        label={t("withdraw-fund.amount-to-withdraw")}
        component={GVTextField}
        adornment="%"
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
      />
      <div className="invest-popup__currency">
        <NumberFormat
          value={formatValue(valueInCurrency)}
          prefix="&asymp; "
          suffix={` GVT`}
          displayType="text"
        />
      </div>
      {exitFee !== 0 && (
        <ul className="dialog-list">
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("withdraw-fund.exit-fee")}
            </span>
            <span className="dialog-list__value">
              {exitFee} %{" "}
              <NumberFormat
                value={formatValue(feeInCurrency)}
                prefix=" &asymp; "
                suffix={" GVT"}
                displayType="text"
              />
            </span>
          </li>
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("withdraw-fund.withdraw-amount")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatValue(withdrawAmount)}
                prefix=" &asymp; "
                suffix={" GVT"}
                displayType="text"
              />
            </span>
          </li>
        </ul>
      )}
      <div className="dialog__buttons">
        <GVButton
          onClick={onClick}
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={disabled}
        >
          {t("withdraw-fund.next")}
        </GVButton>
      </div>
    </Fragment>
  );
};

FundWithdrawEnterPercentStep.propTypes = {
  percent: PropTypes.string,
  rate: PropTypes.number,
  currency: PropTypes.string,
  availableToWithdraw: PropTypes.number,
  t: PropTypes.func,
  disabled: PropTypes.bool
};

export default translate()(FundWithdrawEnterPercentStep);
