import classnames from "classnames";
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
  status: "Done" | "Pending" | "Canceled" | "Error";
  className?: string;
};

const Status: React.FC<IStatus> = props => {
  return (
    <img
      className={classnames(props.className)}
      src={statuses[props.status]}
      alt={`status ${props.status}`}
    />
  );
};

export default Status;
