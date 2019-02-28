import { GVButton } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import FormError from "shared/components/form/form-error/form-error";
import { formatValue } from "shared/utils/formatter";

const WithdrawConfirmStep = props => {
  const {
    t,
    programCurrency,
    amount,
    periodEnds,
    onPrevClick,
    disabled
  } = props;
  return (
    <Fragment>
      <ul className="dialog-list">
        <li className="dialog-list__item">
          {t("withdraw-program.withdrawing")}
          <span className="dialog-list__value">
            {formatValue(amount)} {programCurrency}
          </span>
        </li>
        <li className="dialog-list__item">
          {t("withdraw-program.payout-date")}
          <span className="dialog-list__value">
            {moment(periodEnds).format("lll")}
          </span>
        </li>
      </ul>
      <div className="form-error">
        <FormError error={props.error} />
      </div>
      <div className="dialog__buttons">
        <GVButton
          onClick={onPrevClick}
          color="secondary"
          variant="outlined"
          title={"back"}
        >
          {t("withdraw-program.back")}
        </GVButton>
        <GVButton title={"submit"} type={"submit"} disabled={disabled}>
          {t("withdraw-program.submit")}
        </GVButton>
      </div>
    </Fragment>
  );
};

WithdrawConfirmStep.propTypes = {
  amount: PropTypes.string.isRequired,
  periodEnds: PropTypes.instanceOf(Date),
  onPrevClick: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default translate()(WithdrawConfirmStep);
