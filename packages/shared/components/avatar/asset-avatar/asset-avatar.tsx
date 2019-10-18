import * as React from "react";
import { useCallback } from "react";
import GVProgramAvatar, {
  GVProgramAvatarProps
} from "shared/components/gv-program-avatar";
import { ILevelTooltip } from "shared/components/level-tooltip/level-tooltip";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import useAnchor from "shared/hooks/anchor.hook";

const _AssetAvatar: React.FC<Props> = props => {
  const { tooltip, onClickLevel, click, vertical, horizontal } = props;
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent) => !click && setAnchor(event),
    [click, setAnchor]
  );
  const handleMouseLeave = useCallback(() => !click && clearAnchor(), [
    clearAnchor,
    click
  ]);
  return (
    <>
      <GVProgramAvatar
        onMouseEnterLevel={handleMouseEnter}
        onMouseLeaveLevel={handleMouseLeave}
        onClickLevel={onClickLevel}
        {...props}
      />
      {tooltip && (
        <Popover
          noAbsolute
          noPadding
          anchorEl={anchor}
          className="tooltip__popover"
          vertical={vertical}
          horizontal={horizontal}
        >
          {tooltip}
        </Popover>
      )}
    </>
  );
};

interface Props extends GVProgramAvatarProps {
  tooltip?: React.ReactElement<ILevelTooltip>;
  click?: boolean;
  vertical?: VERTICAL_POPOVER_POS;
  horizontal?: HORIZONTAL_POPOVER_POS;
  onClickLevel?: (e: any) => void;
  alt: string;
}

const AssetAvatar = React.memo(_AssetAvatar);
export default AssetAvatar;
