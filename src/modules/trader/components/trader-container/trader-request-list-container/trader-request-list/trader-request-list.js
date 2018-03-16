import React from "react";

import TraderRequest from "./trader-request/trader-request";

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
    <div>
      <h2>Deal List</h2>
      {renderRequestList()}
    </div>
  );
};

export default TraderRequestList;
