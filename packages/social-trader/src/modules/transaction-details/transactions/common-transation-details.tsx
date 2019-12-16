import ActionButton from "components/action-button/action-button";
import { CurrencyItem } from "components/currency-item/currency-item";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import AmountConvert from "components/wallet/components/wallet-tables/wallet-transactions/amount-convert";
import WalletConvert from "components/wallet/components/wallet-tables/wallet-transactions/wallet-convert";
import { MultiWalletTransaction } from "components/wallet/wallet.types";
import {
  AmountRowCell,
  MultiWalletTransactionStatus,
  TransactionAssetDetails,
  TransactionDetailItem
} from "gv-api-web";
import AmountItem from "modules/transaction-details/transactions/amount-item";
import TransactionAsset from "modules/transaction-details/transactions/transaction-asset";
import * as React from "react";
import { useTranslation } from "react-i18next";

const TransactionDetailsItemsBlock: React.FC<{
  items: TransactionDetailItem[];
}> = React.memo(({ items }) => {
  return (
    <>
      {items.map(({ details, title }) => (
        <TransactionDetailsItem label={title}>{details}</TransactionDetailsItem>
      ))}
    </>
  );
});

const TransactionDetailsItem: React.FC<
  {
    label: string;
  } & React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ label, children }) => {
  return (
    <DialogField>
      <StatisticItem label={label}>{children}</StatisticItem>
    </DialogField>
  );
});

const TransactionStatusBlock: React.FC<{
  status: MultiWalletTransactionStatus;
}> = React.memo(({ status }) => {
  const [t] = useTranslation();
  return (
    <TransactionDetailsItem label={t(`transactions-details.status.title`)}>
      <div className="external-transaction__status">
        {status} <Status status={status} />
      </div>
    </TransactionDetailsItem>
  );
});

const TransactionAssetBlock: React.FC<{
  type: "investment" | "withdrawal";
  asset: TransactionAssetDetails;
}> = React.memo(({ asset, type }) => {
  const [t] = useTranslation();
  return (
    <TransactionDetailsItem
      label={t(
        `transactions-details.${type}.direction-${asset.assetType.toLowerCase()}`
      )}
    >
      <TransactionAsset url={asset.logo} data={asset} />
    </TransactionDetailsItem>
  );
});
const TransactionWalletBlock: React.FC<{
  wallets: AmountRowCell;
}> = React.memo(({ wallets }) => {
  const [t] = useTranslation();
  const walletFirst = wallets.first;
  const walletSecond = wallets.second;
  return (
    <TransactionDetailsItem label={t(`transactions-details.wallet`)}>
      {walletSecond ? (
        <WalletConvert wallets={wallets} />
      ) : (
        <CurrencyItem
          logo={walletFirst.logo}
          name={walletFirst.currency}
          clickable={false}
        />
      )}
    </TransactionDetailsItem>
  );
});
const TransactionAmountBlock: React.FC<{
  amounts: AmountRowCell;
}> = React.memo(({ amounts }) => {
  const { title, first, second } = amounts;
  return (
    <TransactionDetailsItem label={title}>
      {second ? (
        <AmountConvert amount={amounts} />
      ) : (
        <AmountItem amount={first} />
      )}
    </TransactionDetailsItem>
  );
});

const _CommonTransactionDetails: React.FC<Props> = ({
  data,
  handleCancel,
  handleResend
}) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop
        title={t(`transactions-details.title`)}
        subtitle={data.description}
      >
        {data.asset && (
          <TransactionAssetBlock asset={data.asset} type={"investment"} />
        )}
        <TransactionWalletBlock wallets={data.amount} />
      </DialogTop>
      <DialogBottom>
        {data.details && <TransactionDetailsItemsBlock items={data.details} />}
        <TransactionStatusBlock status={data.status} />
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
      </DialogBottom>
    </>
  );
};

interface Props {
  data: MultiWalletTransaction;
  handleCancel?: () => void;
  handleResend?: () => void;
}

const CommonTransactionDetails = React.memo(_CommonTransactionDetails);
export default CommonTransactionDetails;
