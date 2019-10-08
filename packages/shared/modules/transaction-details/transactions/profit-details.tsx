import * as React from "react";
import NumberFormat from "react-number-format";
import { DialogField } from "shared/components/dialog/dialog-field";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import TransactionAsset from "shared/modules/transaction-details/transactions/transaction-asset";
import { formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";

const ProfitDetails: React.FC<TransactionDetailsProps> = ({ data, t }) => (
  <TransactionDetails
    header={t(`transactions-details.profit`)}
    body={
      <StatisticItem label={`${data.programDetails.programType}`}>
        <TransactionAsset
          url={data.programDetails.logo}
          data={data.programDetails}
        />
      </StatisticItem>
    }
    bottom={
      <>
        <DialogField>
          <StatisticItem label={t(`transactions-details.success-fee`)}>
          <NumberFormat
            value={data.programDetails.successFeePercent}
            suffix="%"
            displayType="text"
          />
          <NumberFormat
            value={formatValue(
              data.programDetails.successFee,
              DEFAULT_DECIMAL_SCALE
            )}
            prefix={" ("}
            suffix={` ${data.programDetails.successFeeCurrency})`}
            displayType="text"
          />
        </StatisticItem>
        </DialogField>
        <DialogField>
          <StatisticItem label={t(`transactions-details.gv-fee`)}>
          <NumberFormat
            value={data.gvCommissionPercent}
            suffix="%"
            displayType="text"
          />
          <NumberFormat
            value={formatValue(data.gvCommission, DEFAULT_DECIMAL_SCALE)}
            prefix={" ("}
            suffix={
              data.gvCommissionCurrency ? ` ${data.gvCommissionCurrency})` : ")"
            }
            displayType="text"
          />
        </StatisticItem>
        </DialogField>
        <DialogField>
          <StatisticItem label={t("transactions-details.status.title")}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        </DialogField>
        <DialogField>
          <StatisticItem label={t(`transactions-details.external.amount`)} big>
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

export default ProfitDetails;
