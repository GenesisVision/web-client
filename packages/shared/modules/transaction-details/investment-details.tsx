import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import TransactionAsset from "shared/modules/transaction-details/details-asset";
import { ITransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import { formatCurrencyValue } from "shared/utils/formatter";

const InvestingTransaction = (props: ITransactionDetailsProps) => {
  const { data, t, handleCancel, handleResend } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>
            {t(
              `transactions-details.investment.${
                data.programDetails.programType
              }`
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
          <TransactionAsset data={data.programDetails} />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.entry-fee`)}>
          {data.programDetails.entryFeePercent} %
          <NumberFormat
            value={formatCurrencyValue(
              data.programDetails.entryFee,
              data.currency
            )}
            prefix={" ("}
            suffix={` ${data.currency})`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.gv-fee`)}>
          {data.gvCommissionPercent} %
          <NumberFormat
            value={formatCurrencyValue(data.gvCommission, data.currency)}
            prefix={" ("}
            suffix={` ${data.currency})`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        <div className="external-transaction__actions">
          <div className="action-button" onClick={handleCancel}>
            Cancel
          </div>
          <div className="action-button" onClick={handleResend}>
            Resend email
          </div>
        </div>
        <StatisticItem label={t(`transactions-details.investment.amount`)} big>
          {formatCurrencyValue(data.amount, data.currency)} {data.currency}
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default InvestingTransaction;
