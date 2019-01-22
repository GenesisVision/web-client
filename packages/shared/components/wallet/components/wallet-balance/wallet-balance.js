import "./wallet-balance.scss";

import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

const WalletBalance = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData,
  currentCurrency
}) => (
  <Fragment>
    <ul className="wallet-balance__statistic">
      <li className="wallet-balance__statistic-item">
        <StatisticItem
          label={t("wallet-page.total-balance")}
          equivalent={formatValue(walletBalanceData.totalBalanceGVT)}
          equivalentCurrency={"GVT"}
          big
          accent
        >
          <NumberFormat
            value={formatValue(walletBalanceData.totalBalanceCurrency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${currentCurrency}`}
          />
        </StatisticItem>
      </li>
      <li className="wallet-balance__statistic-item">
        <div
          className="b-indicator"
          style={{ width: "40px", height: "40px", marginRight: "25px" }}
        >
          75%
        </div>
        <StatisticItem
          label={t("wallet-page.invested-value")}
          equivalent={formatValue(walletBalanceData.investedGVT)}
          equivalentCurrency={" GVT"}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={"0"}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${currentCurrency}`}
          />
        </StatisticItem>
      </li>
      <li className="wallet-balance__statistic-item">
        <div
          className="b-indicator"
          style={{ width: "40px", height: "40px", marginRight: "25px" }}
        >
          10%
        </div>
        <StatisticItem
          label={t("wallet-page.pending")}
          equivalent={"0"}
          equivalentCurrency={" GVT"}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatValue(walletBalanceData.availableGVT)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${currentCurrency}`}
          />
        </StatisticItem>
      </li>
      <div className="wallet-balance__statistic-item">
        <div
          className="b-indicator"
          style={{ width: "40px", height: "40px", marginRight: "25px" }}
        >
          15%
        </div>
        <StatisticItem
          label={t("wallet-page.available")}
          equivalent={formatValue(walletBalanceData.availableGVT)}
          equivalentCurrency={" GVT"}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatValue(walletBalanceData.availableCurrency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${currentCurrency}`}
          />
        </StatisticItem>
      </div>
    </ul>
  </Fragment>
);

export default translate()(WalletBalance);
