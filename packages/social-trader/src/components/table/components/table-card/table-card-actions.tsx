import "./table-card.scss";

import GVButton from "components/gv-button";
import Link, { ToType } from "components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { UpdateRowFuncType } from "components/table/components/table.types";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import { ToggleableAssetType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/constants/constants";

const _TableCardActions: React.FC<Props> = ({
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
      <div className="table-card__actions-list">{children}</div>
    </Popover>
  );
};

export const TableCardActionsItem: React.FC<
  ITableCardActionsItemProps
> = React.memo(({ to, onClick, children }) => {
  return (
    <TableCardActionsItemContainer>
      <Link to={to}>
        <GVButton noPadding variant="text" color="secondary" onClick={onClick}>
          {children}
        </GVButton>
      </Link>
    </TableCardActionsItemContainer>
  );
});

export const TableCardActionsItemContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children }) => {
  return <div className="table-card__actions-item">{children}</div>;
});

export const TableCardFavoriteActionItem: React.FC<{
  asset?: ToggleableAssetType;
  updateRow?: UpdateRowFuncType;
  assetType: ASSET;
  id: string;
  isFavorite: boolean;
  withDispatch?: boolean;
  onApply?: VoidFunction;
}> = React.memo(({ id, isFavorite, onApply, assetType, asset, updateRow }) => {
  const { t } = useTranslation();
  return (
    <TableCardActionsItemContainer>
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
          ? t("fund-actions.add-to-favorites")
          : t("fund-actions.remove-from-favorites")}
      </ToggleAssetFavoriteButton>
    </TableCardActionsItemContainer>
  );
});

interface ITableCardActionsItemProps {
  children?: string | JSX.Element;
  to?: ToType | string;
  onClick: (event: any) => void;
}

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    IRenderActionsArgs {}

export interface IRenderActionsArgs {
  clearAnchor: (event: TEvent) => void;
  anchor: TAnchor;
}
export const TableCardActions = React.memo(_TableCardActions);
