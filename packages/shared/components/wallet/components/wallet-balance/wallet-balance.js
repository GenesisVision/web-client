import "./wallet-balance.scss";

import DetailsStatisticItem from "shared/components/details-statistic-item/details-statistic-item";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "shared/utils/formatter";

const WalletBalance = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData,
  currentCurrency
}) => (
  <div className="wallet-balance">
    <h1 className="wallet-balance__heading">{t("wallet.title")}</h1>
    <div className="wallet-balance__statistic">
      <DetailsStatisticItem
        label={t("wallet.total-balance")}
        equivalent={walletBalanceData.totalBalanceCurrency}
        equivalentCurrency={currentCurrency}
        large
        accent
      >
        <NumberFormat
          value={formatValue(walletBalanceData.totalBalanceGVT)}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
      </DetailsStatisticItem>
      <DetailsStatisticItem
        label={t("wallet.invested-value")}
        equivalent={walletBalanceData.investedCurrency}
        equivalentCurrency={currentCurrency}
        className="wallet-balance__statistic-big"
        big
        accent
      >
        <NumberFormat
          value={formatValue(walletBalanceData.investedGVT)}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
      </DetailsStatisticItem>
      <DetailsStatisticItem
        label={t("wallet.available")}
        equivalent={walletBalanceData.availableCurrency}
        equivalentCurrency={currentCurrency}
        className="wallet-balance__statistic-big"
        big
        accent
      >
        <NumberFormat
          value={formatValue(walletBalanceData.availableGVT)}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
      </DetailsStatisticItem>
    </div>
    <div className="wallet-balance__footer">
      <GVButton className="wallet-balance__add-funds" onClick={handleAddFunds}>
        {t("wallet.add-funds")}
      </GVButton>
      <GVButton
        className="wallet-balance__withdraw"
        color="secondary"
        variant="outlined"
        onClick={handleWithdraw}
      >
        {t("wallet.withdraw")}
      </GVButton>
    </div>
  </div>
);

export default translate()(WalletBalance);
