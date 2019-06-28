import { SignalFee } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import TransactionAsset from "shared/modules/transaction-details/transactions/transaction-asset";
import { formatValue } from "shared/utils/formatter";

import { TRANSACTIONS_DECIMAL_SCALE } from "./transactions.constants";

const SignalFees: React.ComponentType<
  SignalFeesProps & WithLoaderProps
> = withLoader(({ fees }) => {
  return (
    <>
      {fees.map((x, idx) => (
        <StatisticItem label={x.title} key={idx}>
          <NumberFormat
            value={formatValue(x.value, TRANSACTIONS_DECIMAL_SCALE)}
            suffix={` ${x.currency}`}
            displayType="text"
          />
        </StatisticItem>
      ))}
    </>
  );
});

interface SignalFeesProps {
  fees: SignalFee[];
}

const _SignalTransaction: React.FC<TransactionDetailsProps & WithRoleProps> = ({
  t,
  data,
  role
}) => {
  const details = data.programDetails;
  const transactionDirectionLabel =
    role === ROLE.INVESTOR
      ? t("transactions-details.signal.to-signal-provider")
      : t("transactions-details.signal.from-signal-provider");
  return (
    <>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t(`transactions-details.signal.${data.type}`)}</p>
        </div>
        <StatisticItem condition={!!details} label={transactionDirectionLabel}>
          <TransactionAsset url={details ? details.logo : ""} data={details} />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <SignalFees
          condition={data.signalFees !== null}
          fees={data.signalFees!}
        />
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.signal.amount`)} big>
          <NumberFormat
            value={formatValue(data.amount, TRANSACTIONS_DECIMAL_SCALE)}
            suffix={data.currency}
            displayType="text"
          />
        </StatisticItem>
      </div>
    </>
  );
};
const SignalTransaction = compose<React.ComponentType<TransactionDetailsProps>>(
  React.memo,
  withRole
)(_SignalTransaction);
export default SignalTransaction;
