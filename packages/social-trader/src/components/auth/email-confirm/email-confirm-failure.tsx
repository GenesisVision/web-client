import "./email-confirm-failure.scss";

import withLoader, { WithLoaderProps } from "decorators/with-loader";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

const _EmailConfirmFailure: React.FC<Props> = ({ t, errorMessage }) => (
  <div className="email-confirm-failure">
    <div className="email-confirm-failure__main-text">
      {t("auth.email-confirm.error-during-confirmation")}
    </div>
    <div className="email-confirm-failure__error-text">{errorMessage}</div>
  </div>
);

interface OwnProps {
  errorMessage: string;
}
interface Props extends WithTranslation, OwnProps {}

const EmailConfirmFailure = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_EmailConfirmFailure);
export default EmailConfirmFailure;
