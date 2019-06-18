import { goBack } from "connected-react-router";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import * as WalletServices from "shared/components/wallet/services/wallet.services";
import { nameSelector } from "shared/reducers/header-reducer";
import { platformDataSelector } from "shared/reducers/platform-reducer";

import CreateFundSettings from "./components/create-fund-settings/create-fund-settings";
import * as createFundService from "./services/create-fund.service";

class CreateFundContainer extends React.PureComponent {
  state = {
    isPending: true,
    isNavigationDialogVisible: false,
    assets: null
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchWallets();
    createFundService
      .fetchAssets()
      .then(response => {
        this.setState({ assets: response.assets });
      })
      .then(() => {
        createFundService.fetchInvestmentAmount().then(response => {
          this.setState({
            deposit: response,
            isPending: false
          });
        });
      });
  }

  handleSubmit = (values, setSubmitting) => {
    this.props.service.createFund({ ...values }, setSubmitting);
  };

  handleValidateError = () => {
    this.props.service.showValidationError();
  };

  navigateBack = () => {
    this.setState({ isNavigationDialogVisible: true });
  };

  render() {
    const {
      isPending,
      isNavigationDialogVisible,
      assets,
      deposit
    } = this.state;
    const { navigateBack, handleSubmit } = this;
    const { t, author, service, platformSettings, wallets } = this.props;
    if (!platformSettings || !wallets) return null;
    return (
      <div className="create-fund-container">
        <div>
          {!isPending && (
            <CreateFundSettings
              fetchWallets={service.fetchWallets}
              wallets={wallets}
              currency={"GVT"}
              onValidateError={this.handleValidateError}
              navigateBack={navigateBack}
              updateBalance={service.fetchBalance}
              onSubmit={handleSubmit}
              author={author}
              assets={assets}
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

const mapStateToProps = state => ({
  wallets: walletsSelector(state),
  author: nameSelector(state),
  platformSettings: platformDataSelector(state)
});

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      { goBack, ...WalletServices, ...createFundService },
      dispatch
    )
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreateFundContainer);
