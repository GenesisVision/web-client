import "./tooltip.scss";

import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";

const Tooltip: React.FC<Props> = ({
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
    <>
      <child.type
        {...child.props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={clearAnchor}
        onTouchStart={handleMouseEnter}
        onTouchEnd={clearAnchor}
        onClick={clearAnchor}
      />
      <Popover
        noAbsolute
        noPadding
        anchorEl={anchor}
        className={className}
        vertical={vertical}
        horizontal={horizontal}
      >
        {render()}
      </Popover>
    </>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  render: Function;
  disable?: boolean;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  className?: string;
}

export default Tooltip;
