import "./settings.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import ProfileLayout from "shared/components/profile/profile-layout";
import { SETTINGS } from "shared/components/profile/profile.constants";
import SettingsBlock from "shared/components/settings-block/settings-block";
import CurrencySelectContainer from "shared/modules/currency-select/components/currency-select-container";

import PublicSelect from "./public-select/public-select";

const _SettingsPage: React.FC<WithTranslation> = ({ t }) => (
  <ProfileLayout route={SETTINGS}>
    <SettingsBlock label={t("profile-page.settings.platform-currency")}>
      <CurrencySelectContainer />
    </SettingsBlock>
    <SettingsBlock>
      <PublicSelect />
    </SettingsBlock>
  </ProfileLayout>
);

const SettingsPage = translate()(React.memo(_SettingsPage));
export default SettingsPage;
