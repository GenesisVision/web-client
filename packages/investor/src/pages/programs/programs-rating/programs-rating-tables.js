import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import ProgramsRatingTable from "./programs-rating-table";
import ProgramsRatingStats from "./programs-rating-stats";

class ProgramsRatingTables extends Component {
  state = {
    pretendents: null,
    selfPretendents: null,
    isPending: true
  };

  render() {
    const { id, tab, rating, manager } = this.props;
    return (
      <Fragment>
        {id && (
          <ProgramsRatingTable
            tab={tab}
            title="Your pretendents"
            // managerId={id}
          />
        )}
        <ProgramsRatingStats rating={rating} />
        <ProgramsRatingTable tab={tab} title="Pretendents" />
      </Fragment>
    );
  }
}

export default compose(translate())(ProgramsRatingTables);
