import AssetField from "components/assets/asset-fields/asset-field";
import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import Link from "components/link/link";
import { KYC_ROUTE } from "components/profile/profile.constants";
import SettingsBlock from "components/settings-block/settings-block";
import React from "react";
import { useTranslation } from "react-i18next";

const _KycRequiredBlock: React.FC = () => {
  const [t] = useTranslation();
  return (
    <SettingsBlock
      label={t("create-account-page.settings.kyc-required")}
      withBorder={false}
    >
      <AssetField wide>
        <FormTextField>
          {t("create-account-page.settings.kyc-required-text-1")}
        </FormTextField>
        <FormTextField>
          {t("create-account-page.settings.kyc-required-text-2")}
        </FormTextField>
      </AssetField>
      <AssetField>
        <Link className="level-calculator-popup__btn-verify" to={KYC_ROUTE}>
          <GVButton color="primary" variant="outlined">
            {t("buttons.verify")}
          </GVButton>
        </Link>
      </AssetField>
    </SettingsBlock>
  );
};

export const KycRequiredBlock = React.memo(_KycRequiredBlock);
