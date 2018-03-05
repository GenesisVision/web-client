import React from "react";

const TraderRequest = ({ request }) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-2">{request.type}</div>
        <div className="col-5">{request.amount} gvt</div>
        <div className="col-2">{request.status}</div>
        <div className="col-2">{new Date(request.date).toDateString()}</div>
        <div className="col-1">
          <button className="btn btn-outline-primary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TraderRequest;
