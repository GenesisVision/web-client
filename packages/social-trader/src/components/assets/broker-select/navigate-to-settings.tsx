import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _NavigateToSettings: React.FC<OwnProps & WithTranslation> = ({
  t,
  isForex,
  isKycConfirmed,
  navigateToSettings
}) => {
  const { linkCreator } = useToLink();
  if (isForex && !isKycConfirmed)
    return (
      <Link
        to={linkCreator(KYC_ROUTE, KYC_ROUTE, t("create-program-page.title"))}
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
