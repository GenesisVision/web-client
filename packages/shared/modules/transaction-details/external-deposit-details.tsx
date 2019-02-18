import copy from "copy-to-clipboard";
import { GVButton } from "gv-react-components";
import * as React from "react";
import NumberFormat from "react-number-format";
import ArrowIcon from "shared/media/arrow-up-thin.svg";

import CopyIcon from "../../components/icon/copy-icon";
import Profitability from "../../components/profitability/profitability";
import StatisticItem from "../../components/statistic-item/statistic-item";
import { formatCurrencyValue } from "../../utils/formatter";
import { ITransactionDetailsProps } from "./transaction-details";

const ExternalDeposit = (props: ITransactionDetailsProps) => {
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
          <p>{t(`transactions-details.deposit`)}</p>
        </div>
        <StatisticItem label={t(`transactions-details.external.from`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img src={ArrowIcon} alt={"external deposit"} />
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
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.status.title`)}>
          {data.status} {data.externalTransactionDetails.description}
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

export default ExternalDeposit;
