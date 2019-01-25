import "./wallet-balance.scss";

import { GVButton, GVColors } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import * as InnerColors from "shared/components/gv-styles/color";
import PieContainer from "shared/components/pie-container/pie-container";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import ArrowIcon from "shared/media/arrow-up.svg";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const getPercentageValue = (value, totalValue) => {
  return Math.round((value / totalValue) * 100);
};

const WalletBalanceElements = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData
}) => {
  const totalValue = walletBalanceData.totalCcy;
  return (
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
          <PieContainer
            value={getPercentageValue(
              walletBalanceData.investedCcy,
              totalValue
            )}
            color={GVColors.$primaryColor}
            pieDiraction={"COUNTERCLOCKWISE"}
          />
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
          <PieContainer
            value={getPercentageValue(walletBalanceData.pendingCcy, totalValue)}
            color={InnerColors.$piePendingColor}
          />
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
          <PieContainer
            value={getPercentageValue(
              walletBalanceData.availableCcy,
              totalValue
            )}
            color={InnerColors.$pieAvailableColor}
          />
          <StatisticItem
            label={t("wallet-page.available")}
            equivalent={formatValue(walletBalanceData.available)}
            equivalentCurrency={walletBalanceData.currency}
            className="wallet-balance__statistic-big"
            big
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(walletBalanceData.availableCcy)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${walletBalanceData.currencyCcy}`}
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
};

export default translate()(WalletBalanceElements);
