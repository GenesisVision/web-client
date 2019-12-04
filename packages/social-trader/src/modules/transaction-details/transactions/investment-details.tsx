import { DialogField } from "components/dialog/dialog-field";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import { TransactionDetailsProps } from "modules/transaction-details/transaction-details-dialog";
import TransactionAsset from "modules/transaction-details/transactions/transaction-asset";
import * as React from "react";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TransactionDetails from "./transaction-details";

/*const InvestingTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <TransactionDetails
    header={t(
      `transactions-details.investment.${data.programDetails.programType}`
    )}
    body={
      <StatisticItem
        label={t(
          `transactions-details.investment.to-${data.programDetails.programType}`
        )}
      >
        <TransactionAsset
          url={data.programDetails.logo}
          data={data.programDetails}
        />
      </StatisticItem>
    }
    bottom={
      <>
        <DialogField>
          <StatisticItem label={t(`transactions-details.entry-fee`)}>
            <NumberFormat
              value={data.programDetails.entryFeePercent}
              suffix="%"
              displayType="text"
            />
            <NumberFormat
              value={formatValue(
                data.programDetails.entryFee,
                DEFAULT_DECIMAL_SCALE
              )}
              prefix={" ("}
              suffix={` ${data.currency})`}
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
                data.gvCommissionCurrency
                  ? ` ${data.gvCommissionCurrency})`
                  : ")"
              }
              displayType="text"
            />
          </StatisticItem>
        </DialogField>
        <DialogField>
          <StatisticItem label={t(`transactions-details.status.title`)}>
            <div className="external-transaction__status">
              {data.status} <Status status={data.status} />
            </div>
          </StatisticItem>
        </DialogField>
        <DialogField>
          <StatisticItem
            label={t(`transactions-details.investment.amount`)}
            big
          >
            <NumberFormat
              value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
              suffix={` ${data.currency}`}
              displayType="text"
            />
          </StatisticItem>
        </DialogField>
      </>
    }
  />
);

export default InvestingTransaction;*/
