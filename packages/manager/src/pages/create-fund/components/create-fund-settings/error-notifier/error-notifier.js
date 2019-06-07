import "./error-notifier.scss";

import * as React from "react";

const ErrorNotifier = React.memo(
  ({ errors, name, touched, placeholder }) =>
    (errors[name] && touched[name] && (
      <div className="error-notify">{errors[name]}</div>
    )) || <div className="notify">{placeholder || ""}</div>
);

export default ErrorNotifier;
