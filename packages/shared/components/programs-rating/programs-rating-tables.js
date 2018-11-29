import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

class ProgramsRatingTables extends Component {
  render() {
    const { id, tab, rating } = this.props;
    return (
      <Fragment>
        {id && (
          <ProgramsRatingTable
            tab={tab}
            title="Your pretendents"
            managerId={id}
          />
        )}
        <ProgramsRatingStats rating={rating} />
        <ProgramsRatingTable tab={tab} title="Pretendents" />
      </Fragment>
    );
  }
}

export default compose(translate())(ProgramsRatingTables);
