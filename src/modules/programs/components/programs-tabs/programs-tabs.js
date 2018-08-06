import { GVTab, GVTabs } from "gv-react-components/dist";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const ProgramsTabs = ({ t, tab, onChange }) => {
  const handleClick = e => {
    e.preventDefault();
  };
  return (
    <GVTabs value={tab} onChange={onChange}>
      <GVTab
        value={"explore"}
        label={
          <Link to="/programs/explore" onClick={handleClick}>
            {t("programs-page.tabs.explore")}
          </Link>
        }
      />
      <GVTab
        value={"favorites"}
        label={
          <Link to="/programs/favorites" onClick={handleClick}>
            {t("programs-page.tabs.favorites")}
          </Link>
        }
      />
    </GVTabs>
  );
};

export default translate()(ProgramsTabs);
