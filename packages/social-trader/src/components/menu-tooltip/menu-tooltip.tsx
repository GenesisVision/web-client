import clsx from "clsx";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";

import styles from "./menu-tooltip.module.scss";

const MenuTooltip: React.FC<Props> = ({
  render,
  className,
  children,
  disable
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [inPopover, setInPopover, setOutPopover] = useIsOpen();
  const [inLabel, setInLabel, setOutLabel] = useIsOpen();
  const handleButtonMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      !disable && setAnchor(event);
    },
    [disable]
  );

  const handlePopoverMouseEnter = useCallback(() => {
    setInPopover();
  }, []);
  const handlePopoverMouseLeave = useCallback(() => {
    setOutPopover();
  }, [inLabel]);

  const handleLabelMouseEnter = useCallback(() => {
    setInLabel();
  }, []);
  const handleLabelMouseLeave = useCallback(() => {
    setOutLabel();
  }, [inPopover]);

  useEffect(() => {
    if (!inLabel && !inPopover) clearAnchor();
  }, [inLabel, inPopover]);

  const child = React.Children.only(children)! as JSX.Element;
  return (
    <div
      onMouseEnter={handleLabelMouseEnter}
      onMouseLeave={handleLabelMouseLeave}
      className={styles["menu-tooltip__label"]}
    >
      <child.type
        {...child.props}
        onMouseEnter={handleButtonMouseEnter}
        onTouchStart={handleButtonMouseEnter}
        onTouchEnd={clearAnchor}
        onClick={clearAnchor}
        className={styles["menu-tooltip__label-child"]}
      />
      <Popover
        fixedHorizontal
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
        noAbsolute
        noPadding
        anchorEl={anchor}
        className={clsx(styles["menu-tooltip__popover"], className)}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        horizontal={HORIZONTAL_POPOVER_POS.CENTER}
        orientation={ORIENTATION_POPOVER.CENTER}
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

export default MenuTooltip;
