import { Center } from "components/center/center";
import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { CancelRequestButton } from "components/request-line/cancel-request-button";
import { RowItem } from "components/row-item/row-item";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { localizedDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./request-line.module.scss";

const _RequestLine: React.FC<Props> = ({
  request: { assetDetails, type, amount, currency, date, canCancelRequest, id },
  onApplyCancelRequest
}) => {
  const {
    title,
    successFee,
    entryFee,
    exitFee,
    managementFee,
    assetType
  } = assetDetails;
  const [t] = useTranslation();
  return (
    <Center className={styles["request-line"]}>
      <RowItem small>
        <PortfolioEventLogo withAsset assetDetails={assetDetails} icon={""} />
      </RowItem>
      <RowItem large>
        <StatisticItemList className={styles["request-line__values"]}>
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
          {assetType === "Fund" ? (
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
          ) : (
            <StatisticItem
              condition={managementFee !== null}
              label={
                <NumberFormat
                  value={managementFee}
                  suffix={` %`}
                  allowNegative={false}
                  displayType="text"
                />
              }
              invert
            >
              {t("program-details-page.description.management-fee")}
            </StatisticItem>
          )}
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
      </RowItem>
      {canCancelRequest && (
        <RowItem>
          <CancelRequestButton
            onApplyCancelRequest={onApplyCancelRequest}
            id={id}
          />
        </RowItem>
      )}
    </Center>
  );
};

interface Props {
  request: AssetInvestmentRequest;
  onApplyCancelRequest: () => void;
}

const RequestLine = React.memo(_RequestLine);
export default RequestLine;
