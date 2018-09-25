import React, { PureComponent } from "react";

import ProgramDetailsDescription from "./program-details-description";
import ProgramDetailsDescriptionStub from "./propgram-details-description-stub";

class ProgramDetailsDescriptionSection extends PureComponent {
  render() {
    const { programDetailsData } = this.props;
    const programDetails = programDetailsData.data;
    if (!programDetails || programDetailsData.isPending) {
      return <ProgramDetailsDescriptionStub />;
    }
    return <ProgramDetailsDescription programDetails={programDetails} />;
  }
}

export default ProgramDetailsDescriptionSection;
