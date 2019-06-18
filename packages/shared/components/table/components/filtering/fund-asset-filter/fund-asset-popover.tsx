import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import GVScroll from "shared/components/scroll/gvscroll";

import TileFilterPopover from "../tile-filter-popover";

const _FundAssetPopover: React.FC<Props & InjectedTranslateProps> = ({
  t,
  values,
  changeFilter
}) => {
  const filterableValues = values.map(x => ({
    ...x,
    searchValue: x.name + x.asset
  }));
  return (
    <TileFilterPopover
      header={t("filters.fund-asset.popover-header")}
      placeholder={t("filters.fund-asset.popover-search-placeholder")}
      values={filterableValues}
      changeFilter={changeFilter!}
    >
      {(filteredAssets, handleClick) => (
        <GVScroll autoHeightMax={180} autoHeight={true}>
          <table>
            <tbody>
              {filteredAssets.map((asset, idx) => (
                <tr
                  key={idx}
                  className="popover-add__asset"
                  onClick={() => handleClick(asset.id)}
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
      )}
    </TileFilterPopover>
  );
};

const FundAssetPopover = compose<React.ComponentType<Props>>(
  React.memo,
  translate()
)(_FundAssetPopover);
export default FundAssetPopover;

interface Props {
  values: PlatformAsset[];
  changeFilter?(value: string): void;
}
