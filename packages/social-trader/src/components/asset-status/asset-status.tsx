import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { STATUS } from "constants/constants";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";

import AssetStatusLabel from "./asset-status-label";
import AssetStatusRequestsContainer from "./asset-status-requests.container";

interface Props {
  status: STATUS;
  id: string;
  onCancel: () => void;
}

const _AssetStatus: React.FC<Props> = ({ status, id, onCancel }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      if (status === STATUS.INVESTING || status === STATUS.WITHDRAWING)
        setAnchor(event);
    },
    [status]
  );
  return (
    <>
      <AssetStatusLabel status={status} onClick={handleOpenDropdown}>
        {status}
      </AssetStatusLabel>
      <Popover
        orientation={ORIENTATION_POPOVER.LEFT}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <AssetStatusRequestsContainer
          id={id}
          handleCloseDropdown={clearAnchor}
          onCancel={onCancel}
        />
      </Popover>
    </>
  );
};

const AssetStatus = React.memo(_AssetStatus);
export default AssetStatus;
