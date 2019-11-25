import { DialogField } from "components/dialog/dialog-field";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import useRole from "hooks/use-role.hook";
import { TransactionDetailsProps } from "modules/transaction-details/transaction-details-dialog";
import TransactionAsset from "modules/transaction-details/transactions/transaction-asset";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE, ROLE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TransactionDetails from "./transaction-details";

type SignalFee = any; // TOD declare type

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
/*
const _SignalTransaction: React.FC<TransactionDetailsProps> = ({ data }) => {
  const [t] = useTranslation();
  const role = useRole();
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
const SignalTransaction = React.memo(_SignalTransaction);
export default SignalTransaction;*/
