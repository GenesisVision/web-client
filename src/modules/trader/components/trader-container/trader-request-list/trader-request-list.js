import React from "react";

import TraderRequest from "./trader-request/trader-request";

const TraderRequestList = ({ requests, cancelRequest }) => {
  return (
    <div>
      <h2>Deal List</h2>
      {requests.map(x => (
        <TraderRequest key={x.id} request={x} cancelRequest={cancelRequest} />
      ))}
    </div>
  );
};

export default TraderRequestList;
