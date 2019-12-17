import "./status.scss";

import classNames from "classnames";
import Error from "media/transactions/error.svg";
import Pending from "media/transactions/pending.svg";
import Success from "media/transactions/success.svg";
import * as React from "react";

const statuses = {
  Done: Success,
  Error: Error,
  Canceled: Error,
  Pending: Pending
};

export type IStatus = {
  withText?: boolean;
  status: "Done" | "Pending" | "Canceled" | "Error";
  className?: string;
};

const _Status: React.FC<IStatus> = ({ withText, className, status }) => {
  return (
    <div className="status">
      <img
        className={classNames(className)}
        src={statuses[status]}
        alt={`status ${status}`}
      />
      {withText && status}
    </div>
  );
};

const Status = React.memo(_Status);
export default Status;
