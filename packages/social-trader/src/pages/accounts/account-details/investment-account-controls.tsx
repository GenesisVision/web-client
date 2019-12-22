import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { DetailsBlockRowItem } from "components/details/details-block-row-item.block";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { AssetTypeExt, PrivateTradingAccountType } from "gv-api-web";
import { DepositTransferButton } from "modules/transfer/deposit-transfer-button";
import { WithdrawTransferButton } from "modules/transfer/withdraw-transfer-button";
import * as React from "react";

const _InvestmentAccountControls: React.FC<Props> = ({
  onApply,
  accountType,
  transferableItem
}) => {
  return (
    <DetailsBlock type={DETAILS_BLOCK_TYPE.BORDERED} row>
      <DetailsBlockRowItem>
        <DepositTransferButton
          onApply={onApply}
          currentItem={transferableItem}
          accountType={accountType}
        />
      </DetailsBlockRowItem>
      <DetailsBlockRowItem>
        <WithdrawTransferButton
          onApply={onApply}
          currentItem={transferableItem}
          accountType={accountType}
        />
      </DetailsBlockRowItem>
    </DetailsBlock>
  );
};

interface Props {
  transferableItem: WalletItemType;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
  onApply?: VoidFunction;
}

const InvestmentAccountControls = React.memo(_InvestmentAccountControls);
export default InvestmentAccountControls;
