import { GVButton } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import FormError from "shared/components/form/form-error/form-error";
import { formatValue } from "utils/formatter";

const WithdrawConfirmStep = props => {
  return (
    <Fragment>
      <ul className="dialog-list">
        <li className="dialog-list__item">
          {props.t("withdraw-fund.withdrawing")}
          <span className="dialog-list__value">
            {formatValue(props.percent)} %
          </span>
        </li>
        <li className="dialog-list__item">
          {props.t("withdraw-fund.payout-date")}
          <span className="dialog-list__value">
            {moment(props.periodEnds).format("DD MMM YYYY")}
          </span>
        </li>
      </ul>
      <div className="form-error">
        <FormError error={props.error} />
      </div>
      <div className="dialog__buttons">
        <GVButton
          onClick={props.onPrevClick}
          color="secondary"
          variant="outlined"
          title={"back"}
        >
          {props.t("withdraw-fund.back")}
        </GVButton>
        <GVButton title={"submit"} type={"submit"} disabled={props.disabled}>
          {props.t("withdraw-fund.submit")}
        </GVButton>
      </div>
    </Fragment>
  );
};

WithdrawConfirmStep.propTypes = {
  percent: PropTypes.string.isRequired,
  periodEnds: PropTypes.instanceOf(Date),
  onPrevClick: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default translate()(WithdrawConfirmStep);
