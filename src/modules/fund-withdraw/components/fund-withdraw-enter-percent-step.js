import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { convertToCurrency } from "utils/currency-converter";
import { formatValue } from "utils/formatter";

const FundWithdrawEnterPercentStep = props => {
  return (
    <Fragment>
      <GVFormikField
        className="invest-field"
        name="percent"
        label={props.t("withdraw-fund.amount-to-withdraw")}
        component={GVTextField}
        adornment="%"
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
      />
      {/*<div className="invest-popup__currency">
        <NumberFormat
          value={formatValue(convertToCurrency(props.amount, props.rate))}
          prefix="= "
          suffix={` ${props.currency}`}
          displayType="text"
        />
      </div>*/}
      <div className="dialog__buttons">
        <GVButton
          onClick={props.onClick}
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={props.disabled}
        >
          {props.t("withdraw-fund.next")}
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
