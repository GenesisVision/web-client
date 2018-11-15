import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import FormError from "shared/components/form/form-error/form-error";
import { formatValue } from "shared/utils/formatter";
import NumberFormat from "react-number-format";

const WithdrawConfirmStep = props => {
  const {
    percent,
    error,
    onPrevClick,
    t,
    disabled,
    exitFee,
    feeInCurrency,
    withdrawAmount
  } = props;
  return (
    <Fragment>
      <ul className="dialog-list">
        <li className="dialog-list__item">
          {t("withdraw-fund.withdrawing")}
          <span className="dialog-list__value">{formatValue(percent)} %</span>
        </li>
        {exitFee !== 0 && (
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
        )}
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
      <div className="form-error">
        <FormError error={error} />
      </div>
      <div className="dialog__buttons">
        <GVButton
          onClick={onPrevClick}
          color="secondary"
          variant="outlined"
          title={"back"}
        >
          {t("withdraw-fund.back")}
        </GVButton>
        <GVButton title={"submit"} type={"submit"} disabled={disabled}>
          {t("withdraw-fund.submit")}
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
