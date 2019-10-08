import * as React from "react";
import DepositContainer from "shared/components/deposit/components/deposit-container";
import { fundInvestCreator, getFundInfoCreator } from "shared/components/deposit/services/fund-deposit.service";
import { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET, FUND_CURRENCY } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import managerApi from "shared/services/api-client/manager-api";

const _FundDeposit: React.FC<OwnProps & IDialogProps> = ({
  id,
  onApply,
  open,
  onClose
}) => (
  <DepositContainer
    currency={FUND_CURRENCY}
    asset={ASSET.FUND}
    assetInvest={fundInvestCreator(
      managerApi.v10ManagerFundsByIdInvestByAmountPost
    )}
    fetchInfo={getFundInfoCreator(
      managerApi.v10ManagerFundsByIdInvestInfoByCurrencyGet
    )}
    id={id}
    hasEntryFee
    onApply={onApply}
    open={open}
    onClose={onClose}
  />
);

const FundDeposit = withLoader(React.memo(_FundDeposit));
export default FundDeposit;

interface OwnProps {
  id: string;
  onApply(): void;
}
