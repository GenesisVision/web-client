import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import replaceParams from "shared/utils/replace-params";
import { translate } from "react-i18next";

import { GVTab, GVTabs } from "gv-react-components";
import Scrollbars from "react-custom-scrollbars";

class TabsContainer extends Component {
  render() {
    const { t, tabs, programFacetRoute, tab, handleTabChange } = this.props;
    return (
      <Scrollbars autoHeight autoHeightMax={40}>
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
      </Scrollbars>
    );
  }
}

export default compose(
  translate(),
  withRouter
)(TabsContainer);
