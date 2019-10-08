import { SignalFee } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { DialogField } from "shared/components/dialog/dialog-field";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE, ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import TransactionAsset from "shared/modules/transaction-details/transactions/transaction-asset";
import { formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";

const SignalFees: React.ComponentType<
  SignalFeesProps & WithLoaderProps
> = withLoader(({ fees }) => (
  <>
    {fees.map((x, idx) => (
      <DialogField>
        <StatisticItem label={x.title} key={idx}>
          <NumberFormat
            value={formatValue(x.value, DEFAULT_DECIMAL_SCALE)}
            suffix={` ${x.currency}`}
            displayType="text"
          />
        </StatisticItem>
      </DialogField>
    ))}
  </>
));

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
      : t("transactions-details.signal.signal-provider");
  return (
    <TransactionDetails
      header={t(`transactions-details.signal.${data.type}`)}
      body={
        <StatisticItem condition={!!details} label={transactionDirectionLabel}>
          <TransactionAsset url={details ? details.logo : ""} data={details} />
        </StatisticItem>
      }
      bottom={
        <>
          <SignalFees
            condition={data.signalFees !== null}
            fees={data.signalFees!}
          />
          <DialogField>
            <StatisticItem label={t(`transactions-details.status.title`)}>
              <div className="external-transaction__status">
                {data.status} <Status status={data.status} />
              </div>
            </StatisticItem>
          </DialogField>
          <DialogField>
            <StatisticItem label={t(`transactions-details.signal.amount`)} big>
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
};
const SignalTransaction = compose<React.ComponentType<TransactionDetailsProps>>(
  React.memo,
  withRole
)(_SignalTransaction);
export default SignalTransaction;
