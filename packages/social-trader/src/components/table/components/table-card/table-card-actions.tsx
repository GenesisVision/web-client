import "./table-card.scss";

import GVButton from "components/gv-button";
import Link, { ToType } from "components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import React from "react";

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
    <Link to={to}>
      <GVButton variant="text" color="secondary" onClick={onClick}>
        {children}
      </GVButton>
    </Link>
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
