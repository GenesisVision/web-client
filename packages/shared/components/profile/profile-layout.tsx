import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Link from "shared/components/link/link";
import Page from "shared/components/page/page";
import { ROLE, ROLE_ENV } from "shared/constants/constants";

import {
  KYC_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  SOCIAL_LINKS_ROUTE
} from "./profile.constants";

const tabs = [
  { pathname: PROFILE_ROUTE, value: "details" },
  { pathname: KYC_ROUTE, value: "verify" },
  { pathname: SETTINGS_ROUTE, value: "settings" }
];

if (ROLE_ENV === ROLE.MANAGER) {
  tabs.push({ pathname: SOCIAL_LINKS_ROUTE, value: "social-links" });
}

const _ProfileLayout: React.FC<Props> = ({ t, route, children }) => {
  return (
    <Page title={t("profile-page.title")}>
      <div className="app__main-wrapper">
        <h1>{t("profile-page.title")}</h1>
        <GVTabs value={route}>
          {tabs.map(x => (
            <GVTab
              key={x.value}
              label={
                <Link to={x.pathname}>{t(`profile-page.tabs.${x.value}`)}</Link>
              }
              value={x.value}
            />
          ))}
        </GVTabs>
        {children}
      </div>
    </Page>
  );
};

const ProfileLayout = translate()(React.memo(_ProfileLayout));

export default ProfileLayout;

interface OwnProps {
  route: string;
}

interface Props extends OwnProps, WithTranslation {}
