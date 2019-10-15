import * as React from "react";
import NumberFormat from "react-number-format";
import { DialogField } from "shared/components/dialog/dialog-field";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import filesService from "shared/services/file-service";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";

const ConvertingDetails: React.FC<TransactionDetailsProps> = ({ data, t }) => (
  <TransactionDetails
    header={t("transactions-details.converting.title")}
    body={
      <div className="transaction-details__top">
        <DialogField>
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
        </DialogField>
        <DialogField>
          <StatisticItem label={t("transactions-details.converting.from")}>
            <NumberFormat
              value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
              suffix={` ${data.currency}`}
              allowNegative={true}
              displayType="text"
            />
          </StatisticItem>
        </DialogField>
      </div>
    }
    bottom={
      <>
        <DialogField>
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
        </DialogField>
        <DialogField>
          <StatisticItem label={t("transactions-details.converting.to")}>
            <NumberFormat
              value={formatValue(
                data.convertingDetails.amountTo,
                DEFAULT_DECIMAL_SCALE
              )}
              suffix={` ${data.convertingDetails.currencyTo}`}
              allowNegative={true}
              displayType="text"
            />
          </StatisticItem>
        </DialogField>
        <DialogField>
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
        </DialogField>
        <DialogField>
          <StatisticItem label={t(`transactions-details.status.title`)}>
            <div className="external-transaction__status">
              {data.status} <Status status={data.status} />
            </div>
          </StatisticItem>
        </DialogField>
      </>
    }
  />
);

export default ConvertingDetails;
