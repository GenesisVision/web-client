import { FundDetailsFull } from "gv-api-web";
import { IDialogProps } from "shared/components/dialog/dialog";

export interface IDescriptionSection {
  FundWithdrawalContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  FundControls: React.ComponentType<IFundControlsProps>;
}

export interface IFundWithdrawalContainerProps extends IDialogProps {
  id: string;
  accountCurrency: string;
  assetCurrency: string;
  onSubmit(): void;
}

export interface IFundControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  fundDescription: FundDetailsFull;
}
