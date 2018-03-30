import moment from "moment";
import React from "react";

import "./trader-request.css";

const TraderRequest = ({ request, token, cancelRequest }) => {
  const getRequestCurrency = () => {
    if (request.type === "Withdrawal") return token.tokenSymbol;
    return "GVT";
  };

  return (
    <div className="trader-request__row">
      <div className="trader-request__type trader-request__cell">
        {request.type}
      </div>
      <div className="trader-request__amount trader-request__cell">
        {request.amount} {getRequestCurrency()}
      </div>
      <div className="trader-request__status trader-request__cell">
        {request.status}
      </div>
      <div className="trader-request__date trader-request__cell">
        {moment(request.date).format("L")}
      </div>

      <div className="trader-request__cancel trader-request__cell">
        {request.status === "New" ? (
          <button
            className="gv-btn gv-btn-primary"
            onClick={cancelRequest(request.id)}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TraderRequest;
