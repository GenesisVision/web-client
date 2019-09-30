import {
  Broker,
  BrokerAccountType,
  ProgramsInfo,
  WalletData
} from "gv-api-web";
import * as React from "react";
import { rateApi } from "shared/services/api-client/rate-api";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import CreateProgramSettings, {
  ICreateProgramSettingsFormValues
} from "./create-program-settings";

class CreateProgramSettingsSection extends React.PureComponent<
  OwnProps,
  StateProps
> {
  constructor(props: OwnProps) {
    super(props);
    const brokerAccountType = this.props.broker.accountTypes[0];
    const currency = this.getCurrency(brokerAccountType);
    const leverage = this.getLeverage(brokerAccountType);
    const wallet = this.props.wallets.find(x => x.currency === "GVT")!;

    this.state = {
      accountType: brokerAccountType,
      programCurrency: currency,
      leverage,
      wallet,
      rate: 1
    };

    this.updateRate(wallet.currency, currency);
  }

  componentDidUpdate(prevProps: OwnProps) {
    const wallet = this.props.wallets.find(x => x.id === this.state.wallet.id)!;
    this.setState({ wallet });
    if (this.state.programCurrency) {
      this.updateRate(wallet.currency, this.state.programCurrency);
    }
  }

  handleAccountTypeChange = (brokerAccountTypeId: string) => {
    const accountType = this.props.broker.accountTypes.find(
      x => x.id === brokerAccountTypeId
    );
    this.setState({ accountType: accountType! });
    this.handleCurrencyChange(this.getCurrency(accountType!));
    this.handleLeverageChange(this.getLeverage(accountType!));
  };

  handleCurrencyChange = (programCurrency: CurrencyEnum): void => {
    if (this.state.programCurrency === programCurrency) return;
    this.setState({ programCurrency });
    this.updateRate(this.state.wallet.currency, programCurrency);
  };

  handleLeverageChange = (leverage: number): void => {
    if (this.state.leverage === leverage) return;
    this.setState({ leverage });
  };

  handleWalletChange = (walletId: string): void => {
    if (this.state.wallet && this.state.wallet.id === walletId) return;
    this.props.fetchWallets(this.props.currency);
    const wallet = this.props.wallets.find(x => x.id === walletId)!;
    this.setState({ wallet });
  };

  getCurrency = (accountType: BrokerAccountType): CurrencyEnum =>
    accountType.currencies[0] as CurrencyEnum; // TODO say to backend change type to CurrencyEnum[]

  getLeverage = (accountType: BrokerAccountType): number =>
    accountType.leverages[0];

  updateRate = (from: CurrencyEnum, to: CurrencyEnum): void => {
    rateApi.v10RateByFromByToGet(from, to).then(rate => {
      this.setState({ rate });
    });
  };

  render() {
    const { accountType, programCurrency, leverage, rate, wallet } = this.state;

    return (
      <CreateProgramSettings
        notifyError={this.props.notifyError}
        navigateBack={this.props.navigateBack}
        onSubmit={this.props.onSubmit}
        minimumDepositsAmount={this.props.minimumDepositsAmount}
        broker={this.props.broker}
        author={this.props.author}
        programsInfo={this.props.programsInfo}
        wallets={this.props.wallets}
        wallet={wallet}
        leverage={leverage}
        programCurrency={programCurrency}
        rate={rate}
        accountType={accountType}
        changeLeverage={this.handleLeverageChange}
        changeWallet={this.handleWalletChange}
        changeCurrency={this.handleCurrencyChange}
        changeAccountType={this.handleAccountTypeChange}
      />
    );
  }
}

export default CreateProgramSettingsSection;

interface OwnProps {
  currency: CurrencyEnum;
  broker: Broker;
  wallets: WalletData[];
  programsInfo: ProgramsInfo;
  fetchWallets: (currency: CurrencyEnum) => void;
  onSubmit(
    data: ICreateProgramSettingsFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  minimumDepositsAmount: { [key: string]: number };
  navigateBack(): void;
  author: string;
  notifyError(message: string): void;
}

interface StateProps {
  accountType: BrokerAccountType;
  programCurrency: CurrencyEnum;
  leverage: number;
  rate: number;
  wallet: WalletData;
}
