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
      type={side ? DETAILS_BLOCK_TYPE.SOLID : DETAILS_BLOCK_TYPE.TRANSPARENT}
      className={classNames("asset-block", {
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
        <DashboardHorizontalList darkShadow={!side}>
          {assets.map(renderCard)}
        </DashboardHorizontalList>
      </div>
    </DetailsBlock>
  );
};

interface Props {
  side?: boolean;
  investLink: ToType;
  title: string;
  description: string;
  renderCard: (asset: InvestAssetType) => JSX.Element;
  assets: InvestAssetType[];
}

export const AssetBlock = React.memo(_AssetBlock);
