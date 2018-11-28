import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";
import ProgramsTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

class ProgramsRatingTable extends Component {
  state = {
    programs: null,
    isPending: true,
    paging: {
      currentPage: 1,
      itemsOnPage: 10,
      totalPages: 0
    }
  };

  componentDidMount() {
    // const { tab } = this.props;
    this.updatePrograms();
  }

  updatePaging = e => {
    console.log(e);
    this.setState({ paging: { ...this.paging, currentPage: 2 } });
    this.updatePrograms({ page: 2 });
  };

  updatePrograms = filters => {
    const { managerId, tab } = this.props;
    const { paging } = this.state;
    fetchPrograms({ managerId, tab, ...filters }).then(programs => {
      const totalPages = Math.round(programs.total / paging.itemsOnPage);
      this.setState({
        programs,
        isPending: false,
        paging: { ...paging, totalPages }
      });
    });
  };

  render() {
    const { title } = this.props;
    const { programs, isPending, paging } = this.state;
    if (isPending) return null;
    return (
      <ProgramsTableModule
        title={title}
        data={programs}
        isPending={isPending}
        paging={paging}
        updatePaging={this.updatePaging}
      />
    );
  }
}

export default compose(translate())(ProgramsRatingTable);
