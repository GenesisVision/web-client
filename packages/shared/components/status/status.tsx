import classnames from "classnames";
import * as React from "react";
import Error from "shared/media/transactions/error.svg";
import Pending from "shared/media/transactions/pending.svg";
import Success from "shared/media/transactions/success.svg";

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

const Status: React.FunctionComponent<IStatus> = props => {
  return (
    <img
      className={classnames(props.className)}
      src={statuses[props.status]}
      alt={`status ${props.status}`}
    />
  );
};

export default Status;
