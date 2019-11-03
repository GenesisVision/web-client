import "./details-description.scss";

import * as React from "react";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import InvestmentLimitsPopover from "shared/components/details/details-description-section/investment-limits-popover";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import useAnchor from "shared/hooks/anchor.hook";
import { CurrencyEnum } from "shared/utils/types";

const _DetailsLimitsAvatar: React.FC<{
  logo: string;
  level: number;
  levelProgress: number;
  title: string;
  color: string;
  totalAvailableInvestment: number;
  currency: CurrencyEnum;
}> = ({
  logo,
  level,
  levelProgress,
  title,
  color,
  totalAvailableInvestment,
  currency
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <div className="asset-details-description__avatar">
      <AssetAvatar
        url={logo}
        level={level}
        levelProgress={levelProgress}
        alt={title}
        size="big"
        color={color}
        onClickLevel={setAnchor}
      />
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <InvestmentLimitsPopover
          limit={totalAvailableInvestment}
          currency={currency}
          level={level}
          canLevelUp={false}
          closePopover={clearAnchor}
        />
      </Popover>
    </div>
  );
};

export const DetailsLimitsAvatar = React.memo(_DetailsLimitsAvatar);
