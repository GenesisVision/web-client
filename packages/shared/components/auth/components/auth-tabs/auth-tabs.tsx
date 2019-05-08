import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ROLE, ROLE_ENV } from "shared/constants/constants";

const Tabs: React.FC<Props & InjectedTranslateProps> = ({ t, authPartUrl }) => {
  return (
    <GVTabs value={ROLE_ENV}>
      <GVTab
        value={ROLE.INVESTOR}
        label={
          (ROLE_ENV === ROLE.MANAGER && (
            <a href={process.env.REACT_APP_INVESTOR_PORTAL_URL + authPartUrl}>
              {t("auth.tabs.investor")}
            </a>
          )) ||
          t("auth.tabs.investor")
        }
      />
      <GVTab
        value={ROLE.MANAGER}
        label={
          (ROLE_ENV === ROLE.INVESTOR && (
            <a href={process.env.REACT_APP_MANAGER_PORTAL_URL + authPartUrl}>
              {t("auth.tabs.manager")}
            </a>
          )) ||
          t("auth.tabs.manager")
        }
      />
    </GVTabs>
  );
};

interface Props {
  authPartUrl: string;
}

const AuthTabs = translate()(Tabs);
export default AuthTabs;
