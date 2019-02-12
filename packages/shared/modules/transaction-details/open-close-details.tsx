import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

import Profitability from "../../components/profitability/profitability";
import StatisticItem from "../../components/statistic-item/statistic-item";
import { formatCurrencyValue } from "../../utils/formatter";
import TransactionAsset from "./details-asset";

const OpenCloseTransaction = (props: { data: TransactionDetails }) => {
  const { data } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>Transaction Details</h2>
          <p>
            {`${data.type}`}{" "}
            {`${data.programDetails.programType.toLowerCase()}`}
          </p>
        </div>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={`${data.programDetails.programType}`}>
          <TransactionAsset data={data.programDetails} />
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

export default OpenCloseTransaction;
