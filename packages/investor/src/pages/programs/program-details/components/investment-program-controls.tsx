import {
  NotificationSettingViewModelConditionTypeEnum,
  ProgramDetailsFull
} from "gv-api-web";
import { GVButton } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";

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

  subscribe = () => {
    this.setState({ subscription: true });
    notificationsApi
      .v10NotificationsSettingsAddPost(authService.getAuthArg(), {
        assetId: this.props.programDescription.id,
        conditionType: "AvailableToInvest",
        type: "ProgramCondition",
        conditionAmount: 5
      })
      .then(id => {
        console.info(id);
        this.setState({ subscription: false });
      })
      .catch(() => {
        this.setState({ subscription: false });
      });
  };

  closeInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: false });
  };

  applyInvestmentChanges = (updateDetails: () => void) => () => {
    updateDetails();
  };

  render() {
    const { t, programDescription } = this.props;
    const { isOpenInvestmentPopup } = this.state;
    console.info(programDescription);
    return (
      <>
        <InvestmentProgramInfo programDescription={programDescription} />
        <div className="program-details-description__button-container">
          {programDescription.availableInvestmentBase === 0 ? (
            <>
              <Hint
                content={"?"}
                className="create-fund-settings__item-caption"
                vertical={VERTICAL_POPOVER_POS.TOP}
                tooltipContent={
                  "Notify me when the program is available for investment"
                }
              />
              <GVButton
                className="program-details-description__invest-btn"
                onClick={this.subscribe}
                disabled={Boolean(
                  programDescription.personalProgramDetails
                    .notificationAvailableToInvestId
                )}
              >
                {t("buttons.notify")}
              </GVButton>
            </>
          ) : (
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.openInvestmentPopup}
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
  subscription: boolean;
}

interface Props extends InjectedTranslateProps, OwnProps {}
