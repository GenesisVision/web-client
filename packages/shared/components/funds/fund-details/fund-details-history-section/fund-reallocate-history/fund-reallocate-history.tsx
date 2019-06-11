import "shared/components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import { FundAssetInfo, FundAssetsListInfo } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { FUND_REALLOCATE_HISTORY_COLUMNS } from "shared/components/funds/fund-details/fund-details.constants";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

import FundStructureHeaderCell from "../fund-structure/fund-structure-header-cell";

interface Props {
  id: string;
  fetchStructure(id: string): Promise<FundAssetsListInfo>;
}

interface State {
  isPending: boolean;
  data?: FundAssetsListInfo;
}

class _FundReallocateHistory extends React.PureComponent<
  Props & InjectedTranslateProps,
  State
> {
  state: State = {
    isPending: false,
    data: undefined
  };

  fetchFundStructure: GetItemsFuncType = () => {
    this.setState({ isPending: true });
    const { id, fetchStructure } = this.props;
    return fetchStructure(id).then(data => {
      this.setState({ data, isPending: false });
      return { items: data.assets, total: data.assets.length };
    });
  };

  componentDidMount() {
    this.fetchFundStructure();
  }

  render() {
    const { t } = this.props;

    // if (!this.state.data) return null;
    // const data = {
    //   items: this.state.data.assets,
    //   total: this.state.data.assets.length
    // };

    const { assets } = {
      assets: [
        {
          currentAssets: [
            {
              icon: "15c50486-a4fb-4c19-be6a-194eaefb262d",
              color: "#21b2ce",
              name: "Waltonchain",
              asset: "WTC",
              percent: 78.0
            },
            {
              icon: "b2dcb7e5-4119-4098-963d-bd5ff329b536",
              color: "#83074c",
              name: "Chainlink",
              asset: "LINK",
              percent: 10.0
            },
            {
              icon: "fdd088bb-20dc-4710-ac97-8f0390fd9839",
              color: "#2b3775",
              name: "Baelf",
              asset: "ELF",
              percent: 10.0
            },
            {
              icon: "39f2aca5-d9fa-4f1b-9fa3-db2591d97708",
              color: "#7b0087",
              name: "Quantstamp",
              asset: "QSP",
              percent: 2.0
            }
          ]
        }
      ]
    };

    const data = {
      items: assets,
      total: assets.length
    };
    return (
      <TableModule
        data={data}
        paging={{
          ...DEFAULT_PAGING,
          itemsOnPage: data.total
        }}
        getItems={this.fetchFundStructure}
        columns={FUND_REALLOCATE_HISTORY_COLUMNS}
        renderHeader={(column: SortingColumn) => {
          return <FundStructureHeaderCell column={column} />;
        }}
        renderBodyRow={(item: FundAssetInfo) => (
          <TableRow className="details-structure__row">
            <TableCell className="details-structure__cell fund-details-structure__cell">
              {moment(new Date()).format()}
            </TableCell>
            <TableCell className="details-structure__cell">
              <FundAssetContainer
                //@ts-ignore
                assets={item.currentAssets}
                type={FUND_ASSET_TYPE.SHORT}
                size={3}
                //@ts-ignore
                length={item.currentAssets.length}
              />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const FundReallocateHistory = translate()(_FundReallocateHistory);

export default FundReallocateHistory;
