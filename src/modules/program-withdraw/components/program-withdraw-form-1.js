import { GVButton } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";

const FormStep1 = props => {
  return (
    <Fragment>
      <ul className="dialog-list">
        <li className="dialog-list__item">
          {props.t("withdraw-program.withdrawing")}
          <span className="dialog-list__value">{props.amount} GVT</span>
        </li>
        <li className="dialog-list__item">
          {props.t("withdraw-program.payout-date")}
          <span className="dialog-list__value">
            {moment(props.periodEnds).format("DD MMM YYYY")}
          </span>
        </li>
      </ul>
      <div className="form-error">{props.error}</div>
      <div className="dialog__buttons">
        <GVButton
          onClick={props.onPrevClick}
          color="secondary"
          variant="outlined"
          title={"back"}
        >
          {props.t("withdraw-program.back")}
        </GVButton>
        <GVButton title={"submit"} type={"submit"} disabled={props.disabled}>
          {props.t("withdraw-program.submit")}
        </GVButton>
      </div>
    </Fragment>
  );
};

FormStep1.propTypes = {
  amount: PropTypes.number.isRequired,
  periodEnds: PropTypes.string.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default translate()(FormStep1);
