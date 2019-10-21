import "./settings.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import ProfileLayout from "shared/components/profile/profile-layout";
import { SETTINGS } from "shared/components/profile/profile.constants";
import SettingsBlock from "shared/components/settings-block/settings-block";
import CurrencySelectContainer from "shared/modules/currency-select/components/currency-select-container";

const _SettingsPage: React.FC<WithTranslation> = ({ t }) => (
  <ProfileLayout route={SETTINGS}>
    <div className="asset-settings profile__container--padding-top">
      <SettingsBlock label={t("profile-page.settings.platform-currency")}>
        <CurrencySelectContainer className="header__currency" />
      </SettingsBlock>
    </div>
  </ProfileLayout>
);

const SettingsPage = translate()(React.memo(_SettingsPage));
export default SettingsPage;
