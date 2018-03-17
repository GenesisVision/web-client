import React from "react";

import TraderRequest from "./trader-request/trader-request";

import "./trader-request-list.css";

const TraderRequestList = ({ requests, cancelRequest }) => {
  const renderRequestList = () => {
    if (requests.length === 0) {
      return <div>There are no deals.</div>;
    }

    return requests.map(x => (
      <TraderRequest key={x.id} request={x} cancelRequest={cancelRequest} />
    ));
  };
  return (
    <div className="trader-request-list">
      <div className="trader-container__header">Deals List</div>
      {renderRequestList()}
    </div>
  );
};

export default TraderRequestList;
