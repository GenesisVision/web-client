import "./fund-asset.scss";

import classNames from "classnames";
import { FundAssetPercent } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS,
  anchorElType
} from "../popover/popover";
import Popover from "../popover/popover";
import { FUND_ASSET_TYPE } from "./fund-asset";
import FundAssetTooltipContainer from "./fund-asset-tooltip/fund-asset-tooltip-container";
import HidedAssets from "./hided-assets";

class FundAssetContainer extends React.PureComponent<
  IFundAssetContainerProps,
  State
> {
  state = {
    size: this.props.size,
    anchor: undefined
  };

  handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.props.hasPopoverList
      ? this.setState({ anchor: event.currentTarget })
      : this.setState({ size: this.props.assets.length });
  };

  handleClose = () => this.setState({ anchor: undefined });

  render() {
    const { assets, type, length, remainder = 0 } = this.props;
    const { size, anchor } = this.state;
    return (
      <div
        className={classNames("fund-assets", {
          "fund-assets--text": type === FUND_ASSET_TYPE.TEXT
        })}
      >
        {assets.map(
          (asset, idx) =>
            idx < (size || assets.length) && (
              <FundAssetTooltipContainer
                key={idx}
                asset={asset}
                idx={idx}
                {...this.props}
              />
            )
        )}
        {size && size < (length || assets.length) && (
          <>
            <HidedAssets
              count={(length || assets.length) - size}
              type={type}
              handleOpen={this.handleOpen}
            />
            <Popover
              horizontal={HORIZONTAL_POPOVER_POS.LEFT}
              vertical={VERTICAL_POPOVER_POS.BOTTOM}
              anchorEl={anchor}
              noPadding
              onClose={this.handleClose}
            >
              <div className="fund-assets__container">
                {assets.map(
                  (asset, idx) =>
                    idx >= size && (
                      <FundAssetTooltipContainer
                        key={idx}
                        asset={asset}
                        idx={idx}
                        {...this.props}
                      />
                    )
                )}
              </div>
            </Popover>
          </>
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

export type FundAssetRemoveType = (
  currency: string
) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

export interface IFundAssetContainerProps {
  assets: FundAssetPercent[];
  type: FUND_ASSET_TYPE;
  size?: number;
  length?: number;
  removable?: boolean;
  removeHandle?: FundAssetRemoveType;
  remainder?: number;
  hoveringAsset?: string;
  hasPopoverList?: boolean;
}

interface State {
  size?: number;
  anchor?: anchorElType;
}

export default FundAssetContainer;
