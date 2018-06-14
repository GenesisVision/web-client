import React, { Fragment, PureComponent } from "react";
import ProgramSearchProgram from "./program-search-program/program-search-program";

import "./program-search-popup.css";

class ProgramSearchPopup extends PureComponent {
  renderPrograms = () => {
    const { programsData, onProgramClick } = this.props;
    const { data: programs } = programsData;
    if (!programs) return null;
    if (programs.total === 0)
      return <div>Your search did not match any programs.</div>;

    return (
      <Fragment>
        <div className="program-search-popup__result">
          Found {programs.total}
          {programs.total > 10 && <span> / first 10 displayed</span>}
        </div>
        {programs.investmentPrograms.map(x => (
          <ProgramSearchProgram
            key={x.id}
            program={x}
            onProgramClick={onProgramClick}
          />
        ))}
      </Fragment>
    );
  };
  render() {
    return <div className="program-search-popup">{this.renderPrograms()}</div>;
  }
}

export default ProgramSearchPopup;
