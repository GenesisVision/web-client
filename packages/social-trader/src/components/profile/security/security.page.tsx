import ProfileLayout from "components/profile/profile-layout";
import LogoutButtonContainer from "components/profile/settings/logout-button/logout-button-container";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import TwoFactorAuthContainer from "modules/2fa/2fa-container";
import PasswordChange from "modules/password-change/password-change";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { SECURITY } from "../profile.constants";

const _SecurityPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <ProfileLayout route={SECURITY}>
      <SettingsBlock label={t("2fa-page.title")}>
        <TwoFactorAuthContainer />
      </SettingsBlock>
      <SettingsBlock>
        <div>
          <Row>
            <PasswordChange />
          </Row>
          <Row>
            <LogoutButtonContainer />
          </Row>
        </div>
      </SettingsBlock>
    </ProfileLayout>
  );
};

const SecurityPage = React.memo(_SecurityPage);
export default SecurityPage;
