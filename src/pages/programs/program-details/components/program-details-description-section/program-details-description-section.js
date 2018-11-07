import { toggleFavoriteProgram } from "modules/favorite-asset/services/favorite-program.service";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import React, { Fragment, PureComponent } from "react";

import ProgramDetailsDescription from "./program-details-description/program-details-description";

const composeInvestmentData = programDetails => {
  const { statistic, personalProgramDetails } = programDetails;

  const { balanceBase, profitPercent } = statistic;

  return {
    pendingInput: personalProgramDetails.pendingInput,
    pendingOutput: personalProgramDetails.pendingOutput,
    programId: programDetails.id,
    investedAmount: personalProgramDetails.invested,
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
    if (state.prevProps !== props.programDescriptionData) {
      newState.prevProps = props.programDescriptionData;
      newState.programDescription = props.programDescriptionData.data;
      newState.ui = { isPending: props.programDescriptionData.isPending };
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
      .catch(e => {
        this.setState({
          programDescription: composeNewReinvestState(isReinvest)
        });
      })
      .finally(() => {
        this.setState({
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
      .catch(e => {
        this.setState({
          programDescription: composeNewFavoriteState(isFavorite)
        });
      })
      .finally(() => {
        this.setState({
          ui: { ...ui, isFavoritePending: false }
        });
      });
  };

  render() {
    const {
      backPath,
      isAuthenticated,
      redirectToLogin,
      onChangeInvestmentStatus
    } = this.props;
    const { programDescription, ui } = this.state;
    if (!programDescription) return null;
    const isInvested =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.isInvested;
    const canInvest =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.canInvest;
    const canWithdraw =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.canWithdraw;
    return (
      <Fragment>
        <ProgramDetailsDescription
          backPath={backPath}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
          isInvested={isInvested}
          canInvest={canInvest}
          canWithdraw={canWithdraw}
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
