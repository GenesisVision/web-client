import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import replaceParams from "shared/utils/replace-params";
import { translate } from "react-i18next";

import { GVTab, GVTabs } from "gv-react-components";

class TabsContainer extends Component {
  render() {
    const { t, tabs, programFacetRoute, tab, handleTabChange } = this.props;
    return (
      <GVTabs value={tab} onChange={handleTabChange}>
        {tabs.map(tab => (
          <GVTab
            key={tab}
            value={tab}
            label={tab}
            /*<Link
                to={replaceParams(programFacetRoute, {
                  ":tab": tab
                })}
              >
                {t(tab)}
              </Link>*/
          />
        ))}
      </GVTabs>
    );
  }
}

export default compose(
  translate(),
  withRouter
)(TabsContainer);
