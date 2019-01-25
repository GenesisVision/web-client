import "./wallet-balance.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import ArrowIcon from "shared/media/arrow-up.svg";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const WalletBalanceElements = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData
}) => (
  <div className="wallet-balance__wrapper">
    <ul className="wallet-balance__statistic">
      <li className="wallet-balance__statistic-item">
        <StatisticItem
          label={t("wallet-page.total-balance")}
          equivalent={formatValue(walletBalanceData.total)}
          equivalentCurrency={walletBalanceData.currency}
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(walletBalanceData.totalCcy)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${walletBalanceData.currencyCcy}`}
          />
        </StatisticItem>
      </li>
      <li className="wallet-balance__statistic-item">
        <div
          className="b-indicator"
          style={{ width: "40px", height: "40px", marginRight: "15px" }}
        >
          75%
        </div>
        <StatisticItem
          label={t("wallet-page.invested-value")}
          equivalent={formatValue(walletBalanceData.invested)}
          equivalentCurrency={walletBalanceData.currency}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(walletBalanceData.investedCcy)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${walletBalanceData.currencyCcy}`}
          />
        </StatisticItem>
      </li>
      <li className="wallet-balance__statistic-item">
        <div
          className="b-indicator"
          style={{ width: "40px", height: "40px", marginRight: "15px" }}
        >
          10%
        </div>
        <StatisticItem
          label={t("wallet-page.pending")}
          equivalent={formatValue(walletBalanceData.pending)}
          equivalentCurrency={walletBalanceData.currency}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={walletBalanceData.pendingCcy}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${walletBalanceData.currencyCcy}`}
          />
        </StatisticItem>
      </li>
      <li className="wallet-balance__statistic-item">
        <div
          className="b-indicator"
          style={{ width: "40px", height: "40px", marginRight: "15px" }}
        >
          15%
        </div>
        <StatisticItem
          label={t("wallet-page.available")}
          equivalent={formatValue(walletBalanceData.availableCcy)}
          equivalentCurrency={walletBalanceData.currencyCcy}
          className="wallet-balance__statistic-big"
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(walletBalanceData.available)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${walletBalanceData.currency}`}
          />
        </StatisticItem>
      </li>
    </ul>
    {handleAddFunds && handleWithdraw && (
      <div className="wallet-balance__buttons">
        <GVButton
          className="wallet-balance__withdraw"
          color="secondary"
          variant="outlined"
          onClick={handleWithdraw}
        >
          <img
            className="wallet-balance__button-icon"
            src={ArrowIcon}
            alt="Icon"
          />
          {t("wallet-page.withdraw")}
        </GVButton>
        <GVButton
          className="wallet-balance__add-funds"
          onClick={handleAddFunds}
        >
          <span className="wallet-balance__button-icon wallet-balance__button-icon--sign">
            +
          </span>
          {t("wallet-page.add-funds")}
        </GVButton>
      </div>
    )}
  </div>
);

export default translate()(WalletBalanceElements);
