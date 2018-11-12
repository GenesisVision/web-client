import "./program-search-popup.css";

import React, { Fragment, PureComponent } from "react";

import ProgramSearchContentLoader from "./program-search-content-loader/program-search-content-loader";
import ProgramSearchProgram from "./program-search-program/program-search-program";

class ProgramSearchPopup extends PureComponent {
  renderPrograms = () => {
    const { programsData, onProgramClick } = this.props;
    const { data: programs } = programsData;
    if (!programs) return <ProgramSearchContentLoader />;
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
