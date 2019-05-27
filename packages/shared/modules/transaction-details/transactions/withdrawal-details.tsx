import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import TransactionAsset from "shared/modules/transaction-details/transactions/transaction-asset";
import { formatValue } from "shared/utils/formatter";

import { TRANSACTIONS_DECIMAL_SCALE } from "./transactions.constans";

const WithdrawalTransaction: React.FC<TransactionDetailsProps> = props => {
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>
            {t(
              `transactions-details.withdrawal.${
                data.programDetails.programType
              }`
            )}
          </p>
        </div>
        <StatisticItem
          label={t(
            `transactions-details.withdrawal.from-${
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
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.withdrawal.amount`)} big>
          <NumberFormat
            value={formatValue(data.amount, TRANSACTIONS_DECIMAL_SCALE)}
            suffix={` ${data.currency}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default WithdrawalTransaction;
