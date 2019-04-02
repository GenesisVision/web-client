import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import TransactionAsset from "shared/modules/transaction-details/details-asset";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const DECIMAL_SCALE = 8;

const ProfitDetails = (props: TransactionDetailsProps) => {
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t(`transactions-details.profit`)}</p>
        </div>
        <StatisticItem label={`${data.programDetails.programType}`}>
          <TransactionAsset data={data.programDetails} />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.success-fee`)}>
          <NumberFormat
            value={data.programDetails.successFeePercent}
            suffix="%"
            displayType="text"
          />
          <NumberFormat
            value={formatValue(data.programDetails.successFee, DECIMAL_SCALE)}
            prefix={" ("}
            suffix={` ${data.currency})`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.gv-fee`)}>
          <NumberFormat
            value={data.gvCommissionPercent}
            suffix="%"
            displayType="text"
          />
          <NumberFormat
            value={formatValue(data.gvCommission, DECIMAL_SCALE)}
            prefix={" ("}
            suffix={
              data.gvCommissionCurrency ? ` ${data.gvCommissionCurrency})` : ")"
            }
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t("transactions-details.status.title")}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.external.amount`)} big>
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

export default ProfitDetails;
