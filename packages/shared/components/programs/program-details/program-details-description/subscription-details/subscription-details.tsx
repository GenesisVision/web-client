import "./subscription-details.scss";

import {
  AttachToSignalProviderModeEnum,
  PersonalProgramDetailsFull,
  SignalSubscriptionModeEnum
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _SubscriptionDetails: React.FC<Props> = ({
  t,
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
}) => (
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
    <div className="details-investment__short-statistic details-investment__short-statistic--investment">
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
    </div>
  </div>
);

const _SubscriptionTypeValue: React.FC<ISubscriptionTypeValueProps> = ({
  t,
  mode,
  percent,
  fixedVolume,
  rate,
  currency
}) => (
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
          suffix="USD"
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
const SubscriptionTypeValue = translate()(React.memo(_SubscriptionTypeValue));

interface ISubscriptionTypeValueProps extends WithTranslation {
  mode: SignalSubscriptionModeEnum;
  percent: number;
  fixedVolume: number;
  rate: number;
  currency: CurrencyEnum;
}

const modes: { [key: string]: AttachToSignalProviderModeEnum } = {
  byBalance: "ByBalance",
  percentage: "Percent",
  fixed: "Fixed"
};

interface OwnProps {
  currency: CurrencyEnum;
  personalDetails: PersonalProgramDetailsFull;
  openPopup(): void;
  rate: number;
}

interface Props extends OwnProps, WithTranslation {}

const SubscriptionDetails = translate()(React.memo(_SubscriptionDetails));
export default SubscriptionDetails;
