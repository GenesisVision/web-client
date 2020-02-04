import classNames from "classnames";
import GVqr from "components/gv-qr/gv-qr";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const GoogleStep2: React.FC<Props> = ({
  t,
  authenticatorUri,
  sharedKey,
  className
}) => (
  <div className={classNames("google-auth__step", className)}>
    <div className="google-auth__count">02</div>
    <div className="google-auth__title">{t("2fa-page.scan-code")}</div>
    <div className="google-auth__qr">
      <GVqr value={authenticatorUri} />
    </div>
    <p className="google-auth__alt-text">{t("2fa-page.alt-code")}</p>
    <div className="google-auth__alt-code">{sharedKey}</div>
  </div>
);

interface Props extends WithTranslation {
  authenticatorUri: string;
  sharedKey: string;
  className?: string;
}

const GoogleCodeStep = translate()(React.memo(GoogleStep2));

export default GoogleCodeStep;
