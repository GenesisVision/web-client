import "./providers-button.scss";

import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { CHIP_SIZE, CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import CopyIcon from "components/icon/copy-icon";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER
} from "components/popover/popover";
import { OrderSignalProgramInfo } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import React from "react";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import { composeProgramDetailsUrl } from "utils/compose-url";

const _ProvidersButton: React.FC<Props> = ({ providers }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <>
      <Popover
        anchorEl={anchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        orientation={ORIENTATION_POPOVER.LEFT}
        onClose={clearAnchor}
      >
        <div className="provider-items">
          {providers.map(provider => (
            <ProviderItem provider={provider} />
          ))}
        </div>
      </Popover>
      <ChipButton
        onClick={setAnchor}
        size={CHIP_SIZE.SMALL}
        chipLabel={<CopyIcon />}
        type={CHIP_TYPE.EMPTY}
      />
    </>
  );
};

const ProviderItem: React.FC<{ provider: OrderSignalProgramInfo }> = ({
  provider: {
    program: { logo, level, color, levelProgress, title, url }
  }
}) => {
  const { linkCreator } = useToLink();
  return (
    <Link
      to={linkCreator(
        composeProgramDetailsUrl(url),
        title,
        PROGRAM_DETAILS_FOLDER_ROUTE
      )}
    >
      <div className="provider-item">
        <div className="provider-item__avatar">
          <AssetAvatar
            url={logo}
            level={level}
            levelProgress={levelProgress}
            alt={title}
            color={color}
            tooltip={<LevelTooltip level={level} canLevelUp={false} />}
          />
        </div>
        <div>{title}</div>
      </div>
    </Link>
  );
};

interface Props {
  providers: Array<OrderSignalProgramInfo>;
}

export const ProvidersButton = React.memo(_ProvidersButton);
