import { ProgramDetailsFull } from "gv-api-web";
import React, { Fragment, PureComponent } from "react";
import ProgramDetailsDescription from "shared/components/programs/program-details/program-details-description/program-details-description";
import { PROGRAM } from "shared/constants/constants";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";

const composeInvestmentData = (programDetails: any) => {
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

interface IProgramDetailsDescriptionSectionProps {
  programDescription: ProgramDetailsFull;
}

class ProgramDetailsDescriptionSection extends PureComponent<
  IProgramDetailsDescriptionSectionProps
> {
  constructor(props: IProgramDetailsDescriptionSectionProps) {
    super(props);
    this.state = {
      ui: {
        isFavoritePending: false,
        isReinvestPending: false,
        isPending: false
      },
      prevProps: null
    };
  }

  render() {
    const { programDescription, ui } = this.state;
    if (!programDescription) return null;
    return (
      <ProgramDetailsDescription
        PROGRAM={PROGRAM}
        onReinvestingClick={this.handleOnReinvestingClick}
        programDescription={programDescription}
        isReinvestPending={ui.isReinvestPending}
        onFavoriteClick={this.handleOnFavoriteClick}
        isFavoritePending={ui.isFavoritePending}
        investmentData={composeInvestmentData(programDescription)}
        {...programDescription.personalProgramDetails}
        {...this.props}
      />
    );
  }
}

export default ProgramDetailsDescriptionSection;
