import "./subscription-details.scss";

import { PersonalProgramDetailsFull, SubscriptionMode } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _SubscriptionDetails: React.FC<Props> = ({
  currency,
  personalDetails: {
    signalSubscription: {
      mode,
      openTolerancePercent,
      percent,
      fixedVolume,
      totalProfit
    }
  },
  openPopup,
  rate
}) => {
  const [t] = useTranslation();
  return (
    <div className="details-investment__block details-investment__block--subscription">
      <div className="details-investment__heading">
        <h5>{t("subscription-details.title")}</h5>
        <button
          type="button"
          onClick={openPopup}
          className="subscription-details__edit-btn"
        >
          {t("subscription-details.edit")}
        </button>
      </div>
      <StatisticItemList className="details-investment__short-statistic">
        <StatisticItem
          className="details-investment__statistic-item"
          accent
          label={t("fund-details-page.description.profit")}
        >
          <Profitability value={`${totalProfit}`}>
            {roundPercents(totalProfit)}
          </Profitability>
        </StatisticItem>
        <StatisticItem
          className="details-investment__statistic-item"
          accent
          label={t("fund-details-page.description.status")}
        >
          {t("subscription-details.active")}
        </StatisticItem>
        <StatisticItem
          accent
          label={t("subscription-details.subscription-type")}
          className="details-investment__statistic-item"
        >
          <SubscriptionTypeValue
            currency={currency}
            rate={rate}
            mode={mode}
            percent={percent}
            fixedVolume={fixedVolume}
          />
        </StatisticItem>
        <StatisticItem
          className="details-investment__statistic-item"
          accent
          label={t(`subscription-details.tolerance-percentage`)}
        >
          <NumberFormat
            value={openTolerancePercent}
            suffix="%"
            displayType="text"
          />
        </StatisticItem>
      </StatisticItemList>
    </div>
  );
};

const _SubscriptionTypeValue: React.FC<ISubscriptionTypeValueProps> = ({
  mode,
  percent,
  fixedVolume,
  rate,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <>
      <>
        {t(`subscription-details.modes.${mode}`)}
        {mode === modes.percentage && (
          <NumberFormat
            value={percent}
            prefix={`. ${t("subscription-details.volume")} `}
            suffix="%"
            displayType="text"
          />
        )}
        {mode === modes.fixed && (
          <NumberFormat
            value={formatCurrencyValue(fixedVolume, "USD")}
            prefix=" "
            suffix=" USD"
            displayType="text"
          />
        )}
      </>
      {mode === modes.fixed && (
        <NumberFormat
          value={formatCurrencyValue(
            convertFromCurrency(fixedVolume, rate),
            currency
          )}
          prefix=" (≈ "
          suffix={` ${currency})`}
          displayType="text"
        />
      )}
    </>
  );
};
const SubscriptionTypeValue = React.memo(_SubscriptionTypeValue);

interface ISubscriptionTypeValueProps {
  mode: SubscriptionMode;
  percent: number;
  fixedVolume: number;
  rate: number;
  currency: CurrencyEnum;
}

const modes: { [key: string]: SubscriptionMode } = {
  byBalance: "ByBalance",
  percentage: "Percent",
  fixed: "Fixed"
};

interface Props {
  currency: CurrencyEnum;
  personalDetails: PersonalProgramDetailsFull;
  openPopup: () => void;
  rate: number;
}

const SubscriptionDetails = React.memo(_SubscriptionDetails);
export default SubscriptionDetails;
