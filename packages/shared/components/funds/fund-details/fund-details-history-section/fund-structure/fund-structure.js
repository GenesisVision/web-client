import "shared/components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import { FUND_STRUCTURE_COLUMNS } from "shared/components/funds/fund-details/fund-details.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { formatValue } from "shared/utils/formatter";
import * as PropTypes from "prop-types";

class FundStructure extends Component {
  state = {
    isPending: false,
    data: null
  };

  fetchFundStructure = () => {
    this.setState({ isPending: true });
    const { id, fetchStructure } = this.props;
    return fetchStructure(id)
      .then(data => this.setState(data))
      .catch(error => this.setState(error));
  };

  componentDidMount() {
    this.fetchFundStructure();
  }

  render() {
    const { t } = this.props;

    if (!this.state.data) return null;
    const data = {
      items: this.state.data.assets,
      total: this.state.data.assets.length
    };
    return (
      <TableModule
        data={data}
        paging={{
          ...DEFAULT_PAGING,
          itemsOnPage: data.total
        }}
        getItems={this.fetchFundStructure}
        columns={FUND_STRUCTURE_COLUMNS}
        renderHeader={column => (
          <span
            className={`details-structure__head-cell fund-details-structure__cell--${
              column.name
            }`}
          >
            {t(`fund-details-page.history.structure.${column.name}`)}
          </span>
        )}
        renderBodyRow={item => (
          <TableRow className="details-structure__row">
            <TableCell className="details-structure__cell fund-details-structure__cell">
              {item.asset}
            </TableCell>
            <TableCell className="details-structure__cell">
              <div className="details-structure__symbol">
                <FundAssetImage url={item.icon} alt={item.symbol} />
                <div className="details-structure__symbol-name">
                  {item.symbol}
                </div>
              </div>
            </TableCell>
            <TableCell className="details-structure__cell fund-details-structure__cell">
              <NumberFormat
                value={formatValue(item.target)}
                suffix={"%"}
                displayType="text"
              />
            </TableCell>
            <TableCell className="details-structure__cell fund-details-structure__cell">
              <NumberFormat
                value={formatValue(item.current)}
                suffix={"%"}
                displayType="text"
              />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

FundStructure.propTypes = {
  id: PropTypes.string.isRequired,
  fetchStructure: PropTypes.func.isRequired
};

export default translate()(FundStructure);
