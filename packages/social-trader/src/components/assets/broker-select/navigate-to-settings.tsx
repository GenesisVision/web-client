import { Button } from "components/button/button";
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
      <Link to={linkCreator(KYC_ROUTE, KYC_ROUTE, t("create-account:title"))}>
        <Button color="primary" variant="outlined">
          {t("buttons.verify")}
        </Button>
      </Link>
    );
  return (
    <Button color="primary" onClick={navigateToSettings}>
      {t("buttons.continue")}
    </Button>
  );
};

const NavigateToSettings = React.memo(_NavigateToSettings);
export default NavigateToSettings;
