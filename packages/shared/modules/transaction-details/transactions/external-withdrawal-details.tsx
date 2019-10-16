import * as React from "react";
import NumberFormat from "react-number-format";
import ActionButton from "shared/components/action-button/action-button";
import { CurrencyItem } from "shared/components/currency-item/currency-item";
import { DialogField } from "shared/components/dialog/dialog-field";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import Copy from "shared/decorators/with-copy";
import ArrowIcon from "shared/media/arrow-up-thin.svg";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import { formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";

const ExternalWithdrawal: React.FC<TransactionDetailsProps> = ({
  data,
  t,
  handleCancel,
  handleResend
}) => (
  <TransactionDetails
    header={t(`transactions-details.withdrawal.title`)}
    body={
      <>
        <DialogField>
          <StatisticItem label={t(`transactions-details.external.from-wallet`)}>
            <CurrencyItem logo={data.currencyLogo} name={data.currencyName} />
          </StatisticItem>
        </DialogField>
        <DialogField>
          <StatisticItem label={t(`transactions-details.external.amount`)} big>
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
              <ActionButton onClick={handleCancel} text={t("buttons.cancel")} />
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

export default ExternalWithdrawal;
