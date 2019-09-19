import { PlatformAsset, WalletData } from "gv-api-web";
import * as React from "react";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import CreateFundSettings, {
  ICreateFundSettingsFormValues
} from "./create-fund-settings";
import withLoader from "shared/decorators/with-loader";

const FUND_CURRENCY = "GVT";

class _CreateFundSettingsSection extends React.PureComponent<
  OwnProps,
  StateProps
> {
  constructor(props: OwnProps) {
    super(props);
    const wallet = this.props.wallets.find(x => x.currency === FUND_CURRENCY)!;

    this.state = {
      wallet,
      rate: undefined
    };

    this.updateRate(wallet.currency, FUND_CURRENCY);
  }

  componentDidUpdate(prevProps: OwnProps) {
    const wallet = this.props.wallets.find(x => x.id === this.state.wallet.id)!;
    this.setState({ wallet });
    this.updateRate(wallet.currency, FUND_CURRENCY);
  }

  handleWalletChange = (walletId: string): void => {
    if (this.state.wallet && this.state.wallet.id === walletId) return;
    this.props.fetchWallets(this.props.currency);
    const wallet = this.props.wallets.find(x => x.id === walletId)!;
    this.setState({ wallet });
  };

  updateRate = (from?: string, to?: string): void => {
    if (!from || !to) {
      this.setState({ rate: undefined });
    } else {
      this.props.fetchRate(from, to).then(rate => {
        this.setState({ rate });
      });
    }
  };
  render() {
    const {
      wallets,
      navigateBack,
      onSubmit,
      author,
      assets,
      minimumDepositAmount,
      managerMaxExitFee,
      managerMaxEntryFee,
      notifyError
    } = this.props;
    const { wallet, rate } = this.state;
    if (!rate) return null;
    return (
      <CreateFundSettings
        wallets={wallets}
        fundCurrency={FUND_CURRENCY}
        navigateBack={navigateBack}
        onSubmit={onSubmit}
        author={author}
        assets={assets}
        minimumDepositAmount={minimumDepositAmount}
        managerMaxExitFee={managerMaxExitFee}
        managerMaxEntryFee={managerMaxEntryFee}
        rate={rate}
        wallet={wallet}
        notifyError={notifyError}
        onWalletChange={this.handleWalletChange}
      />
    );
  }
}

const CreateFundSettingsSection = withLoader(_CreateFundSettingsSection);
export default CreateFundSettingsSection;

interface OwnProps {
  currency: CurrencyEnum;
  managerMaxExitFee: number;
  managerMaxEntryFee: number;
  wallets: WalletData[];
  fetchWallets: (currency: CurrencyEnum) => void;
  fetchRate(from: string, to: string): Promise<number>;
  onSubmit(
    data: ICreateFundSettingsFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  navigateBack(): void;
  author: string;
  assets: PlatformAsset[];
  minimumDepositAmount: number;
  notifyError(message: string): void;
}
interface StateProps {
  rate?: number;
  wallet: WalletData;
}
