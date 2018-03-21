import { connect } from "react-redux";
import React, { Component } from "react";

import TraderDetailContainer from "./trader-detail-container/trader-detail-container";
import TraderFilterableDealList from "./trader-filterable-deal-list/trader-filterable-deal-list";
import TraderHistoryContainer from "./trader-history-container/trader-history-container";
import TraderRequestListContainer from "./trader-request-list-container/trader-request-list-container";

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
        {isAuthenticated && <TraderHistoryContainer traderId={traderId} />}
        {isAuthenticated && <TraderFilterableDealList traderId={traderId} />}
        {isAuthenticated && <TraderRequestListContainer traderId={traderId} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(TraderContainer);
