import React, { Component, Fragment } from "react";

import ReallocateForm from "./reallocate-form";
import ReallocateTop from "./reallocate-top";

class ReallocatePopup extends Component {
  render() {
    const {
      assets,
      remainder,
      submitInfo,
      reallocate,
      serverError
    } = this.props;
    return (
      <Fragment>
        <ReallocateTop />
        <ReallocateForm
          assets={assets}
          remainder={remainder}
          disabled={submitInfo.isPending}
          onSubmit={reallocate}
          errorMessage={submitInfo.errorMessage}
          serverError={serverError}
        />
      </Fragment>
    );
  }
}

export default ReallocatePopup;
