import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

class ProgramsRatingTables extends Component {
  render() {
    const { t, id, tab, levelData } = this.props;
    return (
      <Fragment>
        {id && (
          <ProgramsRatingTable
            tab={tab}
            title={t("rating.self-pretendents-title")}
            managerId={id}
          />
        )}
        {levelData && <ProgramsRatingStats levelData={levelData} />}
        <ProgramsRatingTable tab={tab} title={t("rating.pretendents-title")} />
      </Fragment>
    );
  }
}

export default compose(translate())(ProgramsRatingTables);
