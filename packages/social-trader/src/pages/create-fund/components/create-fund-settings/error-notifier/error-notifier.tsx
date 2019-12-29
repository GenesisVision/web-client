import "./error-notifier.scss";

import { FormikErrors, FormikTouched } from "formik";
import * as React from "react";

const _ErrorNotifier = <V extends any>({
  errors,
  name,
  touched,
  placeholder
}: Props<V>) =>
  (errors[name] && touched[name] && (
    <div className="error-notify">{errors[name]}</div>
  )) || <div className="notify">{placeholder || ""}</div>;

const ErrorNotifier = React.memo(_ErrorNotifier);
export default ErrorNotifier;

interface Props<V> {
  errors: FormikErrors<V>;
  touched: FormikTouched<V>;
  name: string;
  placeholder?: string;
}
