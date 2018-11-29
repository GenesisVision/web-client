import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

class ProgramsRatingTables extends Component {
  render() {
    const { id, tab, levelData } = this.props;
    return (
      <Fragment>
        {id && (
          <ProgramsRatingTable
            tab={tab}
            title="Your pretendents"
            managerId={id}
          />
        )}
        {levelData && <ProgramsRatingStats levelData={levelData} />}
        <ProgramsRatingTable tab={tab} title="Pretendents" />
      </Fragment>
    );
  }
}

export default compose(translate())(ProgramsRatingTables);
