import { toggleFavoriteProgram } from "modules/favorite-program/services/favorite-program.service";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import React, { Fragment, PureComponent } from "react";

import ProgramDetailsDescription from "./program-details-description/program-details-description";
import ProgramDetailsInvestment from "./program-details-investment/program-details-investment";

const composeInvestmentData = programDetails => {
  const { statistic, personalProgramDetails } = programDetails;

  const { balanceBase, profitPercent } = statistic;

  return {
    programId: programDetails.id,
    investedAmount: personalProgramDetails.value,
    balanceAmount: balanceBase.amount,
    balanceCurrency: balanceBase.currency,
    profitPercent,
    status: personalProgramDetails.investmentProgramStatus
  };
};
class ProgramDetailsDescriptionSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ui: {
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
    const { programDescription, ui } = this.state;
    if (!programDescription || ui.isPending) return null;
    const isInvested =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.isInvested;
    return (
      <Fragment>
        <ProgramDetailsDescription
          isInvested={isInvested}
          programDescription={programDescription}
          onReinvestingClick={this.handleOnReinvestingClick}
          isReinvestPending={ui.isReinvestPending}
          onFavoriteClick={this.handleOnFavoriteClick}
          isFavoritePending={ui.isFavoritePending}
        />
        {isInvested && (
          <ProgramDetailsInvestment
            className={"program-details-description__your-investment"}
            {...composeInvestmentData(programDescription)}
          />
        )}
      </Fragment>
    );
  }
}

export default ProgramDetailsDescriptionSection;
