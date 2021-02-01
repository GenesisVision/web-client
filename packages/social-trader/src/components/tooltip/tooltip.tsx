import Popover, { HORIZONTAL_POPOVER_POS, VERTICAL_POPOVER_POS } from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  render: Function;
  disable?: boolean;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  className?: string;
}

const Tooltip: React.FC<Props> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  render,
  vertical = VERTICAL_POPOVER_POS.TOP,
  horizontal = HORIZONTAL_POPOVER_POS.CENTER,
  className,
  children,
  disable
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onMouseEnter && onMouseEnter(event);
      !disable && setAnchor(event);
    },
    [disable]
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onMouseLeave && onMouseLeave(event);
      clearAnchor();
    },
    []
  );
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onClick && onClick(event);
      clearAnchor();
    },
    [onClick]
  );
  const child = React.Children.only(children)! as JSX.Element;
  return (
    <>
      <child.type
        {...child.props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={clearAnchor}
        onClick={handleClick}
      />
      <Popover
        absolute={false}
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

export default Tooltip;
