import { GVTab, GVTabs } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const Tabs = ({ t, authPartUrl }) => {
  return (
    <GVTabs value={"manager"}>
      <GVTab
        value={"investor"}
        label={
          <a href={process.env.REACT_APP_INVESTOR_PORTAL_URL + authPartUrl}>
            {t("auth.tabs.investor")}
          </a>
        }
      />
      <GVTab value={"manager"} label={t("auth.tabs.manager")} />
    </GVTabs>
  );
};

const AuthTabs = translate()(Tabs);
export default AuthTabs;
