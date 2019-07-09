import "./fund-asset.scss";

import classNames from "classnames";
import { FundAssetPercent } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { compose } from "redux";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS,
  anchorElType
} from "shared/components/popover/popover";

import { RootState } from "../../reducers/root-reducer";
import { FUND_ASSET_TYPE } from "./fund-asset";
import FundAssetTooltipContainer from "./fund-asset-tooltip/fund-asset-tooltip-container";
import HidedAssets from "./hided-assets";

class _FundAssetContainer extends React.PureComponent<
  IFundAssetContainerProps & StateProps,
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
    const { assets, type, length, remainder = 0, innerWidth } = this.props;
    const { size, anchor } = this.state;
    console.log(innerWidth);
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
              horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
              vertical={VERTICAL_POPOVER_POS.TOP}
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

const mapStateToProps = ({ ui }: RootState): StateProps => ({
  innerWidth: ui.size.innerWidth
});

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
  containerWidth?: number;
}

interface State {
  size?: number;
  anchor?: anchorElType;
}

interface StateProps {
  innerWidth: number;
}

const FundAssetContainer = compose<
  React.ComponentType<IFundAssetContainerProps>
>(
  connect(mapStateToProps),
  React.memo
)(_FundAssetContainer);

export default FundAssetContainer;
