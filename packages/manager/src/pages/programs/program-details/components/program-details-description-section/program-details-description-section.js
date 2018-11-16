import AssetEditContainer from "modules/asset-edit/asset-edit-container";
import { PROGRAM } from "modules/asset-edit/asset-edit.constants";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import AboutLevelsContainerComponent from "pages/app/components/about-levels/about-levels-container";
import { ProgramDetailContext } from "pages/programs/program-details/program-details.page";
import React, { Fragment, PureComponent } from "react";
import ProgramDetailsDescription from "shared/components/programs/program-details/program-details-description/program-details-description";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";

import ClosePeriodContainer from "./close-period/close-period-container";
import CloseProgramContainer from "./close-program/close-program-container";

const composeInvestmentData = programDetails => {
  const { statistic, personalProgramDetails } = programDetails;

  const { balanceBase, profitPercent } = statistic;

  return {
    pendingInput: personalProgramDetails.pendingInput,
    pendingOutput: personalProgramDetails.pendingOutput,
    id: programDetails.id,
    investedAmount: personalProgramDetails.value,
    balanceAmount: balanceBase.amount,
    balanceCurrency: balanceBase.currency,
    profitPercent,
    status: personalProgramDetails.status,
    value: personalProgramDetails.value
  };
};
class ProgramDetailsDescriptionSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ui: {
        isFavoritePending: false,
        isReinvestPending: false,
        isPending: false
      },
      programDescription: null,
      prevProps: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props.programDescription) {
      newState.prevProps = props.programDescription;
      newState.programDescription = props.programDescription;
      newState.ui = { isPending: props.programDescription };
    }

    return newState;
  }

  handleOnReinvestingClick = () => {
    const { ui, programDescription } = this.state;
    const { id, personalProgramDetails } = programDescription;
    const { isReinvest } = personalProgramDetails;

    const composeNewReinvestState = newState => ({
      ...programDescription,
      personalProgramDetails: {
        ...personalProgramDetails,
        isReinvest: !isReinvest
      }
    });

    this.setState({
      ui: { ...ui, isReinvestPending: true },
      programDescription: composeNewReinvestState(!isReinvest)
    });
    toggleReinvesting(id, isReinvest)
      .then(() => {
        this.setState({
          ui: { ...ui, isReinvestPending: false }
        });
      })
      .catch(e => {
        this.setState({
          programDescription: composeNewReinvestState(isReinvest),
          ui: { ...ui, isReinvestPending: false }
        });
      });
  };

  handleOnFavoriteClick = () => {
    const { ui, programDescription } = this.state;
    const { id, personalProgramDetails } = programDescription;
    const { isFavorite } = personalProgramDetails;

    const composeNewFavoriteState = newState => ({
      ...programDescription,
      personalProgramDetails: {
        ...personalProgramDetails,
        isFavorite: !isFavorite
      }
    });

    this.setState({
      ui: { ...ui, isFavoritePending: true },
      programDescription: composeNewFavoriteState(!isFavorite)
    });
    toggleFavoriteProgram(id, isFavorite)
      .then(() => {
        this.setState({
          ui: { ...ui, isFavoritePending: false }
        });
      })
      .catch(e => {
        this.setState({
          programDescription: composeNewFavoriteState(isFavorite),
          ui: { ...ui, isFavoritePending: false }
        });
      });
  };

  render() {
    const {
      isAuthenticated,
      redirectToLogin,
      onChangeInvestmentStatus
    } = this.props;
    const { programDescription, ui } = this.state;
    if (!programDescription) return null;
    const isInvested =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.isInvested;
    const canWithdraw =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.canWithdraw;
    const isOwnProgram =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.isOwnProgram;
    return (
      <Fragment>
        <ProgramDetailsDescription
          ProgramReinvestingWidget={ProgramReinvestingWidget}
          ClosePeriodContainer={ClosePeriodContainer}
          CloseProgramContainer={CloseProgramContainer}
          ProgramDepositContainer={ProgramDepositContainer}
          AboutLevelsContainerComponent={AboutLevelsContainerComponent}
          ProgramDetailContext={ProgramDetailContext}
          AssetEditContainer={AssetEditContainer}
          PROGRAM={PROGRAM}
          ProgramWithdrawContainer={ProgramWithdrawContainer}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
          isInvested={isInvested}
          canWithdraw={canWithdraw}
          canInvest={isOwnProgram}
          programDescription={programDescription}
          onReinvestingClick={this.handleOnReinvestingClick}
          isReinvestPending={ui.isReinvestPending}
          onFavoriteClick={this.handleOnFavoriteClick}
          isFavoritePending={ui.isFavoritePending}
          composeInvestmentData={composeInvestmentData}
          onChangeInvestmentStatus={onChangeInvestmentStatus}
        />
      </Fragment>
    );
  }
}

export default ProgramDetailsDescriptionSection;
