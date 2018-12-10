import React, { Component } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";
import ProgramsTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

import { COLUMNS, PROGRAMS, SELF_PROGRAMS } from "./program-rating.constants";
import { getProgramsRating } from "./services/program-rating-service";

class ProgramsRatingTable extends Component {
  state = {
    currentPage: 1,
    itemsOnPage: 10,
    totalPages: 0
  };

  componentDidMount() {
    this.updateProgramsDispatch();
  }

  updatePaging = e => {
    this.setState({ currentPage: e + 1 }, () => this.updateProgramsDispatch());
  };

  updateProgramsDispatch = () => {
    const { managerId, tab, service } = this.props;
    const { itemsOnPage, currentPage } = this.state;
    service
      .getProgramsRating({
        managerId,
        tab,
        itemsOnPage,
        currentPage
      })
      .then(programs => {
        const totalPages = Math.ceil(programs.value.total / itemsOnPage);
        this.setState({
          currentPage,
          totalPages
        });
      });
  };

  render() {
    const { title, programs, isPending, disableTitle } = this.props;
    const { totalPages, currentPage, itemsOnPage } = this.state;
    if (!programs || !programs.total) return null;
    return (
      <ProgramsTableModule
        disableTitle={disableTitle}
        isPending={isPending}
        columns={COLUMNS}
        showRating
        title={title}
        data={programs}
        paging={{ totalPages, currentPage, itemsOnPage }}
        updatePaging={this.updatePaging}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const table = props.managerId ? SELF_PROGRAMS : PROGRAMS;
  const programs = state.programsRating[table];
  const { isPending } = state.programsRating[table];
  if (!programs.data) return {};
  return { programs: programs.data, isPending };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getProgramsRating }, dispatch)
});
export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramsRatingTable);
