import "./asset-block.scss";

import classNames from "classnames";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import Link, { ToType } from "components/link/link";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import { InvestAssetType } from "pages/invest/invest.types";
import React from "react";
import { useTranslation } from "react-i18next";

const _AssetBlock: React.FC<Props> = ({
  blockType,
  left,
  side,
  investLink,
  assets,
  renderCard,
  description,
  title
}) => {
  const [t] = useTranslation();
  return (
    <DetailsBlock
      wide
      type={blockType}
      className={classNames("asset-block", {
        "asset-block--left": left,
        "asset-block--side": side
      })}
    >
      <div
        className={classNames("asset-block__description-block", {
          "asset-block__description-block--side": side
        })}
      >
        <h2 className="asset-block__title">{title}</h2>
        <div
          className={classNames("asset-block__description", {
            "asset-block__description--side": side
          })}
        >
          {description}
        </div>
        <Link to={investLink}>
          <GVButton size={GV_BTN_SIZE.LARGE} color="primary">
            {t("invest.invest-button")}
          </GVButton>
        </Link>
      </div>
      <div className="asset-block__assets-block">
        <DashboardHorizontalList
          darkShadow={blockType === DETAILS_BLOCK_TYPE.TRANSPARENT}
        >
          {assets.map(renderCard)}
        </DashboardHorizontalList>
      </div>
    </DetailsBlock>
  );
};

interface Props {
  blockType?: DETAILS_BLOCK_TYPE;
  left?: boolean;
  side?: boolean;
  investLink: ToType;
  title: string;
  description: string;
  renderCard: (asset: InvestAssetType) => JSX.Element;
  assets: InvestAssetType[];
}

export const AssetBlock = React.memo(_AssetBlock);
