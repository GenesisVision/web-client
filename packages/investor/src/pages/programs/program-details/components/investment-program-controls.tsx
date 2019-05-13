import { ProgramDetailsFull } from "gv-api-web";
import ProgramDepositContainer from "modules/program-deposit/program-deposit";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import GVButton from "shared/components/gv-button";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";

import NotifyButton from "./notify-button";

class InvestmentProgramControls extends React.PureComponent<Props, State> {
  state = {
    isOpenInvestmentPopup: false,
    isOpenPopup: false,
    subscription: false
  };

  handleClosePopup = () => {
    this.setState({ isOpenPopup: false });
  };

  openInvestmentPopup = () => {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.setState({ isOpenInvestmentPopup: true });
    } else {
      this.setState({ isOpenPopup: true });
    }
  };

  closeInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: false });
  };

  applyInvestmentChanges = (updateDetails: () => void) => () => {
    updateDetails();
  };

  render() {
    const { t, programDescription, isAuthenticated } = this.props;
    const { isOpenInvestmentPopup } = this.state;
    const notificationId = programDescription.personalProgramDetails
      ? programDescription.personalProgramDetails
          .notificationAvailableToInvestId
      : undefined;
    const isDisabledInvestButton = isAuthenticated
      ? !programDescription.personalProgramDetails ||
        !programDescription.personalProgramDetails.canInvest
      : false;
    return (
      <>
        <InvestmentProgramInfo programDescription={programDescription} />
        <div className="program-details-description__button-container">
          {programDescription.availableInvestmentBase === 0 &&
          isAuthenticated ? (
            <NotifyButton
              canInvest={programDescription.personalProgramDetails.canInvest}
              currency={programDescription.currency}
              assetId={programDescription.id}
              notificationId={notificationId}
            />
          ) : (
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.openInvestmentPopup}
              disabled={isDisabledInvestButton}
            >
              {t("program-details-page.description.invest")}
            </GVButton>
          )}
        </div>
        <ProgramDetailContext.Consumer>
          {({ updateDetails }: IProgramDetailContext) => (
            <ProgramDepositContainer
              currency={programDescription.currency}
              open={isOpenInvestmentPopup}
              id={programDescription.id}
              onClose={this.closeInvestmentPopup}
              onApply={this.applyInvestmentChanges(updateDetails)}
            />
          )}
        </ProgramDetailContext.Consumer>
        <InvestmentUnauthPopup
          message={t("program-details-page.description.unauth-popup")}
          asset={ASSET.PROGRAM}
          availableToInvestBase={programDescription.availableInvestmentBase}
          title={programDescription.title}
          currency={programDescription.currency}
          open={this.state.isOpenPopup}
          onClose={this.handleClosePopup}
        />
      </>
    );
  }
}

export default translate()(InvestmentProgramControls);

interface OwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: ProgramDetailsFull;
}

interface State {
  isOpenInvestmentPopup: boolean;
  isOpenPopup: boolean;
}

interface Props extends InjectedTranslateProps, OwnProps {}
