import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  navigateToSettings: VoidFunction;
  isForex: boolean;
  isKycConfirmed: boolean;
}

const _NavigateToSettings: React.FC<Props> = ({
  isForex,
  isKycConfirmed,
  navigateToSettings
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  if (isForex && !isKycConfirmed)
    return (
      <Link
        to={linkCreator(KYC_ROUTE, KYC_ROUTE, t("create-account-page.title"))}
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

const NavigateToSettings = React.memo(_NavigateToSettings);
export default NavigateToSettings;
