import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

import Profitability from "../../components/profitability/profitability";
import StatisticItem from "../../components/statistic-item/statistic-item";
import { formatCurrencyValue } from "../../utils/formatter";
import TransactionAsset from "./details-asset";

const InvestingTransaction = (props: { data: TransactionDetails }) => {
  const { data } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>Transaction Details</h2>
          <p>{`${data.programDetails.programType}`} investment</p>
        </div>
      </div>
      <div className="dialog__bottom">
        <StatisticItem
          label={`To the ${data.programDetails.programType.toLowerCase()}`}
        >
          <TransactionAsset data={data.programDetails} />
        </StatisticItem>
        <StatisticItem label={"Entry fee"}>
          {data.programDetails.entryFeePercent} %
          <NumberFormat
            value={formatCurrencyValue(data.programDetails.entryFee, "BTC")}
            prefix={" ("}
            suffix={" BTC)"}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={"GV Commission"}>
          {data.gvCommissionPercent} %
          <NumberFormat
            value={formatCurrencyValue(data.gvCommission, "BTC")}
            prefix={" ("}
            suffix={" BTC)"}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={"Status"}>{data.status}</StatisticItem>
        <StatisticItem label={"Investment amount"} big>
          <Profitability value={data.amount} prefix="sign">
            <NumberFormat
              value={formatCurrencyValue(data.amount, "BTC")}
              suffix=" BTC"
              allowNegative={false}
              displayType="text"
            />
          </Profitability>
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default InvestingTransaction;
