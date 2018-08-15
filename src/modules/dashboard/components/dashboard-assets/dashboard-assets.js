import "./dashboard-assets.scss";

import Surface from "components/surface/surface";
import React, { Component } from "react";

class DashboardAssets extends Component {
  state = {
    tab: "programs"
  };

  render() {
    return <Surface className="dashboard-assets">Assets</Surface>;
  }
}

export default DashboardAssets;
