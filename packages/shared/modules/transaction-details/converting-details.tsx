import { TransactionDetails } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

import Profitability from "../../components/profitability/profitability";
import StatisticItem from "../../components/statistic-item/statistic-item";
import filesService from "../../services/file-service";
import { formatCurrencyValue } from "../../utils/formatter";

const ConvertingDetails = (props: { data: TransactionDetails }) => {
  const { data } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>Transaction Details</h2>
          <p>Converting</p>
        </div>
        <StatisticItem label={`From`}>
          <img src={filesService.getFileUrl(data.currencyLogo)} alt="wallet" />
          <p>{data.currencyName}</p>
        </StatisticItem>
        <StatisticItem label={`Amount`}>
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
      <div className="dialog__bottom">
        <StatisticItem label={`From`}>
          <img
            src={filesService.getFileUrl(data.convertingDetails.currencyToLogo)}
            alt="wallet"
          />
          <p>{data.convertingDetails.currencyToName}</p>
        </StatisticItem>
        <StatisticItem label={`Amount`}>
          <Profitability value={data.convertingDetails.amountTo} prefix="sign">
            <NumberFormat
              value={formatCurrencyValue(
                data.convertingDetails.amountTo,
                data.convertingDetails.currencyTo
              )}
              suffix={` ${data.convertingDetails.currencyTo}`}
              allowNegative={false}
              displayType="text"
            />
          </Profitability>
        </StatisticItem>
        <StatisticItem label={"Status"}>{data.status}</StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ConvertingDetails;
