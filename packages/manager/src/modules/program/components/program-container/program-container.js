import { connect } from "react-redux";
import React, { PureComponent } from "react";

import ProgramDetailContainer from "./program-detail-container/program-detail-container";
import ProgramFilterableDealList from "./program-filterable-deal-list/program-filterable-deal-list";
import ProgramFilterableRequestList from "./program-filterable-request-list/program-filterable-request-list";
import ProgramHistoryContainer from "./program-history-container/program-history-container";
import programService from "../../service/program-service";

import "./program-container.css";

class ProgramContainer extends PureComponent {
  componentWillUnmount() {
    this.props.clearProgram();
  }
  render() {
    const { programId } = this.props.match.params;
    const { isAuthenticated } = this.props;
    return (
      <div className="program-container">
        <ProgramDetailContainer
          programId={programId}
          isAuthenticated={isAuthenticated}
        />
        <ProgramHistoryContainer programId={programId} />
        <ProgramFilterableDealList programId={programId} />
        {isAuthenticated && (
          <ProgramFilterableRequestList programId={programId} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

const mapDispatchToProps = {
  clearProgram: programService.clearProgram
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgramContainer);
