import React from "react";
import moment from "moment";

import "./trader-request.css";

const TraderRequest = ({ request, token, cancelRequest }) => {
  return (
    <div className="trader-request__row">
      <div className="trader-request__type">{request.type}</div>
      <div className="trader-request__amount">
        {request.amount} {token.tokenSymbol}
      </div>
      <div className="trader-request__status">{request.status}</div>
      <div className="trader-request__date">
        {moment(request.date).format("L")}
      </div>
      {request.status === "New" ? (
        <div className="trader-request__cancel">
          <button
            className="gv-btn gv-btn-primary"
            onClick={cancelRequest(request.id)}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TraderRequest;
