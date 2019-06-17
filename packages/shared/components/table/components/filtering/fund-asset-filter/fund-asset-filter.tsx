import "./fund-asset-filter.scss";

import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";

import { UpdateFilterFunc } from "../../table.types";
import TileFilter from "../tile-filter";
import TileFilterItem from "../tile-filter-item";
import FundAssetPopover from "./fund-asset-popover";

interface IFundAssetFilterProps {
  name: string;
  value: string[];
  values: PlatformAsset[];
  onChange: UpdateFilterFunc;
}

class FundAssetFilter extends React.PureComponent<IFundAssetFilterProps> {
  handleRemove = (asset: PlatformAsset) => () => {
    const value = this.props.value.filter(x => x !== asset.id);
    this.props.onChange({ name: this.props.name, value });
  };

  render() {
    const { name, values, value, onChange } = this.props;
    const selectedTiles = values
      .filter(x => value.includes(x.id))
      .map(asset => (
        <TileFilterItem key={asset.asset} remove={this.handleRemove(asset)}>
          <FundAssetImage url={asset.icon} alt={asset.asset} />
          <span className="fund-asset-filter__asset-name">{asset.asset}</span>
        </TileFilterItem>
      ));
    return (
      <TileFilter
        name={name}
        value={value}
        values={values}
        updateFilter={onChange}
        buttonTitle="Asset"
        selectedTiles={selectedTiles}
      >
        <FundAssetPopover value={value} values={values} />
      </TileFilter>
    );
  }
}

export default FundAssetFilter;
