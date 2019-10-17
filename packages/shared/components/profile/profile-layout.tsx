import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Link from "shared/components/link/link";
import Page from "shared/components/page/page";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";

import {
  KYC_ROUTE,
  PROFILE,
  PROFILE_ROUTE,
  SECURITY,
  SECURITY_ROUTE,
  SETTINGS,
  SETTINGS_ROUTE,
  SOCIAL_LINKS,
  SOCIAL_LINKS_ROUTE,
  VERIFY
} from "./profile.constants";

const tabs = [
  { pathname: PROFILE_ROUTE, value: PROFILE },
  { pathname: KYC_ROUTE, value: VERIFY, hideable: true },
  { pathname: SETTINGS_ROUTE, value: SETTINGS },
  { pathname: SECURITY_ROUTE, value: SECURITY }
];

if (ROLE_ENV === ROLE.MANAGER) {
  tabs.push({ pathname: SOCIAL_LINKS_ROUTE, value: SOCIAL_LINKS });
}

const _ProfileLayout: React.FC<Props> = ({ route, children }) => {
  const [t] = useTranslation();
  const verified = useSelector(kycConfirmedSelector);
  const backPath = useSelector(
    (state: RootState) => state.router.location.state
  );
  const prevPath = useSelector(
    (state: RootState) => state.router.location.prevPath
  );
  return (
    <Page title={t("profile-page.title")}>
      <div className="app__main-wrapper">
        <h1>{t("profile-page.title")}</h1>
        <GVTabs value={route}>
          {tabs
            .filter(tab => !tab.hideable || !verified)
            .map(x => (
              <GVTab
                key={x.value}
                label={
                  <Link
                    to={{
                      pathname: x.pathname,
                      state: backPath
                    }}
                  >
                    {t(`profile-page.tabs.${x.value}`)}
                  </Link>
                }
                value={x.value}
              />
            ))}
        </GVTabs>
      </div>
      {children}
    </Page>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  route: string;
}

const ProfileLayout = React.memo(_ProfileLayout);
export default ProfileLayout;
