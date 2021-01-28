import GVProgramAvatar from "components/gv-program-avatar";
import { GVProgramAvatarProps } from "components/gv-program-avatar/gv-program-avatar.styles";
import { ILevelTooltip } from "components/level-tooltip/level-tooltip";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";

export interface IAssetAvatarProps extends GVProgramAvatarProps {
  tooltip?: React.ReactElement<ILevelTooltip>;
  click?: boolean;
  vertical?: VERTICAL_POPOVER_POS;
  horizontal?: HORIZONTAL_POPOVER_POS;
  onClickLevel?: (e: any) => void;
  hasStaticIcon?: boolean;
  alt: string;
}

const _AssetAvatar: React.FC<IAssetAvatarProps> = props => {
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
          absolute={false}
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

const AssetAvatar = React.memo(_AssetAvatar);
export default AssetAvatar;
