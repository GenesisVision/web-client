import ActionButton from "components/action-button/action-button";
import { CurrencyItem } from "components/currency-item/currency-item";
import { DialogField } from "components/dialog/dialog-field";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import { MultiWalletTransaction } from "components/wallet/wallet.types";
import {
  AmountItem,
  CurrencyItem as CurrencyItemType,
  MultiWalletTransactionStatus,
  TransactionAssetDetails,
  TransactionDetailItem
} from "gv-api-web";
import TransactionAsset from "modules/transaction-details/transactions/transaction-asset";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TransactionDetails from "./transaction-details";

const TransactionDetailsItemsBlock: React.FC<{
  items: TransactionDetailItem[];
}> = React.memo(({ items }) => {
  return (
    <>
      {items.map(item => (
        <TransactionDetailsItem item={item} />
      ))}
    </>
  );
});

const TransactionDetailsItem: React.FC<{
  item: TransactionDetailItem;
}> = React.memo(({ item: { details, title } }) => {
  return (
    <DialogField>
      <StatisticItem label={title}>{details}</StatisticItem>
    </DialogField>
  );
});

const TransactionStatusBlock: React.FC<{
  status: MultiWalletTransactionStatus;
}> = React.memo(({ status }) => {
  const [t] = useTranslation();
  return (
    <DialogField>
      <StatisticItem label={t(`transactions-details.status.title`)}>
        <div className="external-transaction__status">
          {status} <Status status={status} />
        </div>
      </StatisticItem>
    </DialogField>
  );
});

const TransactionAssetBlock: React.FC<{
  type: "investment" | "withdrawal";
  asset: TransactionAssetDetails;
}> = React.memo(({ asset, type }) => {
  const [t] = useTranslation();
  return (
    <DialogField>
      <StatisticItem
        label={t(
          `transactions-details.${type}.direction-${asset.assetType.toLowerCase()}`
        )}
      >
        <TransactionAsset url={asset.logo} data={asset} />
      </StatisticItem>
    </DialogField>
  );
});

const TransactionWalletBlock: React.FC<{
  direction: "from" | "to";
  wallet: CurrencyItemType;
  amount: AmountItem;
}> = React.memo(({ wallet, amount, direction }) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogField>
        <StatisticItem
          label={t(`transactions-details.external.${direction}-wallet`)}
        >
          <CurrencyItem
            logo={wallet.logo}
            name={wallet.currency}
            clickable={false}
          />
        </StatisticItem>
      </DialogField>
      <DialogField>
        <StatisticItem label={t(`transactions-details.amount`)}>
          <NumberFormat
            value={formatValue(amount.amount, DEFAULT_DECIMAL_SCALE)}
            suffix={` ${amount.currency}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
      </DialogField>
    </>
  );
});

const _CommonTransactionDetails: React.FC<Props> = ({
  data,
  handleCancel,
  handleResend
}) => {
  console.log(data);
  const [t] = useTranslation();
  return (
    <TransactionDetails
      header={data.description}
      body={
        <>
          {data.asset && (
            <TransactionAssetBlock asset={data.asset} type={"investment"} />
          )}
          <TransactionWalletBlock
            wallet={data.wallet.first}
            amount={data.amount.first}
            direction={"from"}
          />
        </>
      }
      bottom={
        <>
          {data.wallet.second && data.amount.second && (
            <TransactionWalletBlock
              wallet={data.wallet.second}
              amount={data.amount.second}
              direction={"to"}
            />
          )}
          <TransactionStatusBlock status={data.status} />
          {data.details && (
            <TransactionDetailsItemsBlock items={data.details} />
          )}
          {data.actions && (
            <DialogField>
              <div className="external-transaction__actions">
                {data.actions.canCancel && (
                  <ActionButton
                    onClick={handleCancel}
                    text={t("buttons.cancel")}
                  />
                )}
                {data.actions.canResend && (
                  <ActionButton
                    onClick={handleResend}
                    text={t("buttons.resend-email")}
                  />
                )}
              </div>
            </DialogField>
          )}
        </>
      }
    />
  );
};

interface Props {
  data: MultiWalletTransaction;
  handleCancel?: () => void;
  handleResend?: () => void;
}

const CommonTransactionDetails = React.memo(_CommonTransactionDetails);
export default CommonTransactionDetails;
