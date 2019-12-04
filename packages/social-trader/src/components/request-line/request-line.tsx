import "./request-line.scss";

import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { CancelRequestButton } from "components/request-line/cancel-request-button";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { ASSET } from "shared/constants/constants";
import { localizedDate } from "shared/utils/dates";
import { formatCurrencyValue } from "utils/formatter";

const _RequestLine: React.FC<Props> = ({
                                         successFee,
                                         exitFee,
                                         request,
                                         onApplyCancelRequest
                                       }) => {
  const [t] = useTranslation();
  return (
    <div className="request-line">
      <div className="request-line__logo">
        <PortfolioEventLogo assetDetails={request.assetDetails} icon={""} />
      </div>
      <StatisticItemList className="request-line__values">
        <StatisticItem label={request.assetDetails.title} invert accent>
          {request.type}
        </StatisticItem>
        <StatisticItem
          label={
            request.assetDetails.isWithdrawAll ? (
              t("withdraw-program.withdrawing-all")
            ) : (
              <NumberFormat
                value={formatCurrencyValue(request.amount, request.currency)}
                decimalScale={8}
                displayType="text"
                allowNegative={false}
                suffix={` ${request.currency}`}
              />
            )
          }
          invert
        >
          {localizedDate(request.date)}
        </StatisticItem>
        <StatisticItem
          condition={successFee !== null && successFee !== undefined}
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
          label={
            <NumberFormat
              value={request.assetDetails.entryFee}
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
          condition={exitFee !== null && exitFee !== undefined}
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
      {request.canCancelRequest && (
        <CancelRequestButton
          onApplyCancelRequest={onApplyCancelRequest}
          id={request.id}
        />
      )}
    </div>
  );
};

interface Props {
  successFee?: number;
  exitFee?: number;
  request: AssetInvestmentRequest;
  onApplyCancelRequest: () => void;
  asset?: ASSET;
}

const RequestLine = React.memo(_RequestLine);
export default RequestLine;
