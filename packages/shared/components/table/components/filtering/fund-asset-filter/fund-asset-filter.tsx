import { PlatformAsset } from "gv-api-web";
import * as React from "react";

import { UpdateFilterFunc } from "../../table.types";
import TileFilter from "../tile-filter";
import FundAssetPopover from "./fund-asset-popover";

interface IFundAssetFilterProps {
  name: string;
  value: string[];
  values: PlatformAsset[];
  onChange: UpdateFilterFunc;
}

class FundAssetFilter extends React.PureComponent<IFundAssetFilterProps> {
  render() {
    const { values, value, onChange } = this.props;
    return (
      <TileFilter
        name={name}
        value={value}
        values={values}
        updateFilter={onChange}
      >
        <FundAssetPopover value={value} values={values} />
      </TileFilter>
    );
  }
}

export default FundAssetFilter;
