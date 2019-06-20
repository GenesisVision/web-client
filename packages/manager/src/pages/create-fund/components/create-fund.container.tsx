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
import { nameSelector } from "shared/reducers/header-reducer";
import {
  fundAssetsSelector,
  platformDataSelector
} from "shared/reducers/platform-reducer";
import { SetSubmittingType } from "shared/utils/types";

import {
  createFund,
  fetchInvestmentAmount,
  showValidationError
} from "../services/create-fund.service";
import CreateFundSettings from "./create-fund-settings/create-fund-settings";

class _CreateFundContainer extends React.PureComponent<Props, State> {
  state = {
    isPending: true,
    isNavigationDialogVisible: false,
    deposit: undefined
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchWallets();
    fetchInvestmentAmount().then(response => {
      this.setState({
        deposit: response,
        isPending: false
      });
    });
  }

  handleSubmit = (values, setSubmitting: SetSubmittingType) => {
    this.props.service.createFund({ ...values }, setSubmitting);
  };

  handleValidateError = () => {
    this.props.service.showValidationError();
  };

  navigateBack = () => {
    this.setState({ isNavigationDialogVisible: true });
  };

  render() {
    const { isPending, isNavigationDialogVisible, deposit } = this.state;
    const { navigateBack, handleSubmit } = this;
    const {
      t,
      author,
      service,
      platformSettings,
      fundAssets,
      wallets
    } = this.props;
    if (!platformSettings || !wallets || !deposit) return null;
    return (
      <div className="create-fund-container">
        <div>
          {!isPending && (
            <CreateFundSettings
              fetchWallets={service.fetchWallets}
              wallets={wallets}
              currency="GVT"
              onValidateError={this.handleValidateError}
              navigateBack={navigateBack}
              onSubmit={handleSubmit}
              author={author}
              assets={fundAssets}
              deposit={deposit}
              programsInfo={platformSettings.programsInfo}
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
      { goBack, createFund, fetchWallets, showValidationError },
      dispatch
    )
  };
};

const CreateFundContainer = compose(
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
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends StateProps, DispatchProps, InjectedTranslateProps {}

interface State {
  isPending: boolean;
  isNavigationDialogVisible: boolean;
  deposit: number | undefined;
}
