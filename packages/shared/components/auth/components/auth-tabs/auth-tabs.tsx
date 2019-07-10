import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

const Tabs: React.FC<Props> = ({ role, t, authPartUrl }) => (
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

interface Props extends OwnProps, WithRoleProps, WithTranslation {}

interface OwnProps {
  authPartUrl: string;
}

const AuthTabs = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(Tabs);
export default AuthTabs;
