import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { translate } from "react-i18next";

import { GVTab, GVTabs } from "gv-react-components";
import Scrollbars from "react-custom-scrollbars";

class TabsContainer extends Component {
  render() {
    const { tabs, tab, handleTabChange } = this.props;
    return (
      <Scrollbars autoHeight autoHeightMax={40}>
        <GVTabs value={tab} onChange={handleTabChange}>
          {tabs.map(tab => (
            <GVTab key={tab} value={tab} label={tab} />
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
