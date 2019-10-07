import * as React from "react";
import { DialogField } from "shared/components/dialog/dialog-field";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import filesService from "shared/services/file-service";
import { formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";

const InvestingTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <TransactionDetails
    header={t(`transactions-details.platform-fee`)}
    body={
      <StatisticItem label={t(`transactions-details.external.from`)}>
        <div className="external-transaction">
          <div className="external-transaction__icon">
            <div className="profile-avatar">
              <img
                className="external-transaction__wallet"
                src={filesService.getFileUrl(data.currencyLogo)}
                alt="wallet"
              />
            </div>
          </div>
          <div className="external-transaction__address">
            {data.currencyName}
          </div>
        </div>
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
          <StatisticItem label={t(`transactions-details.investment.amount`)} big>
          {formatValue(data.amount, DEFAULT_DECIMAL_SCALE)} {data.currency}
        </StatisticItem>
        </DialogField>
      </>
    }
  />
);

export default InvestingTransaction;
