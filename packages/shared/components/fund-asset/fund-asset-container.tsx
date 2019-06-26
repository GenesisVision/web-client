import "./fund-asset.scss";

import classNames from "classnames";
import { FundAssetPercent } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import Tooltip from "shared/components/tooltip/tooltip";
import { CurrencyEnum } from "shared/utils/types";

import FundAsset, { FUND_ASSET_TYPE } from "./fund-asset";
import FundAssetTooltip from "./fund-asset-tooltip/fund-asset-tooltip";

class FundAssetContainer extends React.PureComponent<Props, State> {
  state = {
    size: this.props.size
  };

  expandList = () => {
    this.setState({ size: this.props.assets.length });
  };

  render() {
    const {
      assets,
      type,
      length,
      removable,
      removeHandle,
      remainder = 0,
      hoveringAsset
    } = this.props;
    const { size } = this.state;
    return (
      <div
        className={classNames("fund-assets", {
          "fund-assets--text": type === FUND_ASSET_TYPE.TEXT
        })}
      >
        {assets.map(
          (asset, idx) =>
            idx < (size || assets.length) && (
              <Tooltip
                key={idx}
                render={() => (
                  <FundAssetTooltip
                    name={asset.name}
                    currency={asset.asset as CurrencyEnum} //TODO remove when api update
                  />
                )}
              >
                <FundAsset
                  {...asset}
                  currency={asset.asset as CurrencyEnum} //TODO remove when api update
                  type={type}
                  last={idx === assets.length - 1}
                  removable={removable}
                  removeHandle={removeHandle}
                  className={
                    hoveringAsset === asset.asset
                      ? "fund-asset--hover"
                      : undefined
                  }
                />
              </Tooltip>
            )
        )}
        {size && size < (length || assets.length) && (
          <HidedAssets
            count={(length || assets.length) - size}
            type={type}
            expandList={this.expandList}
          />
        )}
        {remainder > 0 && (
          <div className="fund-asset fund-asset--remainder">
            <NumberFormat value={remainder} suffix="%" displayType="text" />
          </div>
        )}
      </div>
    );
  }
}

const _HidedAssets: React.FC<IHidedAssetsProps> = ({
  type,
  count,
  expandList
}) => {
  switch (type) {
    case FUND_ASSET_TYPE.TEXT:
      return <div>... +{count}</div>;
    default:
      return (
        <div
          className="fund-asset__container fund-asset__container--others-count"
          onClick={expandList}
        >
          <div className="fund-asset fund-asset--others-count">+{count}</div>
        </div>
      );
  }
};
const HidedAssets = React.memo(_HidedAssets);

interface IHidedAssetsProps {
  count: number;
  type: FUND_ASSET_TYPE;
  expandList: () => void;
}

export type FundAssetRemoveType = (
  currency: string
) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

interface Props {
  assets: FundAssetPercent[];
  type: FUND_ASSET_TYPE;
  size?: number;
  length?: number;
  removable?: boolean;
  removeHandle?: FundAssetRemoveType;
  remainder?: number;
  hoveringAsset?: string;
}

interface State {
  size?: number;
}

export default FundAssetContainer;
