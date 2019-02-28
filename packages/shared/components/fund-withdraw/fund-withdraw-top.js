import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

const FundWithdrawTop = ({ t, availableToWithdraw, title }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("withdraw-fund.title")}</h2>
        <p>{title}</p>
      </div>
      <div className="dialog-field">
        <StatisticItem label={t("withdraw-fund.available-to-withdraw")} big>
          {formatCurrencyValue(availableToWithdraw, "GVT")} GVT
        </StatisticItem>
      </div>
    </div>
  );
};

FundWithdrawTop.propTypes = {
  availableToWithdraw: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default translate()(FundWithdrawTop);
