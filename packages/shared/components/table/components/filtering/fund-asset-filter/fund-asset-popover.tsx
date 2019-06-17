import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import GVTextField from "shared/components/gv-text-field";
import GVScroll from "shared/components/scroll/gvscroll";

class FundAssetPopover extends React.PureComponent<
  IFundAssetPopoverProps,
  IFundAssetPopoverState
> {
  constructor(props: IFundAssetPopoverProps) {
    super(props);
    const { values } = this.props;
    this.state = {
      filteredAssets: values
    };
  }
  // componentDidMount() {
  //   this.setState({
  //     filteredTags: this.removeSelected(this.props.values, this.state.selected)
  //   });
  // }
  search = (e: React.ChangeEvent<any>) => {
    this.setState({
      filteredAssets: this.filtering(e.target.value, this.props.values)
    });
  };
  filtering = (searchValue: string, array: PlatformAsset[]) => {
    if (!searchValue) return array;
    return array.filter(
      item =>
        ~(item.name + item.asset)
          .toUpperCase()
          .indexOf(searchValue.toUpperCase())
    );
  };

  handleClick = (asset: PlatformAsset) => () => {
    if (this.props.changeFilter) {
      this.props.changeFilter(asset.id);
    }
  };

  render() {
    const { filteredAssets } = this.state;
    return (
      <div className="tag-filter">
        <div className="tag-filter__title">Add asset</div>
        <div className="tag-filter__search">
          <GVTextField
            name="queryValue"
            wrapperClassName="popover-add__search-input"
            placeholder="Search for assets"
            autoComplete="off"
            adornmentPosition="start"
            onChange={this.search}
          />
        </div>
        <div className="tag-filter__tags-list">
          <GVScroll autoHeightMax={180} autoHeight={true}>
            <table>
              <tbody>
                {filteredAssets.map((asset, idx) => (
                  <tr
                    key={idx}
                    className="popover-add__asset"
                    onClick={this.handleClick(asset)}
                  >
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
                  </tr>
                ))}
              </tbody>
            </table>
          </GVScroll>
        </div>
      </div>
    );
  }
}

export default FundAssetPopover;

interface IFundAssetPopoverState {
  filteredAssets: PlatformAsset[];
}

interface IFundAssetPopoverProps {
  value: string[];
  values: PlatformAsset[];
  changeFilter?(value: string): void;
}
