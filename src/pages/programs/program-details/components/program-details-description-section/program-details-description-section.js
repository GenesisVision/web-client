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
    const { id, isReinvesting } = programDescription;
    this.setState({
      ui: { ...ui, isReinvestPending: true },
      programDescription: {
        ...programDescription,
        isReinvesting: !isReinvesting
      }
    });
    toggleReinvesting(id, isReinvesting)
      .catch(e => {
        this.setState({
          programDescription: {
            ...programDescription,
            isReinvesting: isReinvesting
          }
        });
      })
      .finally(() => {
        this.setState({
          ui: { ...ui, isReinvestPending: false }
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
