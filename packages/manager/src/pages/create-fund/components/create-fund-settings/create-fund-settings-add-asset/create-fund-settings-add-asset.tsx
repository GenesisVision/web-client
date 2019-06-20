import "../create-fund-settings.scss";

import classnames from "classnames";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import GVTextField from "shared/components/gv-text-field";
import { SearchIcon } from "shared/components/icon/search-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Regulator from "shared/components/regulator/regulator";

class CreateFundSettingsAddAsset extends React.PureComponent<Props, State> {
  state = {
    filteredAssets: this.props.assets
  };
  search = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filteredAssets: this.filtering(e.target.value, this.props.assets)
    });
  };
  filtering = (searchValue: string, assets: FundAssetPartWithIcon[]) => {
    if (!searchValue) {
      return assets;
    }
    return assets.filter(
      item =>
        ~(item.name + item.asset)
          .toUpperCase()
          .indexOf(searchValue.toUpperCase())
    );
  };

  render() {
    const {
      anchor,
      handleCloseDropdown,
      handleDown,
      handleUp,
      handlePercentChange
    } = this.props;
    const { filteredAssets } = this.state;
    return (
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={VERTICAL_POPOVER_POS.CENTER}
        anchorEl={anchor}
        noPadding
        onClose={handleCloseDropdown}
      >
        <div className="popover-add">
          <div className="popover-add__search">
            <GVTextField
              name="queryValue"
              wrapperClassName="popover-add__search-input"
              placeholder="Search for assets"
              autoComplete="off"
              adornment={<SearchIcon secondary />}
              adornmentPosition="start"
              onChange={this.search}
              autoFocus
            />
          </div>
          <div className="popover-add__assets">
            <table>
              <tbody>
                {filteredAssets.map((asset, idx) => (
                  <tr key={idx} className="popover-add__asset">
                    <td className="popover-add__asset-icon-container">
                      <FundAssetImage
                        url={asset.icon}
                        alt={asset.asset}
                        className="popover-add__asset-icon"
                      />
                    </td>
                    <td className="popover-add__asset-currency-full">
                      {asset.name}
                    </td>
                    <td className="popover-add__asset-currency-short">
                      {asset.asset}
                    </td>
                    <td className="popover-add__regulator-container">
                      <Regulator
                        value={asset.percent}
                        handleDown={handleDown(asset)}
                        handleUp={handleUp(asset)}
                      >
                        <div className={"popover-add__regulator-indicator"}>
                          <input
                            value={asset.percent}
                            onChange={handlePercentChange(asset)}
                            className={classnames(
                              "popover-add__regulator-input",
                              {
                                "popover-add__regulator-input--mute":
                                  asset.percent === 0
                              }
                            )}
                          />
                          %
                        </div>
                      </Regulator>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Popover>
    );
  }
}

export default CreateFundSettingsAddAsset;

interface Props {
  anchor?: EventTarget;
  assets: FundAssetPartWithIcon[];
  handleOpenDropdown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  handleCloseDropdown(): void;
  handleDown(asset: FundAssetPartWithIcon): () => void;
  handleUp(asset: FundAssetPartWithIcon): () => void;
  handlePercentChange(
    asset: FundAssetPartWithIcon
  ): (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface State {
  filteredAssets: FundAssetPartWithIcon[];
}
