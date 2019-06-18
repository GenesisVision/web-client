import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import filesService from "shared/services/file-service";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import { TRANSACTIONS_DECIMAL_SCALE } from "./transactions.constants";

const ConvertingDetails: React.FC<TransactionDetailsProps> = props => {
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t("transactions-details.converting.title")}</p>
        </div>
        <StatisticItem label={t(`transactions-details.external.from-wallet`)}>
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
        <StatisticItem label={t("transactions-details.converting.from")}>
          <NumberFormat
            value={formatValue(data.amount, TRANSACTIONS_DECIMAL_SCALE)}
            suffix={` ${data.currency}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.external.to-wallet`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img
                  className="external-transaction__wallet"
                  src={filesService.getFileUrl(
                    data.convertingDetails.currencyToLogo
                  )}
                  alt="wallet"
                />
              </div>
            </div>
            <div className="external-transaction__address">
              {data.convertingDetails.currencyToName}
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t("transactions-details.converting.to")}>
          <NumberFormat
            value={formatValue(
              data.convertingDetails.amountTo,
              TRANSACTIONS_DECIMAL_SCALE
            )}
            suffix={` ${data.convertingDetails.currencyTo}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={"   "} className={"external-transaction__rate"}>
          <NumberFormat
            value={1}
            suffix={` ${data.currency} = `}
            allowNegative={true}
            displayType="text"
          />
          <NumberFormat
            value={formatCurrencyValue(
              data.convertingDetails.rateValue,
              data.convertingDetails.currencyTo
            )}
            suffix={` ${data.convertingDetails.currencyTo}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ConvertingDetails;
