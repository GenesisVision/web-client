import classNames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import SelectedMark from "components/selected-mark/selected-mark";
import React from "react";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeProgramDetailsUrl } from "utils/compose-url";

import { TChartAsset } from "./multi-chart.types";

const _ChartAsset: React.FC<Prop> = ({ asset, selected, onToggle }) => {
  const { linkCreator } = useToLink();
  return (
    <div
      className={classNames("multi-chart__asset", {
        "multi-chart__asset--selected": selected
      })}
      onClick={() => onToggle(asset.id)}
    >
      <SelectedMark
        selected={selected}
        className="multi-chart__selected-mark"
      />
      <Link
        to={linkCreator(
          composeProgramDetailsUrl(asset.url),
          PROGRAM_DETAILS_FOLDER_ROUTE
        )}
      >
        <div className="multi-chart__asset-name">
          <AssetAvatar url={asset.logoUrl} alt={asset.title} />
          <div className="multi-chart__asset-name">{asset.title}</div>
        </div>
      </Link>
    </div>
  );
};

interface Prop {
  asset: TChartAsset;
  selected: boolean;
  onToggle: (asset: string) => void;
}

const ChartAsset = React.memo(_ChartAsset);
export default ChartAsset;
