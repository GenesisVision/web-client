import React from "react";

import TraderRequest from "./program-request/program-request";

import "./program-request-list.css";

const TraderRequestList = ({ requests, currency, cancelRequest }) => {
  const renderRequestList = () => {
    if (requests.length === 0) {
      return <div>There are no requests.</div>;
    }

    return requests.map(x => (
      <TraderRequest
        key={x.id}
        request={x}
        currency={currency}
        cancelRequest={cancelRequest}
      />
    ));
  };
  return (
    <div className="program-request-list">
      <div className="program-container__header">My Requests</div>
      {renderRequestList()}
    </div>
  );
};

export default TraderRequestList;
