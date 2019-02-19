import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TransactionAsset from "shared/modules/transaction-details/details-asset";
import { ITransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import { formatCurrencyValue } from "shared/utils/formatter";

const OpenCloseTransaction = (props: ITransactionDetailsProps) => {
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>
            {t(
              `transactions-details.${data.type}.${
                data.programDetails.programType
              }`
            )}
          </p>
        </div>
        <StatisticItem
          label={t(`transactions-details.${data.programDetails.programType}`)}
        >
          <TransactionAsset data={data.programDetails} />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.status.title`)}>
          {data.status}
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.investment.amount`)} big>
          <NumberFormat
            value={formatCurrencyValue(data.amount, data.currency)}
            suffix={` ${data.currency}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default OpenCloseTransaction;
