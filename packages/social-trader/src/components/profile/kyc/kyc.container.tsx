import "./kyc.scss";

import * as React from "react";

import { loadKycIFrame } from "../settings/services/kyc.service";

class KYCContainer extends React.PureComponent {
  componentDidMount() {
    loadKycIFrame();
  }
  render() {
    return <div id="idensic" className="idensic" />;
  }
}

export default KYCContainer;
