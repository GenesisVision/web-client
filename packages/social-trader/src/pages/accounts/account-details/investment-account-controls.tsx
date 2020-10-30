import { DefaultBlock } from "components/default.block/default.block";
import { DetailsBlockRowItem } from "components/details/details-block-row-item.block";
import { Row } from "components/row/row";
import { WalletItemType } from "components/wallet-select/wallet-select";
import {
  AmountWithCurrency,
  AssetTypeExt,
  PrivateTradingAccountType
} from "gv-api-web";
import { DepositTransferButton } from "modules/transfer/deposit-transfer-button";
import { WithdrawTransferButton } from "modules/transfer/withdraw-transfer-button";
import { transformAmountWithCurrencyToTransferItem } from "pages/dashboard/components/dashboard-trading/dashboard-private-card.helpers";
import * as React from "react";

interface Props {
  id?: string;
  balances?: AmountWithCurrency[];
  transferableItem: WalletItemType;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
  onApply: VoidFunction;
}

const _InvestmentAccountControls: React.FC<Props> = ({
  id,
  balances,
  onApply,
  accountType,
  transferableItem
}) => {
  const isExchangeAccount = accountType === "ExchangeAccount";
  const currentItemContainerItems =
    isExchangeAccount && balances
      ? balances.map(transformAmountWithCurrencyToTransferItem)
      : undefined;
  const currentItem =
    isExchangeAccount && balances
      ? transformAmountWithCurrencyToTransferItem(balances[0])
      : transferableItem;
  return (
    <DefaultBlock size={"large"} bordered tall>
      <Row>
        <DetailsBlockRowItem>
          <DepositTransferButton
            fixedSelects={isExchangeAccount}
            accountId={id}
            outerCurrentItemContainerItems={currentItemContainerItems}
            size={"xlarge"}
            onApply={onApply}
            currentItem={currentItem}
            accountType={accountType}
          />
        </DetailsBlockRowItem>
        <DetailsBlockRowItem>
          <WithdrawTransferButton
            fixedSelects={isExchangeAccount}
            accountId={id}
            outerCurrentItemContainerItems={currentItemContainerItems}
            size={"xlarge"}
            onApply={onApply}
            currentItem={currentItem}
            accountType={accountType}
          />
        </DetailsBlockRowItem>
      </Row>
    </DefaultBlock>
  );
};

const InvestmentAccountControls = React.memo(_InvestmentAccountControls);
export default InvestmentAccountControls;
