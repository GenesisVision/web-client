import React from "react";

const TraderRequest = ({ request }) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-2">{request.type}</div>
        <div className="col-7">
          {request.programName} (<span
            className="link"
            onClick={this.toggleDescription}
          >
            {request.amount} gvt
          </span>)
        </div>
        <div className="col-3">{new Date(request.date).toDateString()}</div>
      </div>
    </div>
  );
};

export default TraderRequest;
