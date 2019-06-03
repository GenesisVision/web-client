import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/withRole";

const Tabs: React.FC<Props> = ({ role, t, authPartUrl }) => {
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

interface Props extends OwnProps, WithRoleProps, InjectedTranslateProps {}

interface OwnProps {
  authPartUrl: string;
}

const AuthTabs = withRole<OwnProps>(translate()(Tabs));
export default AuthTabs;
