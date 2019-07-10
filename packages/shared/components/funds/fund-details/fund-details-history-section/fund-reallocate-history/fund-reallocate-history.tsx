import "shared/components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import { ReallocationsViewModel } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { FUND_REALLOCATE_HISTORY_COLUMNS } from "shared/components/funds/fund-details/fund-details.constants";
import {
  FilteringType,
  SortingColumn
} from "shared/components/table/components/filtering/filter.type";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

import FundStructureHeaderCell from "../fund-structure/fund-structure-header-cell";
import { RootState } from "shared/reducers/root-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  isDesktop,
  isPhone,
  isPhoneLandscape,
  isTablet,
  isTabletLandscape
} from "shared/utils/breakpoints";

enum SIZE_ASSETS {
  isPhone = 3,
  isPhoneLandscape = 4,
  isTablet = 6,
  isTabletLandscape = 9,
  isDesktop = 11,
  isLargeDesktop = 13
}

class _FundReallocateHistory extends React.PureComponent<Props, State> {
  state: State = {
    isPending: false,
    data: undefined,
    size: undefined
  };

  fetchFundReallocate: GetItemsFuncType = () => {
    this.setState({ isPending: true });
    const { id, fetchFundReallocateHistory } = this.props;
    return fetchFundReallocateHistory(id).then(data => {
      this.setState({ data, isPending: false });
      return { items: data.reallocations, total: data.total };
    });
  };

  componentDidMount() {
    this.fetchFundReallocate();
    this.updateSizeAssets();
  }

  componentDidUpdate() {
    this.updateSizeAssets();
  }

  updateSizeAssets = () => {
    const innerWidth = this.props.innerWidth;
    const size = isPhone(innerWidth)
      ? SIZE_ASSETS.isPhone
      : isPhoneLandscape(innerWidth)
      ? SIZE_ASSETS.isPhoneLandscape
      : isTablet(innerWidth)
      ? SIZE_ASSETS.isTablet
      : isTabletLandscape(innerWidth)
      ? SIZE_ASSETS.isTabletLandscape
      : isDesktop(innerWidth)
      ? SIZE_ASSETS.isDesktop
      : SIZE_ASSETS.isLargeDesktop;
    this.setState({ size });
  };

  render() {
    return (
      <TableModule
        paging={DEFAULT_PAGING}
        getItems={this.fetchFundReallocate}
        columns={FUND_REALLOCATE_HISTORY_COLUMNS}
        renderHeader={(column: SortingColumn) => {
          return <FundStructureHeaderCell column={column} />;
        }}
        renderBodyRow={(item: any) => (
          <TableRow stripy>
            <TableCell className="details-structure__cell details-structure__cell--reallocate-date">
              {moment(item.date).format()}
            </TableCell>
            <TableCell className="details-structure__cell details-structure__cell--reallocate-funds">
              <div className="details-structure__funds-asset">
                <FundAssetContainer
                  //@ts-ignore
                  assets={item.parts}
                  type={FUND_ASSET_TYPE.SHORT}
                  size={this.state.size}
                  //@ts-ignore
                  length={item.parts.length}
                  hasPopoverList
                />
              </div>
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const mapStateToProps = ({ ui }: RootState): StateProps => ({
  innerWidth: ui.size.innerWidth
});

const FundReallocateHistory = compose<React.ComponentType<OwnProps>>(
  connect(mapStateToProps),
  React.memo
)(_FundReallocateHistory);

export default FundReallocateHistory;

interface OwnProps {
  id: string;
  fetchFundReallocateHistory(
    fundId: string,
    filters?: FilteringType
  ): Promise<ReallocationsViewModel>;
}

interface Props extends OwnProps, StateProps {}

interface State {
  isPending: boolean;
  data?: ReallocationsViewModel;
  size?: number;
}

interface StateProps {
  innerWidth: number;
}
