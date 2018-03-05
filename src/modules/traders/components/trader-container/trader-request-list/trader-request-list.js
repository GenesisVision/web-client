import React from "react";

import TraderRequest from "./trader-request/trader-request";

const TraderRequestList = ({ requests }) => {
  return (
    <div>
      <h2>Deal List</h2>
      {requests.map(x => <TraderRequest key={x.id} request={x} />)}
    </div>
  );
};

export default TraderRequestList;
