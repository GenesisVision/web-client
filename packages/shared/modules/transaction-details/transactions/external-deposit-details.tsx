import * as React from "react";
import NumberFormat from "react-number-format";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import Copy from "shared/decorators/with-copy";
import ArrowIcon from "shared/media/arrow-up-thin.svg";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import { formatCurrencyValue } from "shared/utils/formatter";

const ExternalDeposit: React.FC<TransactionDetailsProps> = props => {
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
              <Copy>
                {({ copy }) => (
                  <GVButton
                    color="secondary"
                    onClick={() =>
                      copy(data.externalTransactionDetails.fromAddress)
                    }
                    variant="text"
                  >
                    <React.Fragment>
                      <CopyIcon primary />
                      &nbsp;
                      {t("buttons.copy")}
                    </React.Fragment>
                  </GVButton>
                )}
              </Copy>
            </div>
          </div>
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} {data.externalTransactionDetails.description}{" "}
            <Status status={data.status} />
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

export default ExternalDeposit;
