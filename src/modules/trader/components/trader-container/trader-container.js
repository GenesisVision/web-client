import { connect } from "react-redux";
import React, { Component } from "react";

import TraderDetailContainer from "./trader-detail-container/trader-detail-container";
import TraderRequestListContainer from "./trader-request-list-container/trader-request-list-container";

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
