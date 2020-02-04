import "./request-line.scss";

import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { CancelRequestButton } from "components/request-line/cancel-request-button";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { localizedDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

const _RequestLine: React.FC<Props> = ({
  request: { assetDetails, type, amount, currency, date, canCancelRequest, id },
  onApplyCancelRequest
}) => {
  const { title, successFee, entryFee, exitFee } = assetDetails;
  const [t] = useTranslation();
  return (
    <div className="request-line">
      <div className="request-line__logo">
        <PortfolioEventLogo withAsset assetDetails={assetDetails} icon={""} />
      </div>
      <StatisticItemList className="request-line__values">
        <StatisticItem label={title} invert accent>
          {type}
        </StatisticItem>
        <StatisticItem
          label={
            assetDetails.isWithdrawAll ? (
              t("withdraw-program.withdrawing-all")
            ) : (
              <NumberFormat
                value={formatCurrencyValue(amount, currency)}
                decimalScale={8}
                displayType="text"
                allowNegative={false}
                suffix={` ${currency}`}
              />
            )
          }
          invert
        >
          {localizedDate(date)}
        </StatisticItem>
        <StatisticItem
          condition={successFee !== null}
          label={
            <NumberFormat
              value={successFee}
              suffix={` %`}
              allowNegative={false}
              displayType="text"
            />
          }
          invert
        >
          {t("program-details-page.description.successFee")}
        </StatisticItem>
        <StatisticItem
          condition={entryFee !== null}
          label={
            <NumberFormat
              value={entryFee}
              suffix={` %`}
              allowNegative={false}
              displayType="text"
            />
          }
          invert
        >
          {t("fund-details-page.description.entryFee")}
        </StatisticItem>
        <StatisticItem
          condition={exitFee !== null}
          label={
            <NumberFormat
              value={exitFee}
              suffix={` %`}
              allowNegative={false}
              displayType="text"
            />
          }
          invert
        >
          {t("fund-details-page.description.exitFee")}
        </StatisticItem>
      </StatisticItemList>
      {canCancelRequest && (
        <CancelRequestButton
          onApplyCancelRequest={onApplyCancelRequest}
          id={id}
        />
      )}
    </div>
  );
};

interface Props {
  request: AssetInvestmentRequest;
  onApplyCancelRequest: () => void;
}

const RequestLine = React.memo(_RequestLine);
export default RequestLine;
