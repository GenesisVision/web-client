import { Button } from "components/button/button";
import Link, { ToType } from "components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import { UpdateRowFuncType } from "components/table/components/table.types";
import { ASSET } from "constants/constants";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import { ToggleableAssetType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Clickable } from "utils/types";

export const TableCardActions: React.FC<Props> = ({
  clearAnchor,
  anchor,
  children
}) => {
  return (
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={clearAnchor}
    >
      <PopoverContent leftAlign type={"list"}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export const TableCardActionsItem: React.FC<ITableCardActionsItemProps> = ({
  disabled,
  to,
  onClick,
  children
}) => {
  return (
    <PopoverContentListItem>
      <Link to={to}>
        <Button
          disabled={disabled}
          noPadding
          variant="text"
          color="secondary"
          onClick={onClick}
        >
          {children}
        </Button>
      </Link>
    </PopoverContentListItem>
  );
};

export const TableCardFavoriteActionItem: React.FC<{
  asset?: ToggleableAssetType;
  updateRow?: UpdateRowFuncType;
  assetType: ASSET;
  id: string;
  isFavorite: boolean;
  withDispatch?: boolean;
  onApply?: VoidFunction;
}> = ({ id, isFavorite, onApply, assetType, asset, updateRow }) => {
  const { t } = useTranslation();
  return (
    <PopoverContentListItem>
      <ToggleAssetFavoriteButton
        asset={asset}
        updateRow={updateRow}
        onApply={onApply}
        withDispatch
        assetType={assetType}
        id={id}
        isFavorite={isFavorite}
      >
        {isFavorite
          ? t("asset-actions.remove-from-favorites")
          : t("asset-actions.add-to-favorites")}
      </ToggleAssetFavoriteButton>
    </PopoverContentListItem>
  );
};

interface ITableCardActionsItemProps extends Clickable {
  disabled?: boolean;
  children?: string | JSX.Element;
  to?: ToType | string;
}

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    IRenderActionsArgs {}

export interface IRenderActionsArgs {
  clearAnchor: (event: TEvent) => void;
  anchor: TAnchor;
}
