import "../create-fund-settings.scss";

import classnames from "classnames";
import { GVTextField } from "gv-react-components";
import React from "react";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import { SearchIcon } from "shared/components/icon/search-icon";
import Popover from "shared/components/popover/popover";
import Regulator from "shared/components/regulator/regulator";
import GVScroll from "shared/components/scroll/gvscroll";

class CreateFundSettingsAddAsset extends React.Component {
  state = {
    filteredAssets: this.props.assets
  };
  search = e => {
    this.setState({
      filteredAssets: this.filtering(e.target.value, this.props.assets)
    });
  };
  filtering = (searchValue, array) => {
    return searchValue
      ? array.filter(
          item =>
            ~item.name.toLowerCase().indexOf(searchValue.toLowerCase()) ||
            ~item.asset.toLowerCase().indexOf(searchValue.toLowerCase())
        )
      : array;
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
        horizontal="right"
        vertical="center"
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
            <GVScroll autoHeightMax={180} autoHeight={true}>
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
            </GVScroll>
          </div>
        </div>
      </Popover>
    );
  }
}

export default CreateFundSettingsAddAsset;
