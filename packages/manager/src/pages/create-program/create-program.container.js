import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import CreateProgramBroker from "./components/create-program-broker/create-program-broker";
import CreateProgramSettings from "./components/create-program-settings/create-program-settings";
import { checkIsModelFilled } from "./helpers/create-program.helpers";
import * as createProgramService from "./services/create-program.service";

class CreateProgramContainer extends Component {
  state = {
    tab: "broker",
    choosedBroker: null,
    brokers: null,
    isPending: true,
    isNavigationDialogVisible: false,
    isLeverageChooseAvailable: false
  };

  componentDidMount() {
    createProgramService.fetchBrokers().then(response => {
      this.setState({
        brokers: response.brokers,
        isPending: false,
        choosedBroker: response.brokers[0]
      });
    });
  }

  chooseBroker = broker => {
    this.setState({ choosedBroker: broker });
  };

  confirmNavigateToBroker = () => {
    this.setState({ tab: "broker", isNavigationDialogVisible: false });
  };

  navigateToBroker = values => {
    if (checkIsModelFilled(values)) {
      this.setState({ isNavigationDialogVisible: true });
    } else {
      this.setState({ tab: "broker", isNavigationDialogVisible: false });
    }
  };

  navigateToSettings = () => {
    this.setState({ tab: "settings" });
  };

  handleSubmit = (values, setSubmitting) => {
    const brokerAccountTypeId = this.state.choosedBroker.accountTypes.find(
      type => type.type === values.accountType
    ).id;

    this.props.service.createProgram(
      { ...values, brokerAccountTypeId },
      setSubmitting
    );
  };

  handleValidateError = () => {
    this.props.service.showValidationError();
  };

  setLeverageChooseAvailable = isAvailable => {
    this.setState({ isLeverageChooseAvailable: isAvailable });
  };

  render() {
    const {
      tab,
      choosedBroker,
      isPending,
      brokers,
      isNavigationDialogVisible,
      isLeverageChooseAvailable
    } = this.state;
    const {
      navigateToSettings,
      navigateToBroker,
      confirmNavigateToBroker,
      chooseBroker,
      handleSubmit,
      setLeverageChooseAvailable
    } = this;
    const { t, headerData, service, platformSettings } = this.props;
    if (!platformSettings) return null;
    return (
      <div className="create-program-container">
        <GVTabs value={tab}>
          <GVTab
            value={"broker"}
            label={t("create-program-page.tabs.select-broker")}
          />
          <GVTab
            value={"settings"}
            label={t("create-program-page.tabs.settings")}
          />
        </GVTabs>
        {!isPending && (
          <div>
            {tab === "broker" && (
              <CreateProgramBroker
                navigateToSettings={navigateToSettings}
                brokers={brokers}
                choosedBroker={choosedBroker}
                chooseBroker={chooseBroker}
              />
            )}
            {tab === "settings" && (
              <CreateProgramSettings
                onValidateError={this.handleValidateError}
                navigateBack={navigateToBroker}
                broker={choosedBroker}
                balance={(headerData && headerData.availableGvt) || 0}
                updateBalance={service.fetchBalance}
                onSubmit={handleSubmit}
                author={(headerData && headerData.name) || null}
                setLeverageChooseAvailable={setLeverageChooseAvailable}
                isLeverageChooseAvailable={isLeverageChooseAvailable}
                programsInfo={platformSettings.programsInfo}
                notifyError={service.notifyError}
              />
            )}
            <ConfirmPopup
              open={isNavigationDialogVisible}
              onClose={() =>
                this.setState({ isNavigationDialogVisible: false })
              }
              onApply={confirmNavigateToBroker}
              body={t("create-program-page.navigation-back-text")}
              applyButtonText={t("buttons.continue")}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  headerData: state.profileHeader.info.data,
  platformSettings: state.platformData.data
});

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      {
        ...createProgramService,
        notifyError: (text, isUseLocalization) =>
          alertMessageActions.error(text, isUseLocalization)
      },
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
)(CreateProgramContainer);
