import React, { Component } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";

import CreateFundSettings from "./components/create-fund-settings/create-fund-settings";
import * as createFundService from "./services/create-fund.service";

class CreateFundContainer extends Component {
  state = {
    isPending: true,
    isNavigationDialogVisible: false,
    assets: null
  };

  componentDidMount() {
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
    const { headerData, service, platformSettings } = this.props;
    if (!platformSettings) return null;
    return (
      <div className="create-fund-container">
        <div>
          {!isPending && (
            <CreateFundSettings
              onValidateError={this.handleValidateError}
              navigateBack={navigateBack}
              balance={(headerData && headerData.availableGvt) || 0}
              updateBalance={service.fetchBalance}
              onSubmit={handleSubmit}
              author={(headerData && headerData.name) || null} //headerData.name
              assets={assets}
              deposit={deposit}
              programsInfo={platformSettings.programsInfo}
            />
          )}
          <ConfirmPopup
            open={isNavigationDialogVisible}
            onClose={() => this.setState({ isNavigationDialogVisible: false })}
            onApply={service.goBack}
            body={t("create-fund-page.navigation-back-text")}
            applyButtonText={t("buttons.continue")}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    headerData: state.profileHeader.info.data,
    platformSettings: state.platformData.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ goBack, ...createFundService }, dispatch)
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreateFundContainer);
