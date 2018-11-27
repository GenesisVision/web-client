import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";
import replaceParams from "shared/utils/replace-params";
import { translate } from "react-i18next";

import { GVTab, GVTabs } from "gv-react-components";

class NavigationTabsContainer extends Component {
  render() {
    const { t, tabs, programFacetRoute, tab, handleTabChange } = this.props;
    return (
      <GVTabs value={tab} onChange={handleTabChange}>
        {tabs.map(tab => (
          <GVTab
            key={tab.name}
            value={tab.name}
            label={
              <Link
                to={replaceParams(programFacetRoute, {
                  ":tab": tab.name
                })}
              >
                {t(tab.name)}
              </Link>
            }
          />
        ))}
      </GVTabs>
    );
  }
}

export default compose(
  translate(),
  isAuthenticated,
  withRouter
)(NavigationTabsContainer);
