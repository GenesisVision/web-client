import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Page from "shared/components/page/page";

import { KYC_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from "./profile.constants";

const _ProfileLayout: React.FC<Props> = ({ route, children, t }) => (
  <Page title={t("profile-page.title")}>
    <div className="app__main-wrapper">
      <h1>{t("profile-page.title")}</h1>
      <GVTabs value={route}>
        <GVTab
          label={
            <Link to={PROFILE_ROUTE}>
              {t("profile-page.tabs.personal-details")}
            </Link>
          }
          value="details"
        />
        <GVTab
          label={<Link to={KYC_ROUTE}>{t("profile-page.tabs.verify")}</Link>}
          value="verify"
        />
        <GVTab
          label={
            <Link to={SETTINGS_ROUTE}>{t("profile-page.tabs.settings")}</Link>
          }
          value="settings"
        />
      </GVTabs>
      {children}
    </div>
  </Page>
);

interface Props extends InjectedTranslateProps {
  route: string;
}

const ProfileLayout = React.memo(translate()(_ProfileLayout));
export default ProfileLayout;
