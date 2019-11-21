import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useRole from "hooks/use-role.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ROLE } from "shared/constants/constants";

const Tabs: React.FC<Props> = ({ authPartUrl }) => {
  const [t] = useTranslation();
  const role = useRole();
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
}

const AuthTabs = React.memo(Tabs);
export default AuthTabs;
