import { DialogField } from "components/dialog/dialog-field";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import ArrowIcon from "media/arrow-up-thin.svg";
import CopyButton from "modules/copy-button/copy-button";
import { TransactionDetailsProps } from "modules/transaction-details/transaction-details-dialog";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TransactionDetails from "./transaction-details";
/*
const ExternalDeposit: React.FC<TransactionDetailsProps> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <TransactionDetails
      header={t(`transactions-details.deposit`)}
      body={
        <StatisticItem label={t(`transactions-details.external.from`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img src={ArrowIcon} alt={"external deposit"} />
              </div>
            </div>
            <div className="external-transaction__address">
              {data.externalTransactionDetails.fromAddress}
              <CopyButton
                text
                value={data.externalTransactionDetails.fromAddress}
              />
            </div>
          </div>
        </StatisticItem>
      }
      bottom={
        <>
          <DialogField>
            <StatisticItem label={t(`transactions-details.status.title`)}>
              <div className="external-transaction__status">
                {data.status} {data.externalTransactionDetails.description}{" "}
                <Status status={data.status} />
              </div>
            </StatisticItem>
          </DialogField>
          <DialogField>
            <StatisticItem
              label={t(`transactions-details.external.amount`)}
              big
            >
              <NumberFormat
                value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
                suffix={` ${data.currency}`}
                allowNegative={true}
                displayType="text"
              />
            </StatisticItem>
          </DialogField>
        </>
      }
    />
  );
};

export default ExternalDeposit;*/
