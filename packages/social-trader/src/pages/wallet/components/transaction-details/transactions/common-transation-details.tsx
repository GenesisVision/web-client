import clsx from "clsx";
import ActionButton from "components/action-button/action-button";
import { CurrencyItem } from "components/currency-item/currency-item";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import { LabeledValue } from "components/labeled-value/labeled-value";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import Status from "components/status/status";
import Crashable from "decorators/crashable";
import {
  AmountRowCell,
  MultiWalletTransactionStatus,
  TransactionAssetDetails,
  TransactionDetailItem
} from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import TransactionAsset from "pages/wallet/components/transaction-details/transactions/transaction-asset";
import WalletConvert from "pages/wallet/components/wallet-tables/wallet-transactions/wallet-convert";
import { MultiWalletTransaction } from "pages/wallet/wallet.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "../transaction-details.module.scss";

const _TransactionDetailsItemsBlock: React.FC<{
  items: TransactionDetailItem[];
}> = ({ items }) => {
  return (
    <>
      {items.map(item => (
        <RowItem key={item.title} bottomOffset>
          <TransactionDetailsListItem item={item} />
        </RowItem>
      ))}
    </>
  );
};
const TransactionDetailsItemsBlock = React.memo(
  Crashable(_TransactionDetailsItemsBlock)
);

const TransactionDetailsListItem: React.FC<{
  item: TransactionDetailItem;
}> = React.memo(({ item: { title, details, url, canCopy } }) => {
  const { linkCreator } = useToLink();
  return (
    <LabeledValue label={title}>
      <Row>
        <RowItem
          className={clsx({
            [styles[
              "transaction-details__details-list-statistic-item-value--long"
            ]]: details.length > 35
          })}
        >
          {url ? <Link to={linkCreator(url)}>{details}</Link> : details}
        </RowItem>
        {canCopy && (
          <RowItem>
            <CopyButton value={details} text />
          </RowItem>
        )}
      </Row>
    </LabeledValue>
  );
});

const TransactionDetailsItem: React.FC<
  {
    label: string;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ label, children }) => {
  return (
    <Row>
      <LabeledValue label={label}>{children}</LabeledValue>
    </Row>
  );
};

const TransactionStatusBlock: React.FC<{
  status: MultiWalletTransactionStatus;
}> = React.memo(({ status }) => {
  const [t] = useTranslation();
  return (
    <TransactionDetailsItem
      label={t(`wallet-page:transactions-details.status.title`)}
    >
      <Status withText status={status} />
    </TransactionDetailsItem>
  );
});

const _TransactionAssetBlock: React.FC<{
  type: "investment" | "withdrawal";
  asset: TransactionAssetDetails;
}> = ({ asset }) => {
  return (
    <TransactionDetailsItem label={asset.description}>
      <TransactionAsset url={asset.logoUrl} data={asset} />
    </TransactionDetailsItem>
  );
};
const TransactionAssetBlock = React.memo(Crashable(_TransactionAssetBlock));

const _TransactionWalletBlock: React.FC<{
  wallets: AmountRowCell;
}> = ({ wallets }) => {
  const [t] = useTranslation();
  const walletFirst = wallets.first;
  const walletSecond = wallets.second;
  return (
    <TransactionDetailsItem
      label={t(`wallet-page:transactions-details.wallet`)}
    >
      {walletSecond ? (
        <WalletConvert wallets={wallets} />
      ) : (
        <CurrencyItem
          logo={walletFirst.logoUrl}
          name={walletFirst.currency}
          clickable={false}
        />
      )}
    </TransactionDetailsItem>
  );
};
const TransactionWalletBlock = React.memo(Crashable(_TransactionWalletBlock));

const _CommonTransactionDetails: React.FC<Props> = ({
  data,
  handleCancel,
  handleResend
}) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop
        title={t(`wallet-page:transactions-details.title`)}
        subtitle={data.detailsTitle}
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
          <Row>
            <Row className={styles["external-transaction__actions"]}>
              {data.actions.canCancel && (
                <RowItem>
                  <ActionButton
                    onClick={handleCancel}
                    text={t("buttons.cancel")}
                  />
                </RowItem>
              )}
              {data.actions.canResend && (
                <RowItem>
                  <ActionButton
                    onClick={handleResend}
                    text={t("buttons.resend-email")}
                  />
                </RowItem>
              )}
            </Row>
          </Row>
        )}
      </DialogBottom>
    </>
  );
};

interface Props {
  data: MultiWalletTransaction;
  handleCancel: VoidFunction;
  handleResend: VoidFunction;
}

const CommonTransactionDetails = React.memo(
  Crashable(_CommonTransactionDetails)
);
export default CommonTransactionDetails;
