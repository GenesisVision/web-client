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

class _FundReallocateHistory extends React.PureComponent<Props, State> {
  state: State = {
    isPending: false,
    data: undefined
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
  }

  render() {
    if (!this.state.data) return null;
    const data = {
      items: this.state.data.reallocations,
      total: this.state.data.total
    };

    return (
      <TableModule
        data={data}
        paging={{
          ...DEFAULT_PAGING,
          itemsOnPage: data.total
        }}
        getItems={this.fetchFundReallocate}
        columns={FUND_REALLOCATE_HISTORY_COLUMNS}
        renderHeader={(column: SortingColumn) => {
          return <FundStructureHeaderCell column={column} />;
        }}
        renderBodyRow={(item: any) => (
          <TableRow className="details-structure__row">
            <TableCell className="details-structure__cell fund-details-structure__cell">
              {moment(item.date).format()}
            </TableCell>
            <TableCell className="details-structure__cell">
              <FundAssetContainer
                //@ts-ignore
                assets={item.parts}
                type={FUND_ASSET_TYPE.SHORT}
                size={10}
                //@ts-ignore
                length={item.parts.length}
                hasPopoverList
              />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const FundReallocateHistory = React.memo(_FundReallocateHistory);

export default FundReallocateHistory;

interface Props {
  id: string;
  fetchFundReallocateHistory(
    fundId: string,
    filters?: FilteringType
  ): Promise<ReallocationsViewModel>;
}

interface State {
  isPending: boolean;
  data?: ReallocationsViewModel;
}
