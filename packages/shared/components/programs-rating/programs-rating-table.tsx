import { CancelablePromise, ProgramsList } from "gv-api-web";
import * as React from "react";
import { withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import ProgramsTable from "shared/modules/programs-table/components/programs-table/programs-table";
import { RootState } from "shared/reducers/root-reducer";
import { MiddlewareDispatch } from "shared/utils/types";

import { COLUMNS, PROGRAMS, SELF_PROGRAMS } from "./program-rating.constants";
import {
  allProgramsSelector,
  selfProgramsSelector
} from "./reducers/programs-rating.reducers";
import {
  TGetProgramsRatingFilters,
  getProgramsRating
} from "./services/program-rating-service";

class _ProgramsRatingTable extends React.PureComponent<Props, State> {
  state = {
    currentPage: 1,
    itemsOnPage: 10,
    totalPages: 0
  };

  componentDidMount() {
    this.updateProgramsDispatch();
  }

  updatePaging = (e: number) => {
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
      .then(total => {
        const totalPages = Math.ceil(total / itemsOnPage);
        this.setState({
          currentPage,
          totalPages
        });
      });
  };

  render() {
    const { title, programs, disableTitle } = this.props;
    const { totalPages, currentPage, itemsOnPage } = this.state;
    if (!programs || !programs.total) return null;
    return (
      <ProgramsTable
        disableTitle={disableTitle}
        columns={COLUMNS}
        showRating
        title={title}
        data={programs.programs}
        paging={{ totalPages, currentPage, itemsOnPage }}
        updatePaging={this.updatePaging}
        toggleFavorite={(asset: any, updateRow: any) => {}}
      />
    );
  }
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  programs: props.managerId
    ? selfProgramsSelector(state)
    : allProgramsSelector(state)
});

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    getProgramsRating: (filters: TGetProgramsRatingFilters) =>
      dispatch(getProgramsRating(filters))
  }
});

interface OwnProps {
  title: string;
  tab: string;
  disableTitle?: boolean;
  managerId?: string;
}

interface StateProps {
  programs?: ProgramsList;
}

interface DispatchProps {
  service: {
    getProgramsRating: (
      filters: TGetProgramsRatingFilters
    ) => CancelablePromise<number>;
  };
}

interface Props extends OwnProps, StateProps, DispatchProps {}

interface State {
  currentPage: number;
  itemsOnPage: number;
  totalPages: number;
}

const ProgramsRatingTable = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_ProgramsRatingTable);
export default ProgramsRatingTable;
