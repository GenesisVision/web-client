import * as React from "react";
import NumberFormat from "react-number-format";

import StatisticItem from "../../components/statistic-item/statistic-item";
import filesService from "../../services/file-service";
import { formatCurrencyValue } from "../../utils/formatter";
import { ITransactionDetailsProps } from "./transaction-details";

const ConvertingDetails = (props: ITransactionDetailsProps) => {
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t("transactions-details.converting")}</p>
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
              <p>{data.currencyName}</p>
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.external.amount`)}>
          <NumberFormat
            value={formatCurrencyValue(data.amount, data.currency)}
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
              <p>{data.convertingDetails.currencyToName}</p>
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.external.amount`)}>
          <NumberFormat
            value={formatCurrencyValue(
              data.convertingDetails.amountTo,
              data.convertingDetails.currencyTo
            )}
            suffix={` ${data.convertingDetails.currencyTo}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.status.title`)}>
          {data.status}
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ConvertingDetails;
