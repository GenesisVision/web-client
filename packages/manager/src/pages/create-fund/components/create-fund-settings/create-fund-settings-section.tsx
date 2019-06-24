import { PlatformAsset, WalletData } from "gv-api-web";
import * as React from "react";
import { SetSubmittingType } from "shared/utils/types";

import CreateFundSettings, {
  ICreateFundSettingsFormValues
} from "./create-fund-settings";

const FUND_CURRENCY = "GVT";

class CreateFundSettingsSection extends React.PureComponent<
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
    if (this.props.wallets === prevProps.wallets) return;

    const wallet = this.props.wallets.find(x => x.id === this.state.wallet.id)!;
    this.setState({ wallet });
  }

  handleWalletChange = (walletId: string): void => {
    if (this.state.wallet && this.state.wallet.id === walletId) return;
    this.props.fetchWallets();
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
      fetchWallets,
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
    return (
      <CreateFundSettings
        fetchWallets={fetchWallets}
        wallets={wallets}
        fundCurrency={FUND_CURRENCY}
        navigateBack={navigateBack}
        onSubmit={onSubmit}
        author={author}
        assets={assets}
        minimumDepositAmount={minimumDepositAmount}
        managerMaxExitFee={managerMaxExitFee}
        managerMaxEntryFee={managerMaxEntryFee}
        rate={rate!}
        wallet={wallet}
        notifyError={notifyError}
      />
    );
  }
}

export default CreateFundSettingsSection;

interface OwnProps {
  managerMaxExitFee: number;
  managerMaxEntryFee: number;
  wallets: WalletData[];
  fetchWallets(): void;
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
