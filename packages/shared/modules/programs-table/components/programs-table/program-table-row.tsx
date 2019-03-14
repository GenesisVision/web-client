import * as React from "react";

import ProgramTableRowDetailed from "./program-table-row-detailed";
import ProgramTableRowShort from "./program-table-row-short";
import { ProgramDetails } from "gv-api-web";

interface IProgramTableRowProps {
  title: string;
  showRating: boolean;
  program: ProgramDetails;
  isAuthenticated: boolean;
  toggleFavorite(programId: string, isFavorite: boolean): void;
}

interface IProgramTableRowState {
  isDetailed: boolean;
}

class ProgramTableRow extends React.Component<
  IProgramTableRowProps,
  IProgramTableRowState
> {
  state = {
    isDetailed: false
  };

  openProgramDetail = () => {
    this.setState({ isDetailed: true });
  };

  closeProgramDetail = () => {
    this.setState({ isDetailed: false });
  };

  render() {
    const {
      title,
      program,
      isAuthenticated,
      toggleFavorite,
      showRating
    } = this.props;
    const { isDetailed } = this.state;
    if (isDetailed)
      return (
        <ProgramTableRowDetailed
          title={title}
          program={program}
          onCollapseClick={this.closeProgramDetail}
          isAuthenticated={isAuthenticated}
          toggleFavorite={toggleFavorite}
        />
      );
    return (
      <ProgramTableRowShort
        showRating={showRating}
        title={title}
        program={program}
        onExpandClick={this.openProgramDetail}
        toggleFavorite={toggleFavorite}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

export default ProgramTableRow;
