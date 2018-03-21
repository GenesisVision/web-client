import React from "react";

const TraderRequest = ({ request, cancelRequest }) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-2">{request.type}</div>
        <div className="col-5">{request.amount} gvt</div>
        <div className="col-2">{request.status}</div>
        <div className="col-2">{new Date(request.date).toDateString()}</div>
        <div className="col-1">
          {request.status === "New" ? (
            <button
              className="btn btn-outline-primary"
              onClick={cancelRequest(request.id)}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TraderRequest;
