import "./security.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import ProfileLayout from "shared/components/profile/profile-layout";
import LogoutButtonContainer from "shared/components/profile/settings/logout-button/logout-button-container";
import SettingsBlock from "shared/components/settings-block/settings-block";
import TwoFactorAuthContainer from "shared/modules/2fa/2fa-container";
import PasswordChange from "shared/modules/password-change/password-change";

import { SECURITY } from "../profile.constants";

const _SecurityPage: React.FC<WithTranslation> = ({ t }) => (
  <ProfileLayout route={SECURITY}>
    <div className="asset-settings profile__container--padding-top">
      <SettingsBlock
        label={t("2fa-page.title")}
        content={<TwoFactorAuthContainer />}
      />
      <SettingsBlock
        content={
          <>
            <PasswordChange />
            <LogoutButtonContainer />
          </>
        }
      />
    </div>
  </ProfileLayout>
);

const SecurityPage = translate()(React.memo(_SecurityPage));
export default SecurityPage;
