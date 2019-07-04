import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import TransactionAsset from "shared/modules/transaction-details/transactions/transaction-asset";
import { formatValue } from "shared/utils/formatter";

const InvestingTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <>
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t(`transactions-details.title`)}</h2>
        <p>
          {t(
            `transactions-details.investment.${data.programDetails.programType}`
          )}
        </p>
      </div>
      <StatisticItem
        label={t(
          `transactions-details.investment.to-${
            data.programDetails.programType
          }`
        )}
      >
        <TransactionAsset
          url={data.programDetails.logo}
          data={data.programDetails}
        />
      </StatisticItem>
    </div>
    <div className="dialog__bottom">
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
      <StatisticItem label={t(`transactions-details.status.title`)}>
        <div className="external-transaction__status">
          {data.status} <Status status={data.status} />
        </div>
      </StatisticItem>
      <StatisticItem label={t(`transactions-details.investment.amount`)} big>
        <NumberFormat
          value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
          suffix={` ${data.currency}`}
          displayType="text"
        />
      </StatisticItem>
    </div>
  </>
);

export default InvestingTransaction;
