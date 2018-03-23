import { connect } from "react-redux";
import React, { Component } from "react";

import TraderDetailContainer from "./trader-detail-container/trader-detail-container";
import TraderFilterableDealList from "./trader-filterable-deal-list/trader-filterable-deal-list";
import TraderFilterableRequestList from "./trader-filterable-request-list/trader-filterable-request-list";
import TraderHistoryContainer from "./trader-history-container/trader-history-container";

import "./trader-container.css";

class TraderContainer extends Component {
  render() {
    const { traderId } = this.props.match.params;
    const { isAuthenticated } = this.props;
    return (
      <div className="trader-container">
        <TraderDetailContainer
          traderId={traderId}
          isAuthenticated={isAuthenticated}
        />
        <TraderHistoryContainer traderId={traderId} />
        <TraderFilterableDealList traderId={traderId} />
        {isAuthenticated && <TraderFilterableRequestList traderId={traderId} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(TraderContainer);
