import "./program-request.css";

import moment from "moment";
import React from "react";

import Button from "../../../../../../../../components/button/button";

const ProgramRequest = ({ request, currency, cancelRequest }) => {
  const getRequestCurrency = () => {
    if (request.type === "Withdrawal") return currency;
    return "GVT";
  };

  return (
    <div className="program-request__row">
      <div className="trader-request__type program-request__cell">
        {request.type}
      </div>
      <div className="trader-request__amount program-request__cell">
        {request.amount} {getRequestCurrency()}
      </div>
      <div className="trader-request__status program-request__cell">
        {request.status}
      </div>
      <div className="trader-request__date program-request__cell">
        {moment(request.date).format("L")}
      </div>
      <div className="trader-request__cancel program-request__cell">
        {request.canCancelRequest ? (
          <Button label="Cancel" primary onClick={cancelRequest(request.id)} />
        ) : null}
      </div>
    </div>
  );
};

export default ProgramRequest;
