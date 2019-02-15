import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

import StatisticItem from "../../components/statistic-item/statistic-item";
import { formatCurrencyValue } from "../../utils/formatter";
import TransactionAsset from "./details-asset";

const InvestingTransaction = (props: {
  data: TransactionDetails;
  t(string: string): string;
}) => {
  const { data, t } = props;
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
          {data.status}
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.investment.amount`)} big>
          {formatCurrencyValue(data.amount, data.currency)} {data.currency}
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default InvestingTransaction;
