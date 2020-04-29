import ProfileLayout from "components/profile/profile-layout";
import { SETTINGS } from "components/profile/profile.constants";
import SettingsBlock from "components/settings-block/settings-block";
import CurrencySelectContainer from "modules/currency-select/components/currency-select-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _SettingsPage: React.FC<WithTranslation> = ({ t }) => (
  <ProfileLayout route={SETTINGS}>
    <SettingsBlock label={t("profile-page.settings.platform-currency")}>
      <CurrencySelectContainer />
    </SettingsBlock>
  </ProfileLayout>
);

const SettingsPage = translate()(React.memo(_SettingsPage));
export default SettingsPage;
