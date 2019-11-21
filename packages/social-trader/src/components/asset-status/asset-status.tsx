import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";
import { STATUS } from "shared/constants/constants";

import AssetStatusLabel from "./asset-status-label";
import AssetStatusRequests from "./asset-status-requests";

const _AssetStatus: React.FC<Props> = ({
  successFee,
  entryFee,
  exitFee,
  className,
  status,
  id,
  asset,
  onCancel
}) => {
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
      <AssetStatusLabel
        status={status}
        className={className}
        onClick={handleOpenDropdown}
      />
      <Popover
        orientation={ORIENTATION_POPOVER.RIGHT}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <AssetStatusRequests
          successFee={successFee}
          entryFee={entryFee}
          exitFee={exitFee}
          id={id}
          asset={asset}
          handleCloseDropdown={clearAnchor}
          onCancel={onCancel}
        />
      </Popover>
    </>
  );
};

interface Props {
  successFee?: number;
  exitFee?: boolean;
  entryFee?: number;
  className?: string;
  status: STATUS;
  id: string;
  asset: any;
  onCancel: any;
}

const AssetStatus = React.memo(_AssetStatus);
export default AssetStatus;
