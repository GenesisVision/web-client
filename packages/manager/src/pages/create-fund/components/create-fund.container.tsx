import { goBack } from "connected-react-router";
import { PlatformAsset, PlatformInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { nameSelector } from "shared/reducers/header-reducer";
import {
  fundAssetsSelector,
  platformDataSelector
} from "shared/reducers/platform-reducer";
import { rateApi } from "shared/services/api-client/rate-api";
import { SetSubmittingType } from "shared/utils/types";

import {
  createFund,
  fetchMinimumDepositAmount
} from "../services/create-fund.service";
import { ICreateFundSettingsFormValues } from "./create-fund-settings/create-fund-settings";
import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

class _CreateFundContainer extends React.PureComponent<Props, State> {
  state = {
    isPending: true,
    isNavigationDialogVisible: false,
    minimumDepositAmount: undefined
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchWallets();
    fetchMinimumDepositAmount().then(response => {
      this.setState({
        minimumDepositAmount: response,
        isPending: false
      });
    });
  }

  handleSubmit = (
    values: ICreateFundSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    this.props.service.createFund(values, setSubmitting);
  };

  handleValidateError = () => {
    this.props.service.showValidationError();
  };

  navigateBack = () => {
    this.setState({ isNavigationDialogVisible: true });
  };

  fetchRate = (fromCurrency: string, toCurrency: string) => {
    return rateApi.v10RateByFromByToGet(fromCurrency, toCurrency);
  };

  render() {
    const {
      isPending,
      isNavigationDialogVisible,
      minimumDepositAmount
    } = this.state;
    const {
      t,
      author,
      service,
      platformSettings,
      fundAssets,
      wallets
    } = this.props;
    if (!platformSettings || !wallets || !minimumDepositAmount) return null;
    return (
      <div className="create-fund-container">
        <div>
          {!isPending && wallets && (
            <CreateFundSettingsSection
              fetchWallets={service.fetchWallets}
              wallets={wallets}
              navigateBack={this.navigateBack}
              onSubmit={this.handleSubmit}
              author={author}
              assets={fundAssets}
              minimumDepositAmount={minimumDepositAmount}
              managerMaxExitFee={
                platformSettings.programsInfo.managerMaxExitFee
              }
              managerMaxEntryFee={
                platformSettings.programsInfo.managerMaxEntryFee
              }
              notifyError={service.notifyError}
              fetchRate={this.fetchRate}
            />
          )}
          <ConfirmPopup
            open={isNavigationDialogVisible}
            onClose={() => this.setState({ isNavigationDialogVisible: false })}
            onApply={service.goBack}
            body={t("manager.create-fund-page.navigation-back-text")}
            applyButtonText={t("buttons.continue")}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  wallets: walletsSelector(state),
  author: nameSelector(state),
  platformSettings: platformDataSelector(state),
  fundAssets: fundAssetsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
      {
        goBack,
        createFund,
        fetchWallets,
        notifyError: alertMessageActions.error
      },
      dispatch
    )
  };
};

const CreateFundContainer = compose<React.ComponentType>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_CreateFundContainer);
export default CreateFundContainer;

interface StateProps {
  wallets: WalletData[];
  author: string;
  platformSettings: PlatformInfo | undefined;
  fundAssets: PlatformAsset[];
}

interface ServiceThunks extends ActionCreatorsMapObject {
  goBack: typeof goBack;
  createFund: typeof createFund;
  fetchWallets: typeof fetchWallets;
  notifyError: typeof alertMessageActions.error;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends StateProps, DispatchProps, InjectedTranslateProps {}

interface State {
  isPending: boolean;
  isNavigationDialogVisible: boolean;
  minimumDepositAmount?: number;
}
