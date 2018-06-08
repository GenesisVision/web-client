import React, { PureComponent } from "react";
import ProgramSearchProgram from "./program-search-program/program-search-program";

import "./program-search-popup.css";

class ProgramSearchPopup extends PureComponent {
  render() {
    const { programsData, onProgramClick } = this.props;
    const { isPending, data: programs } = programsData;
    if (isPending) {
      return <div>Loading...</div>;
    }

    return (
      <div className="program-search-popup">
        {programs.investmentPrograms.map(x => (
          <ProgramSearchProgram
            key={x.id}
            program={x}
            onProgramClick={onProgramClick}
          />
        ))}
      </div>
    );
  }
}

export default ProgramSearchPopup;
