import "./error-notifier.scss";

import React from "react";

class ErrorNotifier extends React.Component {
  render() {
    const { errors, name, touched, placeholder } = this.props;
    return (
      (errors[name] && touched[name] && (
        <div className="error-notify">{errors[name]}</div>
      )) || <div className="notify">{placeholder || ""}</div>
    );
  }
}
export default ErrorNotifier;
