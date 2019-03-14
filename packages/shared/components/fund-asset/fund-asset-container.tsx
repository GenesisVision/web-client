import "./fund-asset.scss";

import classNames from "classnames";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import Tooltip from "shared/components/tooltip/tooltip";

import { CURRENCIES } from "../../modules/currency-select/currency-select.constants";
import FundAsset, { FUND_ASSET_TYPE } from "./fund-asset";
import FundAssetTooltip from "./fund-asset-tooltip/fund-asset-tooltip";

interface IFundAssetContainerProps {
  size: number;
  assets: FundAssetPartWithIcon[];
  type: FUND_ASSET_TYPE;
  length?: number;
  removable?: boolean;
  removeHandle?(
    currency: string
  ): (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  remainder?: number;
  hoveringAsset?: string;
}

interface IFundAssetContainerState {
  size: number;
}

class FundAssetContainer extends React.Component<
  IFundAssetContainerProps,
  IFundAssetContainerState
> {
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
                    currency={asset.asset as CURRENCIES}
                  />
                )}
              >
                <FundAsset
                  {...asset}
                  currency={asset.asset as CURRENCIES}
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
        {size < (length || assets.length) &&
          ((type === FUND_ASSET_TYPE.TEXT && (
            <div>... +{assets.length - size}</div>
          )) || (
            <div
              className="fund-asset__container fund-asset__container--others-count"
              onClick={this.expandList}
            >
              <div className="fund-asset fund-asset--others-count">
                +{(length || assets.length) - size}
              </div>
            </div>
          ))}
        {remainder > 0 && (
          <div className="fund-asset fund-asset--remainder">
            <NumberFormat value={remainder} suffix="%" displayType="text" />
          </div>
        )}
      </div>
    );
  }
}

export default FundAssetContainer;
