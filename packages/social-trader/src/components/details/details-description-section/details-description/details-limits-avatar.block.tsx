import "./details-description.scss";

import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import InvestmentLimitsPopover from "components/details/details-description-section/investment-limits-popover";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

const _DetailsLimitsAvatar: React.FC<{
  logo: string;
  title: string;
  color: string;
  level?: number;
  levelProgress?: number;
  totalAvailableInvestment?: number;
  currency?: CurrencyEnum;
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
    <div className="details-description__avatar">
      <AssetAvatar
        url={logo}
        level={level}
        levelProgress={levelProgress}
        alt={title}
        size="big"
        color={color}
        onClickLevel={setAnchor}
      />
      {level !== undefined && (
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.LEFT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={anchor}
          noPadding
          onClose={clearAnchor}
        >
          <InvestmentLimitsPopover
            limit={totalAvailableInvestment!}
            currency={currency!}
            level={level}
            canLevelUp={false}
            closePopover={clearAnchor}
          />
        </Popover>
      )}
    </div>
  );
};

export const DetailsLimitsAvatar = React.memo(_DetailsLimitsAvatar);
