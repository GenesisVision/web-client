import React, { Component } from "react";

import ReallocateForm from "./reallocate-form";

class ReallocatePopup extends Component {
  render() {
    const { assets, remainder, reallocate, errorMessage } = this.props;
    return (
      <ReallocateForm
        assets={assets}
        remainder={remainder}
        onSubmit={reallocate}
        errorMessage={errorMessage}
      />
    );
  }
}

export default ReallocatePopup;
