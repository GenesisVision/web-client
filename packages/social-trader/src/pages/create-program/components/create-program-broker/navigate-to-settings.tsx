import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";
import { KYC_ROUTE } from "shared/components/profile/profile.constants";

const _NavigateToSettings: React.FC<OwnProps & WithTranslation> = ({
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
          state: `/ ${t("create-program-page.title")}`
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
