import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { horizontalPaddings, verticalPaddings } from "utils/style/mixins";
import {
  $dividerText,
  $paddingXxsmall,
  $tooltipPadding
} from "utils/style/sizes";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  render: (clearAnchor?: VoidFunction) => JSX.Element | undefined;
  disable?: boolean;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
}

const CONTAINER_CLASS_NAME = "CONTAINER_CLASS_NAME";
const POPOVER_CLASS_NAME = "POPOVER_CLASS_NAME";

const Container = styled.div`
  padding: ${$paddingXxsmall}px 0;
`;

const StyledPopover = styled(Popover)`
  ${horizontalPaddings($tooltipPadding, $dividerText)};
  ${verticalPaddings($tooltipPadding, $dividerText)};
  color: white;
`;

const MenuTooltip: React.FC<Props> = ({ render, children, disable }) => {
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
  const handlePopoverMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (
        // @ts-ignore
        typeof e?.relatedTarget?.className === "string" &&
        // @ts-ignore
        e?.relatedTarget?.className?.includes(CONTAINER_CLASS_NAME)
      )
        setInLabel();
      setOutPopover();
    },
    [inLabel]
  );

  const handleLabelMouseEnter = useCallback(() => {
    setInLabel();
  }, []);
  const handleLabelMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (
        // @ts-ignore
        typeof e?.relatedTarget?.className === "string" &&
        // @ts-ignore
        e?.relatedTarget?.className?.includes(POPOVER_CLASS_NAME)
      )
        setInPopover();
      setOutLabel();
    },
    []
  );

  useEffect(() => {
    if (!inLabel && !inPopover) clearAnchor();
  }, [inLabel, inPopover]);

  const child = React.Children.only(children)! as JSX.Element;
  return (
    <Container
      className={CONTAINER_CLASS_NAME}
      onMouseEnter={handleLabelMouseEnter}
      onMouseLeave={handleLabelMouseLeave}
    >
      <child.type
        {...child.props}
        onMouseEnter={handleButtonMouseEnter}
        onTouchStart={handleButtonMouseEnter}
        onTouchEnd={clearAnchor}
        onClick={clearAnchor}
      />
      <StyledPopover
        className={POPOVER_CLASS_NAME}
        fixedHorizontal
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
        absolute={false}
        noPadding
        anchorEl={anchor}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        horizontal={HORIZONTAL_POPOVER_POS.CENTER}
        orientation={ORIENTATION_POPOVER.CENTER}
      >
        {render(clearAnchor)}
      </StyledPopover>
    </Container>
  );
};

export default MenuTooltip;
