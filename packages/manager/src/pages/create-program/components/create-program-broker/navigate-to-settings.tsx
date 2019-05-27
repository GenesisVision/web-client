import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.routes";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";
import { KYC_ROUTE } from "shared/components/profile/profile.constants";

const _NavigateToSettings: React.FC<OwnProps & InjectedTranslateProps> = ({
  t,
  isForex,
  isKycConfirmed,
  navigateToSettings
}) => {
  if (isForex && !isKycConfirmed)
    return (
      <Link
        to={{
          pathname: KYC_ROUTE,
          state: `/ ${t("manager.create-program-page.title")}`,
          prevPath: CREATE_PROGRAM_PAGE_ROUTE
        }}
      >
        <GVButton color="primary" variant="outlined">
          {t("buttons.verify")}
        </GVButton>
      </Link>
    );
  return (
    <GVButton color="primary" onClick={navigateToSettings}>
      {t("buttons.continue")}
    </GVButton>
  );
};

const NavigateToSettings = translate()(_NavigateToSettings);
export default NavigateToSettings;

interface OwnProps {
  navigateToSettings(): void;
  isForex: boolean;
  isKycConfirmed: boolean;
}
