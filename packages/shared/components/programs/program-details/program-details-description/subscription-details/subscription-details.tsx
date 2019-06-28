import "./subscription-details.scss";

import {
  AttachToSignalProviderModeEnum,
  PersonalProgramDetailsFull
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _SubscriptionDetails: React.FC<Props> = ({
  t,
  currency,
  personalDetails,
  openPopup,
  rate
}) => {
  const {
    mode,
    openTolerancePercent,
    percent,
    fixedVolume,
    totalProfit
  } = personalDetails.signalSubscription;

  const renderSubscriptionTypeValue = () => (
    <>
      <span className="subscription-details__value-accent">
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
      </span>
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

  return (
    <Surface className="surface--horizontal-paddings subscription-details">
      <div className="subscription-details__heading">
        <h3>{t("subscription-details.title")}</h3>
        <button
          type="button"
          onClick={openPopup}
          className="subscription-details__edit-btn"
        >
          {t("subscription-details.edit")}
        </button>
      </div>
      <div className="subscription-details__short-statistic">
        <StatisticItem
          className="subscription-details__short-statistic-item"
          accent
          label={t("fund-details-page.description.profit")}
        >
          <Profitability value={`${totalProfit}`}>
            {roundPercents(totalProfit)}
          </Profitability>
        </StatisticItem>
        <StatisticItem
          className="subscription-details__short-statistic-item"
          accent
          label={t("fund-details-page.description.status")}
        >
          {t("subscription-details.active")}
        </StatisticItem>
        <StatisticItem
          accent
          label={t("subscription-details.subscription-type")}
          className="subscription-details__short-statistic-item"
        >
          {renderSubscriptionTypeValue()}
        </StatisticItem>
        <StatisticItem
          className="subscription-details__short-statistic-item"
          accent
          label={t(`subscription-details.tolerance-percentage`)}
        >
          <span className="subscription-details__value-accent">
            <NumberFormat
              value={openTolerancePercent}
              suffix="%"
              displayType="text"
            />
          </span>
        </StatisticItem>
      </div>
    </Surface>
  );
};

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

interface Props extends OwnProps, InjectedTranslateProps {}

const SubscriptionDetails = translate()(React.memo(_SubscriptionDetails));
export default SubscriptionDetails;
