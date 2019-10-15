import * as React from "react";
import { DialogField } from "shared/components/dialog/dialog-field";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import { formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";
import { WalletItem } from "shared/components/wallet/components/wallet-item/wallet-item";

const InvestingTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <TransactionDetails
    header={t(`transactions-details.platform-fee`)}
    body={
      <StatisticItem label={t(`transactions-details.external.from`)}>
        <WalletItem logo={data.currencyLogo} name={data.currencyName} />
      </StatisticItem>
    }
    bottom={
      <>
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
            {formatValue(data.amount, DEFAULT_DECIMAL_SCALE)} {data.currency}
          </StatisticItem>
        </DialogField>
      </>
    }
  />
);

export default InvestingTransaction;
