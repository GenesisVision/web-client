import { connect } from "react-redux";
import React, { Component } from "react";

import programService from "../../service/program-service";
import TraderDetailContainer from "./trader-detail-container/trader-detail-container";
import TraderFilterableDealList from "./trader-filterable-deal-list/trader-filterable-deal-list";
import TraderFilterableRequestList from "./trader-filterable-request-list/trader-filterable-request-list";
import TraderHistoryContainer from "./trader-history-container/trader-history-container";

import "./trader-container.css";

class TraderContainer extends Component {
  componentWillUnmount() {
    this.props.clearProgram();
  }
  render() {
    const { programId } = this.props.match.params;
    const { isAuthenticated } = this.props;
    return (
      <div className="trader-container">
        <TraderDetailContainer
          programId={programId}
          isAuthenticated={isAuthenticated}
        />
        <TraderHistoryContainer programId={programId} />
        <TraderFilterableDealList programId={programId} />
        {isAuthenticated && (
          <TraderFilterableRequestList programId={programId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TraderContainer);
