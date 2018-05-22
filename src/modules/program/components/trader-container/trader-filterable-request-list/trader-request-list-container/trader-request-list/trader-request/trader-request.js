import moment from "moment";
import React from "react";
import Button from "../../../../../../../../components/button/button";
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
        {request.canCancelRequest ? (
          <Button primary label="Cancel" onClick={cancelRequest(request.id)} />
        ) : null}
      </div>
    </div>
  );
};

export default TraderRequest;
