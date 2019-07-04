import * as React from "react";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import filesService from "shared/services/file-service";
import { formatValue } from "shared/utils/formatter";

const InvestingTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <>
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t(`transactions-details.title`)}</h2>
        <p>{t(`transactions-details.platform-fee`)}</p>
      </div>
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
    </div>
    <div className="dialog__bottom">
      <StatisticItem label={t(`transactions-details.status.title`)}>
        <div className="external-transaction__status">
          {data.status} <Status status={data.status} />
        </div>
      </StatisticItem>
      <StatisticItem label={t(`transactions-details.investment.amount`)} big>
        {formatValue(data.amount, DEFAULT_DECIMAL_SCALE)} {data.currency}
      </StatisticItem>
    </div>
  </>
);

export default InvestingTransaction;
