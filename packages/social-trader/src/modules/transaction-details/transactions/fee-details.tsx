import { CurrencyItem } from "components/currency-item/currency-item";
import { DialogField } from "components/dialog/dialog-field";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import { TransactionDetailsProps } from "modules/transaction-details/transaction-details-dialog";
import * as React from "react";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TransactionDetails from "./transaction-details";

/*const InvestingTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <TransactionDetails
    header={t(`transactions-details.platform-fee`)}
    body={
      <StatisticItem label={t(`transactions-details.external.from`)}>
        <CurrencyItem
          logo={data.currencyLogo}
          name={data.currencyName}
          clickable={false}
        />
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

export default InvestingTransaction;*/
