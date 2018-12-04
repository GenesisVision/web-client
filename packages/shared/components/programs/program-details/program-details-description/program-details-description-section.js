import React, { Fragment, PureComponent } from "react";
import ProgramDetailsDescription from "shared/components/programs/program-details/program-details-description/program-details-description";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";

const composeInvestmentData = programDetails => {
  const { statistic, personalProgramDetails } = programDetails;
  const { balanceBase, profitPercent } = statistic;
  return {
    id: programDetails.id,
    balanceAmount: balanceBase.amount,
    balanceCurrency: balanceBase.currency,
    profitPercent,
    ...personalProgramDetails
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
    const { toggleReinvesting } = this.props;
    if (!toggleReinvesting) return null;
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
      .then(() => this.setState({ ui: { ...ui, isReinvestPending: false } }))
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
    const { programDescription, ui } = this.state;
    if (!programDescription) return null;
    return (
      <Fragment>
        <ProgramDetailsDescription
          onReinvestingClick={this.handleOnReinvestingClick}
          programDescription={programDescription}
          isReinvestPending={ui.isReinvestPending}
          onFavoriteClick={this.handleOnFavoriteClick}
          isFavoritePending={ui.isFavoritePending}
          investmentData={composeInvestmentData(programDescription)}
          {...programDescription.personalProgramDetails}
          {...this.props}
        />
      </Fragment>
    );
  }
}

export default ProgramDetailsDescriptionSection;
