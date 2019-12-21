import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { DetailsBlockRowItem } from "components/details/details-block-row-item.block";
import TransferButton from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import { AccountDetailsDataType } from "pages/accounts/account-details/account-details.types";
import { mapAccountFullToTransferItemType } from "pages/dashboard/services/dashboard.service";
import * as React from "react";
import { useTranslation } from "shared/i18n";

const _InvestmentAccountControls: React.FC<Props> = ({ account, onApply }) => {
  const [t] = useTranslation();
  return (
    <DetailsBlock type={DETAILS_BLOCK_TYPE.BORDERED} row>
      <DetailsBlockRowItem>
        <TransferButton
          color={"primary"}
          variant={"contained"}
          onApply={onApply}
          label={t("buttons.deposit")}
          title={t("transfer.deposit-to", {
            title: t(
              `dashboard-page.trading.asset-types.${account.tradingAccountInfo.type}`
            )
          })}
          currentItem={mapAccountFullToTransferItemType(account)}
          currentItemContainer={TRANSFER_CONTAINER.DESTINATION}
          sourceType={"Wallet"}
          destinationType={"PrivateTradingAccount"}
        />
      </DetailsBlockRowItem>
      <DetailsBlockRowItem>
        <TransferButton
          onApply={onApply}
          label={t("buttons.withdraw")}
          title={t("transfer.withdraw-from", {
            title: t(
              `dashboard-page.trading.asset-types.${account.tradingAccountInfo.type}`
            )
          })}
          currentItem={mapAccountFullToTransferItemType(account)}
          currentItemContainer={TRANSFER_CONTAINER.SOURCE}
          sourceType={"PrivateTradingAccount"}
          destinationType={"Wallet"}
        />
      </DetailsBlockRowItem>
    </DetailsBlock>
  );
};

interface Props {
  account: AccountDetailsDataType;
  onApply?: VoidFunction;
}

const InvestmentAccountControls = React.memo(_InvestmentAccountControls);
export default InvestmentAccountControls;
