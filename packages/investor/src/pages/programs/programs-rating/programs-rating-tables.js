import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";
import ProgramsTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";
import ProgramsRatingTable from "./programs-rating-table";

class ProgramsRatingTables extends Component {
  state = {
    pretendents: null,
    selfPretendents: null,
    isPending: true
  };

  render() {
    const { id, tab, manager } = this.props;
    return (
      <Fragment>
        {id && (
          <ProgramsRatingTable
            tab={tab}
            title="Your pretendents"
            managerId={id}
          />
        )}
        <ProgramsRatingTable tab={tab} title="Pretendents" />
      </Fragment>
    );
  }
}

export default compose(translate())(ProgramsRatingTables);
