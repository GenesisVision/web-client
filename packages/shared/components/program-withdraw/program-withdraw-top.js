import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { formatValue } from "shared/utils/formatter";
import StatisticItem from "shared/components/statistic-item/statistic-item";

const ProgramWithdrawTop = ({
  t,
  availableToWithdraw,
  title,
  programCurrency
}) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("withdraw-program.title")}</h2>
        <p>{title}</p>
      </div>
      <div className="dialog-field">
        <StatisticItem label={t("withdraw-program.available-to-withdraw")} big>
          {formatValue(availableToWithdraw)} {programCurrency}
        </StatisticItem>
      </div>
    </div>
  );
};

ProgramWithdrawTop.propTypes = {
  availableToWithdraw: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default translate()(ProgramWithdrawTop);
