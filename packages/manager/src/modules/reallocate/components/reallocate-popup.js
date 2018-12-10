import React, { Component } from "react";

import ReallocateForm from "./reallocate-form";

class ReallocatePopup extends Component {
  render() {
    const {
      assets,
      remainder,
      submitInfo,
      reallocate,
      errorMessage
    } = this.props;
    return (
      <ReallocateForm
        assets={assets}
        remainder={remainder}
        disabled={submitInfo.isPending}
        onSubmit={reallocate}
        errorMessage={errorMessage}
      />
    );
  }
}

export default ReallocatePopup;
