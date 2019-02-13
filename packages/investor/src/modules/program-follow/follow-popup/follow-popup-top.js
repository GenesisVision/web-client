import React from "react";
import { translate } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

const FollowTop = ({ info, t, program, investor }) => {
  return (
    <div className="follow__top">
      <div className="follow__header">
        <h2>{program ? t("deposit-asset.title") : t("deposit-asset.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        {program && investor && (
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {formatCurrencyValue(info.availableToInvest, "GVT")} GVT
          </StatisticItem>
        )}
        <StatisticItem
          label={
            program
              ? t("deposit-asset.available-in-wallet")
              : t("deposit-asset.fund.available-to-invest")
          }
          big
        >
          {formatCurrencyValue(info.availableInWallet, "GVT")} GVT
        </StatisticItem>
      </div>
    </div>
  );
};

FollowTop.propTypes = {};

export default translate()(FollowTop);
