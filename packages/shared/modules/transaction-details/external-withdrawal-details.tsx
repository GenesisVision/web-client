import copy from "copy-to-clipboard";
import { GVButton } from "gv-react-components";
import * as React from "react";
import NumberFormat from "react-number-format";

import CopyIcon from "../../components/icon/copy-icon";
import Profitability from "../../components/profitability/profitability";
import StatisticItem from "../../components/statistic-item/statistic-item";
import filesService from "../../services/file-service";
import { formatCurrencyValue } from "../../utils/formatter";
import ArrowIcon from "shared/media/arrow-up-thin.svg";
import { ITransactionDetailsProps } from "./transaction-details";

const ExternalWithdrawal = (props: ITransactionDetailsProps) => {
  const onCopy = () => {
    try {
      copy(data.externalTransactionDetails.fromAddress); // add notifications
    } catch (error) {}
  };
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t(`transactions-details.withdrawal.title`)}</p>
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
        <StatisticItem label={t(`transactions-details.external.amount`)} big>
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
        <StatisticItem label={t(`transactions-details.external.to`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img src={ArrowIcon} alt={"external withdrawal"} />
              </div>
            </div>
            <div className="external-transaction__address">
              {data.externalTransactionDetails.fromAddress}
              <GVButton color="secondary" onClick={onCopy} variant="text">
                <CopyIcon primary />
                &nbsp;
                {t("buttons.copy")}
              </GVButton>
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.status.title`)}>
          {data.status} {data.externalTransactionDetails.description}
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ExternalWithdrawal;
