import React, { Component } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import CreateFundNavigationDialog from "./components/create-fund-navigation-dialog/create-fund-navigation-dialog";
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
        this.setState({
          assets: response.assets
        });
      })
      .then(() => {
        createFundService.fetchInvestmentAmount().then(response => {
          this.setState({
            deposit: response.data,
            isPending: false
          });
        });
      });
  }

  handleSubmit = (values, setSubmitting) => {
    this.props.service.createFund({ ...values }, setSubmitting);
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
              navigateBack={navigateBack}
              balance={headerData.totalBalanceGvt || 0}
              updateBalance={service.fetchBalance}
              onSubmit={handleSubmit}
              author={(headerData && headerData.name) || null} //headerData.name
              assets={assets}
              deposit={deposit}
              programsInfo={platformSettings.programsInfo}
            />
          )}
          <CreateFundNavigationDialog
            open={isNavigationDialogVisible}
            onClose={() => this.setState({ isNavigationDialogVisible: false })}
            onConfirm={service.goBack}
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CreateFundContainer
);
