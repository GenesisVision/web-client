import { GVTab, GVTabs } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ROLE } from "shared/constants/constants";

const Tabs: React.FC<Props & InjectedTranslateProps> = ({
  t,
  authPartUrl,
  role
}) => {
  return (
    <GVTabs value={role}>
      <GVTab
        value={ROLE.INVESTOR}
        label={
          (role === ROLE.MANAGER && (
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
          (role === ROLE.INVESTOR && (
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
  role: ROLE;
}

const AuthTabs = translate()(Tabs);
export default AuthTabs;
