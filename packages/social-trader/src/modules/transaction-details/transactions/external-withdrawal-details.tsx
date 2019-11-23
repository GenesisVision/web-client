import ActionButton from "components/action-button/action-button";
import { CurrencyItem } from "components/currency-item/currency-item";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import CopyIcon from "components/icon/copy-icon";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import useCopy from "hooks/copy.hook";
import ArrowIcon from "media/arrow-up-thin.svg";
import { TransactionDetailsProps } from "modules/transaction-details/transaction-details-dialog";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TransactionDetails from "./transaction-details";

const ExternalWithdrawal: React.FC<TransactionDetailsProps> = ({
  data,
  handleCancel,
  handleResend
}) => {
  const [t] = useTranslation();
  const copy = useCopy();
  return (
    <TransactionDetails
      header={t(`transactions-details.withdrawal.title`)}
      body={
        <>
          <DialogField>
            <StatisticItem
              label={t(`transactions-details.external.from-wallet`)}
            >
              <CurrencyItem
                logo={data.currencyLogo}
                name={data.currencyName}
                clickable={false}
              />
            </StatisticItem>
          </DialogField>
          <DialogField>
            <StatisticItem
              label={t(`transactions-details.external.amount`)}
              big
            >
              <NumberFormat
                value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
                suffix={` ${data.currency}`}
                allowNegative={true}
                displayType="text"
              />
            </StatisticItem>
          </DialogField>
        </>
      }
      bottom={
        <>
          <DialogField>
            <StatisticItem label={t(`transactions-details.external.to`)}>
              <div className="external-transaction">
                <div className="external-transaction__icon">
                  <div className="profile-avatar">
                    <img src={ArrowIcon} alt={"external withdrawal"} />
                  </div>
                </div>
                <div className="external-transaction__address">
                  {data.externalTransactionDetails.fromAddress}
                  <GVButton
                    color="secondary"
                    onClick={() =>
                      copy(data.externalTransactionDetails.fromAddress)
                    }
                    variant="text"
                  >
                    <>
                      <CopyIcon primary />
                      &nbsp;
                      {t("buttons.copy")}
                    </>
                  </GVButton>
                </div>
              </div>
            </StatisticItem>
          </DialogField>
          <DialogField>
            <StatisticItem label={t(`transactions-details.status.title`)}>
              <div className="external-transaction__status">
                {data.status} {data.externalTransactionDetails.description}{" "}
                <Status status={data.status} />
              </div>{" "}
            </StatisticItem>
          </DialogField>
          {data.externalTransactionDetails.isEnableActions && (
            <DialogField>
              <div className="external-transaction__actions">
                <ActionButton
                  onClick={handleCancel}
                  text={t("buttons.cancel")}
                />
                <ActionButton
                  onClick={handleResend}
                  text={t("buttons.resend-email")}
                />
              </div>
            </DialogField>
          )}
        </>
      }
    />
  );
};

export default ExternalWithdrawal;
