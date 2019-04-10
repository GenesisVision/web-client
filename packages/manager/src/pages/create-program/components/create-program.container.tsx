import {
  Broker,
  CancelablePromise,
  ProfileHeaderViewModel,
  ProgramsInfo,
  WalletData
} from "gv-api-web";
import { GVTab, GVTabs } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { Dispatch, bindActionCreators, compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { rateApi } from "shared/services/api-client/rate-api";

import {
  createProgram,
  fetchBrokers,
  fetchMinDepositsAmount
} from "../services/create-program.service";
import CreateProgramBroker from "./create-program-broker/create-program-broker";
import CreateProgramSettingsSection from "./create-program-settings/create-program-settings-section";

enum TAB {
  BROKER = "BROKER",
  SETTINGS = "SETTINGS"
}

class _CreateProgramContainer extends React.PureComponent<Props, State> {
  state: State = {
    minimumDepositsAmount: undefined,
    tab: TAB.BROKER,
    selectedBroker: undefined,
    brokers: undefined,
    isPending: true,
    isNavigationDialogVisible: false
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchWallets();
    fetchBrokers().then(brokers => {
      this.setState({
        brokers: brokers,
        isPending: false,
        selectedBroker: brokers[0]
      });
    });

    fetchMinDepositsAmount().then(minimumDepositsAmount =>
      this.setState({ minimumDepositsAmount })
    );
  }

  selectBroker = (brokerName: string) => () => {
    const broker = this.state.brokers!.find(x => x.name === brokerName);
    this.setState({ selectedBroker: broker });
  };

  confirmNavigateToBroker = () => {
    this.setState({ tab: TAB.BROKER, isNavigationDialogVisible: false });
  };

  navigateToSettings = () => {
    this.setState({ tab: TAB.SETTINGS });
  };

  navigateToBroker = () => {
    this.setState({ isNavigationDialogVisible: true });
  };

  fetchRate = (
    fromCurrency: string,
    toCurrency: string
  ): CancelablePromise<number> => {
    return rateApi.v10RateByFromByToGet(fromCurrency, toCurrency);
  };

  render() {
    const {
      minimumDepositsAmount,
      tab,
      selectedBroker,
      isPending,
      brokers,
      isNavigationDialogVisible
    } = this.state;

    const { t, headerData, service, programsInfo, wallets } = this.props;
    if (
      !brokers ||
      !selectedBroker ||
      !programsInfo ||
      !headerData ||
      !wallets ||
      !minimumDepositsAmount
    )
      return null;
    return (
      <div className="create-program-page__container">
        <div className="create-program-page__tabs">
          <GVTabs value={tab}>
            <GVTab
              value={TAB.BROKER}
              label={t("manager.create-program-page.tabs.select-broker")}
            />
            <GVTab
              value={TAB.SETTINGS}
              label={t("manager.create-program-page.tabs.settings")}
            />
          </GVTabs>
        </div>
        {!isPending && (
          <div>
            {tab === TAB.BROKER && (
              <CreateProgramBroker
                navigateToSettings={this.navigateToSettings}
                brokers={brokers}
                selectedBroker={selectedBroker}
                selectBroker={this.selectBroker}
                isForexAllowed={headerData.allowForex}
              />
            )}
            {tab === TAB.SETTINGS && (
              <CreateProgramSettingsSection
                minimumDepositsAmount={minimumDepositsAmount}
                fetchWallets={service.fetchWallets}
                fetchRate={this.fetchRate}
                wallets={wallets}
                navigateBack={this.navigateToBroker}
                broker={selectedBroker}
                onSubmit={service.createProgram}
                notifyError={service.notifyError}
                author={headerData.name}
                programsInfo={programsInfo}
              />
            )}
            <ConfirmPopup
              open={isNavigationDialogVisible}
              onClose={() =>
                this.setState({ isNavigationDialogVisible: false })
              }
              onApply={this.confirmNavigateToBroker}
              body={t("manager.create-program-page.navigation-back-text")}
              applyButtonText={t("buttons.continue")}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ManagerRootState): StateProps => {
  return {
    wallets: state.wallet.info.data
      ? state.wallet.info.data.wallets
      : undefined,
    headerData: state.profileHeader.info.data,
    programsInfo: state.platformData.data
      ? state.platformData.data.programsInfo
      : undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    service: bindActionCreators(
      {
        createProgram,
        fetchWallets,
        notifyError: alertMessageActions.error
      },
      dispatch
    )
  };
};

const CreateProgramContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, ManagerRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_CreateProgramContainer);
export default CreateProgramContainer;

interface OwnProps {}

interface State {
  minimumDepositsAmount?: { [key: string]: number };
  selectedBroker?: Broker;
  brokers?: Broker[];
  isPending: boolean;
  tab: TAB.BROKER | TAB.SETTINGS;
  isNavigationDialogVisible: boolean;
}

interface StateProps {
  programsInfo?: ProgramsInfo;
  wallets?: WalletData[];
  headerData?: ProfileHeaderViewModel;
}

interface DispatchProps {
  service: {
    fetchWallets(): void;
    createProgram(data: any, setSubmitting: any): void;
    notifyError(message: string): void;
  };
}

interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    InjectedTranslateProps {}
