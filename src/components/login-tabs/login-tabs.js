import { GVTab, GVTabs } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const Tabs = ({ t }) => {
  return (
    <GVTabs value={"investor"}>
      <GVTab value={"investor"} label={t("auth.tabs.investor")} />
      <GVTab
        value={"manager"}
        label={
          <a href={process.env.REACT_APP_MANAGER_PORTAL_URL}>
            {t("auth.tabs.manager")}
          </a>
        }
      />
    </GVTabs>
  );
};

const LoginTabs = translate()(Tabs);
export default LoginTabs;
