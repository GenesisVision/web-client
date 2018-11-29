import "./kyc.scss";

import React, { Component } from "react";

import { loadKycIFrame } from "../settings/services/kyc.service";

class KYCContainer extends Component {
  componentDidMount() {
    loadKycIFrame();
  }
  render() {
    return <div id="idensic" className="idensic" />;
  }
}

export default KYCContainer;
