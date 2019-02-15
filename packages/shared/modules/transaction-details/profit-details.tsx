import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

import Profitability from "../../components/profitability/profitability";
import StatisticItem from "../../components/statistic-item/statistic-item";
import { formatCurrencyValue } from "../../utils/formatter";
import TransactionAsset from "./details-asset";

const ProfitDetails = (props: { data: TransactionDetails }) => {
  const { data } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>Transaction Details</h2>
          <p>Profit program</p>
        </div>
        <StatisticItem label={`${data.programDetails.programType}`}>
          <TransactionAsset data={data.programDetails} />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={"Success fee"}>
          {data.programDetails.successFeePercent}% (
          {data.programDetails.successFee} {data.currency})
        </StatisticItem>
        <StatisticItem label={"GV commission"}>
          {data.gvCommissionPercent}% ({data.gvCommission} {data.currency})
        </StatisticItem>
        <StatisticItem label={"Status"}>{data.status}</StatisticItem>
        <StatisticItem label={"Amount"} big>
          <Profitability value={data.amount} prefix="sign">
            <NumberFormat
              value={formatCurrencyValue(data.amount, data.currency)}
              suffix={` ${data.currency}`}
              allowNegative={false}
              displayType="text"
            />
          </Profitability>
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ProfitDetails;
