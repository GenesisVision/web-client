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

const ExternalDeposit: React.FC<TransactionDetailsProps> = ({ data }) => {
  const [t] = useTranslation();
  const copy = useCopy();
  return (
    <TransactionDetails
      header={t(`transactions-details.deposit`)}
      body={
        <StatisticItem label={t(`transactions-details.external.from`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img src={ArrowIcon} alt={"external deposit"} />
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
      }
      bottom={
        <>
          <DialogField>
            <StatisticItem label={t(`transactions-details.status.title`)}>
              <div className="external-transaction__status">
                {data.status} {data.externalTransactionDetails.description}{" "}
                <Status status={data.status} />
              </div>
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
    />
  );
};

export default ExternalDeposit;
