import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { convertToCurrency } from "modules/program-deposit/components/program-deposit-form";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";

const FormStep0 = props => {
  return (
    <Fragment>
      <GVFormikField
        className="invest-field"
        type="text"
        name="amount"
        label={props.label}
        component={GVTextField}
        adornment="GVT"
        autoComplete="off"
      />
      <div className="invest-popup__currency">{`= ${convertToCurrency(
        props.value,
        props.rate
      )} ${props.currency}`}</div>
      <div className="dialog__buttons">
        <GVButton
          onClick={props.onClick}
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={props.availableToWithdraw < props.value || props.disabled}
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
