import classNames from "classnames";
import ActionButton from "components/action-button/action-button";
import { CurrencyItem } from "components/currency-item/currency-item";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
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

const _TransactionDetailsItemsBlock: React.FC<{
  items: TransactionDetailItem[];
}> = ({ items }) => {
  return (
    <>
      {items.map(item => (
        <TransactionDetailsListItem item={item} />
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
    <StatisticItem label={title}>
      <Row>
        <RowItem
          className={classNames({
            "transaction-details__details-list-statistic-item-value--long":
              details.length > 40
          })}
        >
          {url ? <Link to={linkCreator(url)}>{details}</Link> : details}
        </RowItem>
        <RowItem>{canCopy && <CopyButton value={details} text />}</RowItem>
      </Row>
    </StatisticItem>
  );
});

const TransactionDetailsItem: React.FC<{
  label: string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ label, children }) => {
  return (
    <DialogField>
      <StatisticItem label={label}>{children}</StatisticItem>
    </DialogField>
  );
};

const TransactionStatusBlock: React.FC<{
  status: MultiWalletTransactionStatus;
}> = React.memo(({ status }) => {
  const [t] = useTranslation();
  return (
    <TransactionDetailsItem label={t(`transactions-details.status.title`)}>
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
      <TransactionAsset url={asset.logo} data={asset} />
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
        title={t(`transactions-details.title`)}
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
          <DialogField>
            <Row className="external-transaction__actions">
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
            </Row>
          </DialogField>
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
