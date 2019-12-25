import "./menu-tooltip.scss";

import classNames from "classnames";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";

const _MenuTooltip: React.FC<Props> = ({
  render,
  vertical = VERTICAL_POPOVER_POS.TOP,
  horizontal = HORIZONTAL_POPOVER_POS.CENTER,
  className,
  children,
  disable
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
      !disable && setAnchor(event),
    [disable]
  );
  const child = React.Children.only(children)! as JSX.Element;
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={clearAnchor}>
      <child.type
        {...child.props}
        onTouchStart={handleMouseEnter}
        onTouchEnd={clearAnchor}
        onClick={clearAnchor}
      />
      <Popover
        onMouseLeave={clearAnchor}
        noAbsolute
        noPadding
        anchorEl={anchor}
        className={classNames("tooltip__popover", className)}
        vertical={vertical}
        horizontal={horizontal}
      >
        {render()}
      </Popover>
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  render: Function;
  disable?: boolean;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  className?: string;
}

const MenuTooltip = React.memo(_MenuTooltip);
export default MenuTooltip;
