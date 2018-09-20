import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { convertToCurrency } from "modules/program-deposit/components/program-deposit-form";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

const FormStep0 = props => {
  return (
    <Fragment>
      <GVFormikField
        className="invest-field"
        name="amount"
        label={props.t("withdraw-program.amount-to-withdraw")}
        component={GVTextField}
        adornment="GVT"
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
      />
      <div className="invest-popup__currency">
        <NumberFormat
          value={convertToCurrency(props.amount, props.rate)}
          prefix="= "
          suffix={` ${props.currency}`}
          decimalScale={8}
          displayType="text"
        />
      </div>
      <div className="dialog__buttons">
        <GVButton
          onClick={props.onClick}
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={props.disabled}
        >
          {props.t("withdraw-program.next")}
        </GVButton>
      </div>
    </Fragment>
  );
};

FormStep0.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
  rate: PropTypes.any,
  currency: PropTypes.any,
  availableToWithdraw: PropTypes.any,
  t: PropTypes.any,
  disabled: PropTypes.bool
};

export default translate()(FormStep0);
