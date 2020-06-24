import { DetailsInvestmentBlock } from "components/details/details-description-section/details-investment/blocks/details-investment-block";
import { DetailsInvestmentHeading } from "components/details/details-description-section/details-investment/blocks/details-investment-title";
import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { withBlurLoader } from "decorators/with-blur-loader";
import { SignalSubscription } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _Subscription: React.FC<Props> = ({
  id,
  updateInfo,
  data: subscriptionInfo,
  assetCurrency
}) => {
  const [t] = useTranslation();
  return (
    <DetailsInvestmentBlock>
      <DetailsInvestmentHeading>
        {t("follow-details-page:current-investment.title")}
      </DetailsInvestmentHeading>
      <Row>
        <StatisticItemList>
          <InvestmentItem
            label={t("follow-details-page:current-investment.fields.profit")}
          >
            <NumberFormat
              value={formatCurrencyValue(
                subscriptionInfo.totalProfit,
                assetCurrency
              )}
              suffix={` ${assetCurrency}`}
              displayType="text"
            />
          </InvestmentItem>
          <InvestmentItem
            label={t("follow-details-page:current-investment.fields.status")}
          >
            {subscriptionInfo.status}
          </InvestmentItem>
          <InvestmentItem
            label={t("follow-details-page:current-investment.fields.type")}
          >
            <Tooltip
              render={() => (
                <TooltipContent>
                  {t(
                    `follow-program.modes.${subscriptionInfo.mode.toLowerCase()}.tooltip`
                  )}
                </TooltipContent>
              )}
            >
              {subscriptionInfo.mode}
            </Tooltip>
          </InvestmentItem>
          {!!subscriptionInfo.percent && (
            <InvestmentItem
              label={t("follow-details-page:current-investment.fields.percent")}
            >
              <NumberFormat
                value={subscriptionInfo.percent}
                suffix={` %`}
                displayType="text"
              />
            </InvestmentItem>
          )}
          {!!subscriptionInfo.openTolerancePercent && (
            <InvestmentItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "follow-program.params.tolerance-percent-tooltip"
                  )}
                  labelText={t(
                    "follow-details-page:current-investment.fields.percentage"
                  )}
                />
              }
            >
              <NumberFormat
                value={subscriptionInfo.openTolerancePercent}
                suffix={` %`}
                displayType="text"
              />
            </InvestmentItem>
          )}
          {!!subscriptionInfo.fixedVolume && (
            <InvestmentItem
              label={t(
                "follow-details-page:current-investment.fields.fixed-volume"
              )}
            >
              <NumberFormat
                value={subscriptionInfo.fixedVolume}
                suffix={` ${subscriptionInfo.fixedCurrency}`}
                displayType="text"
              />
            </InvestmentItem>
          )}
          {subscriptionInfo.volumeFeePersonal !== undefined &&
            subscriptionInfo.volumeFeePersonal !== null && (
              <InvestmentItem
                label={t(
                  "follow-details-page:current-investment.fields.volume-fee"
                )}
              >
                <NumberFormat
                  value={subscriptionInfo.volumeFeePersonal}
                  suffix={` %`}
                  displayType="text"
                />
              </InvestmentItem>
            )}
          {subscriptionInfo.successFeePersonal !== undefined &&
            subscriptionInfo.successFeePersonal !== null && (
              <InvestmentItem
                label={t(
                  "follow-details-page:current-investment.fields.success-fee"
                )}
              >
                <NumberFormat
                  value={subscriptionInfo.successFeePersonal}
                  suffix={` %`}
                  displayType="text"
                />
              </InvestmentItem>
            )}
        </StatisticItemList>
      </Row>
    </DetailsInvestmentBlock>
  );
};

interface Props {
  assetCurrency: CurrencyEnum;
  data: SignalSubscription;
  updateInfo: VoidFunction;
  id: string;
}

const Subscription = withBlurLoader(React.memo(_Subscription));
export default Subscription;
