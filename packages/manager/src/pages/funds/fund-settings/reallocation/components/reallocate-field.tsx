import {
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import CreateFundSettingsAddAsset, {
  TRegulatorInputHandle
} from "pages/create-fund/components/create-fund-settings/create-fund-settings-add-asset/create-fund-settings-add-asset";
import CreateFundSettingsAssetsComponent from "pages/create-fund/components/create-fund-settings/create-fund-settings-assets-block/create-fund-settings-assets-block";
import * as React from "react";
import { FundAssetRemoveType } from "shared/components/fund-asset/fund-asset-container";

class ReallocateField extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchor: undefined,
      assets: composeSelectedAssets(props.value, props.assets).sort(
        (a, b) => b.percent - a.percent
      ),
      remainder: this.getRemainder(props.value)
    };
  }

  handlePercentChange: TRegulatorInputHandle = asset => e => {
    let value = +e.target.value;
    if (isNaN(value)) return;
    if (value > this.getRemainderWithoutSelected(asset)) {
      value = this.getRemainderWithoutSelected(asset);
    }
    const newAsset = { ...asset, percent: value };
    this.updateAssets(newAsset);
  };

  handleDown = (asset: PlatformAssetFull) => () => {
    if (asset.percent === 0) return;
    const newAsset = { ...asset, percent: asset.percent - 1 };
    this.updateAssets(newAsset);
  };

  handleUp = (asset: PlatformAssetFull) => () => {
    if (this.state.remainder - 1 < 0) return;
    const newAsset = { ...asset, percent: asset.percent + 1 };
    this.updateAssets(newAsset);
  };

  handleRemove: FundAssetRemoveType = currency => () => {
    const asset = this.state.assets.find(item => item.asset === currency)!;
    const newAsset = { ...asset, percent: asset.mandatoryFundPercent };
    this.updateAssets(newAsset);
  };

  getRemainder = (assets: { percent: number }[]) =>
    100 - assets.reduce((sum, item) => sum + item.percent, 0);

  getRemainderWithoutSelected = (asset: FundAssetPartWithIcon) => {
    return (
      100 -
      this.state.assets
        .filter(item => item.asset !== asset.asset)
        .reduce((sum, item) => sum + item.percent, 0)
    );
  };

  updateAssets = (asset: PlatformAssetFull) => {
    const assets = this.state.assets.map(x =>
      x.asset === asset.asset ? asset : x
    );
    this.setState({
      assets,
      remainder: this.getRemainder(assets)
    });
  };

  handleOpenDropdown: React.MouseEventHandler = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleCloseDropdown = () => {
    this.setState({
      anchor: undefined,
      assets: this.state.assets.sort((a, b) => b.percent - a.percent)
    });
    this.props.onChange({
      target: {
        value: this.state.assets.filter(asset => asset.percent > 0),
        name: this.props.name
      }
    });
    this.handleBlur();
  };

  handleBlur = (): void => {
    const { onBlur, name } = this.props;
    if (onBlur) {
      onBlur({
        target: {
          name
        }
      });
    }
  };

  render() {
    const { error, touched } = this.props;
    const { anchor, assets, remainder } = this.state;
    return (
      <>
        {error !== undefined && touched && (
          <div className="form-error reallocate-container__form-error">
            {error}
          </div>
        )}
        <CreateFundSettingsAssetsComponent
          assets={assets.filter(item => item.percent > 0) || []}
          remainder={remainder}
          removeHandle={this.handleRemove}
          addHandle={this.handleOpenDropdown}
        />
        <CreateFundSettingsAddAsset
          anchor={anchor}
          handleCloseDropdown={this.handleCloseDropdown}
          assets={assets}
          handleDown={this.handleDown}
          handleUp={this.handleUp}
          handlePercentChange={this.handlePercentChange}
        />
      </>
    );
  }
}

export default ReallocateField;

export const composeSelectedAssets = (
  assetsPercents: FundAssetPart[],
  assets: PlatformAsset[]
): PlatformAssetFull[] =>
  assets.map(asset => {
    const targetAsset = assetsPercents.find(x => x.id === asset.id);
    const percent = targetAsset ? targetAsset.percent : 0;
    return { ...asset, percent };
  });

interface Props {
  name: string;
  value: FundAssetPart[];
  assets: PlatformAsset[];
  error?: string;
  touched: boolean;
  onChange(event: {
    target: {
      value: FundAssetPart[];
      name: string;
    };
  }): void;
  onBlur(event: {
    target: {
      name: string;
    };
  }): void;
}

interface State {
  anchor?: EventTarget;
  assets: PlatformAssetFull[];
  remainder: number;
}

export type PlatformAssetFull = PlatformAsset & FundAssetPart;
